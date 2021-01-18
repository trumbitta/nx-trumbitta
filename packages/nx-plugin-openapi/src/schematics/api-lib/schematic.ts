// Devkit
import {
  apply,
  applyTemplates,
  chain,
  mergeWith,
  move,
  Rule,
  SchematicContext,
  SchematicsException,
  Tree,
  url,
} from '@angular-devkit/schematics';

// Nrwl
import {
  addProjectToNxJsonInTree,
  getNpmScope,
  names,
  offsetFromRoot,
  projectRootDir,
  ProjectType,
  toFileName,
  updateJsonInTree,
  updateWorkspace,
} from '@nrwl/workspace';
import { libsDir } from '@nrwl/workspace/src/utils/ast-utils';

// Schematics
import init from '../init/schematic';

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
  return (host: Tree, context: SchematicContext) => {
    const normalizedOptions = normalizeOptions(host, options);
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
      sourceSpecPathOrUrl: isRemoteSpec
        ? sourceSpecUrl
        : [normalizedOptions.projectRootApiSpecLib, sourceSpecFileRelativePath].join('/'),
      additionalProperties,
    };

    if (isRemoteSpec && sourceSpecUrlAuthorizationHeaders) {
      builderOptions.sourceSpecUrlAuthorizationHeaders = sourceSpecUrlAuthorizationHeaders;
    }

    const rules: Rule[] = [
      init(),
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
      updateTsConfig(normalizedOptions),
      addFiles(normalizedOptions),
    ];

    return chain(rules)(host, context);
  };
}

function updateTsConfig(options: NormalizedSchema): Rule {
  return chain([
    (host: Tree, context: SchematicContext) => {
      return updateJsonInTree('tsconfig.base.json', (json) => {
        const compilerOptions = json.compilerOptions;
        compilerOptions.paths = compilerOptions.paths || {};
        delete compilerOptions.paths[options.name];

        if (compilerOptions.paths[options.importPath]) {
          throw new SchematicsException(
            `You already have a library using the import path "${options.importPath}". Make sure to specify a unique one.`,
          );
        }

        compilerOptions.paths[options.importPath] = [`${libsDir(host)}/${options.projectDirectory}/src/index.ts`];

        return json;
      })(host, context);
    },
  ]);
}

function normalizeOptions(host: Tree, options: ApiLibSchematicSchema): NormalizedSchema {
  const name = toFileName(options.name);
  const projectDirectory = options.directory ? `${toFileName(options.directory)}/${name}` : name;
  const projectName = projectDirectory.replace(new RegExp('/', 'g'), '-');
  const projectRoot = `${projectRootDir(projectType)}/${projectDirectory}`;
  const projectRootApiSpecLib =
    !options.isRemoteSpec && options.sourceSpecLib
      ? `${projectRootDir(projectType)}/${options.sourceSpecLib}`
      : undefined;
  const parsedTags = options.tags ? options.tags.split(',').map((s) => s.trim()) : [];
  const importPath = options.importPath || `@${getNpmScope(host)}/${projectDirectory}`;

  return {
    ...options,
    importPath,
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
