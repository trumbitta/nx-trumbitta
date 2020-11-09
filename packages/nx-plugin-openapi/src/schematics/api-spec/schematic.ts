// Devkit
import { apply, applyTemplates, chain, mergeWith, move, Rule, url } from '@angular-devkit/schematics';
import { strings } from '@angular-devkit/core';

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

// Schematics
import init from '../init/schematic';

// Schema
import { ApiSpecSchematicSchema } from './schema';

const projectType = ProjectType.Library;

interface NormalizedSchema extends ApiSpecSchematicSchema {
  projectName: string;
  projectRoot: string;
  projectDirectory: string;
  parsedTags: string[];
}

function normalizeOptions(options: ApiSpecSchematicSchema): NormalizedSchema {
  const name = toFileName(options.name);
  const projectDirectory = options.directory ? `${toFileName(options.directory)}/${name}` : name;
  const projectName = projectDirectory.replace(new RegExp('/', 'g'), '-');
  const projectRoot = `${projectRootDir(projectType)}/${projectDirectory}`;
  const parsedTags = options.tags ? options.tags.split(',').map((s) => s.trim()) : [];

  return {
    ...options,
    projectName,
    projectRoot,
    projectDirectory,
    parsedTags,
  };
}

function addFiles(options: NormalizedSchema): Rule {
  return mergeWith(
    apply(url(`./files`), [
      applyTemplates({
        ...options,
        ...strings,
        ...names(options.name),
        offsetFromRoot: offsetFromRoot(options.projectRoot),
      }),
      move(options.projectRoot),
    ]),
  );
}

export default function (options: ApiSpecSchematicSchema): Rule {
  const normalizedOptions = normalizeOptions(options);
  const operations = [
    init(),
    updateWorkspace((workspace) => {
      workspace.projects.add({
        name: normalizedOptions.projectName,
        root: normalizedOptions.projectRoot,
        sourceRoot: `${normalizedOptions.projectRoot}/src`,
        projectType,
      });
    }),
    addProjectToNxJsonInTree(normalizedOptions.projectName, {
      tags: normalizedOptions.parsedTags,
    }),
  ];

  if (options.withSample) {
    operations.push(addFiles(normalizedOptions));
  }

  return chain(operations);
}
