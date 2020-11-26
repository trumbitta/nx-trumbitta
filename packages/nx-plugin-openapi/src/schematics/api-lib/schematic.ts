// Devkit
import { apply, applyTemplates, chain, mergeWith, move, Rule, url } from '@angular-devkit/schematics';

// Nrwl
import {
  addProjectToNxJsonInTree,
  names,
  offsetFromRoot,
  projectRootDir,
  ProjectType,
  toFileName,
  updateWorkspace,
} from '@nrwl/workspace';

// Schemas
import { ApiLibSchematicSchema } from './schema';
import { GenerateApiLibSourcesBuilderSchema } from '../../builders/generate-api-lib-sources/schema';

const projectType = ProjectType.Library;

interface NormalizedSchema extends ApiLibSchematicSchema {
  projectName: string;
  projectRoot: string;
  projectRootApiSpecLib?: string;
  projectDirectory: string;
  parsedTags: string[];
}

export default function (options: ApiLibSchematicSchema): Rule {
  const normalizedOptions = normalizeOptions(options);
  const {
    generator,
    isRemoteSpec,
    sourceSpecUrl,
    sourceSpecUrlAuthorizationHeaders,
    sourceSpecFileRelativePath,
    additionalProperties,
  } = options;

  const builderOptions: GenerateApiLibSourcesBuilderSchema = {
    generator,
    sourceSpecFullPathOrUrl: isRemoteSpec
      ? sourceSpecUrl
      : [normalizedOptions.projectRootApiSpecLib, sourceSpecFileRelativePath].join('/'),
    additionalProperties,
  };

  if (isRemoteSpec && sourceSpecUrlAuthorizationHeaders) {
    builderOptions.sourceSpecUrlAuthorizationHeaders = sourceSpecUrlAuthorizationHeaders;
  }

  const rules: Rule[] = [
    updateWorkspace((workspace) => {
      workspace.projects
        .add({
          name: normalizedOptions.projectName,
          root: normalizedOptions.projectRoot,
          sourceRoot: `${normalizedOptions.projectRoot}/src`,
          projectType,
        })
        .targets.add({
          name: 'generate-sources',
          builder: '@trumbitta/nx-plugin-openapi:generate-api-lib-sources',
          options: builderOptions,
        });
    }),
    addProjectToNxJsonInTree(normalizedOptions.projectName, {
      tags: normalizedOptions.parsedTags,
      implicitDependencies: !isRemoteSpec && options.sourceSpecLib ? [options.sourceSpecLib] : undefined,
    }),
    addFiles(normalizedOptions),
  ];

  return chain(rules);
}

function normalizeOptions(options: ApiLibSchematicSchema): NormalizedSchema {
  const name = toFileName(options.name);
  const projectDirectory = options.directory ? `${toFileName(options.directory)}/${name}` : name;
  const projectName = projectDirectory.replace(new RegExp('/', 'g'), '-');
  const projectRoot = `${projectRootDir(projectType)}/${projectDirectory}`;
  const projectRootApiSpecLib =
    !options.isRemoteSpec && options.sourceSpecLib
      ? `${projectRootDir(projectType)}/${options.sourceSpecLib}`
      : undefined;
  const parsedTags = options.tags ? options.tags.split(',').map((s) => s.trim()) : [];

  return {
    ...options,
    projectName,
    projectRoot,
    projectRootApiSpecLib,
    projectDirectory,
    parsedTags,
  };
}

function addFiles(options: NormalizedSchema): Rule {
  return mergeWith(
    apply(url(`./files`), [
      applyTemplates({
        ...options,
        ...names(options.name),
        offsetFromRoot: offsetFromRoot(options.projectRoot),
      }),
      move(options.projectRoot),
    ]),
  );
}
