// Devkit
import { Tree, generateFiles, addProjectConfiguration, GeneratorCallback, joinPathFragments } from '@nrwl/devkit';

// Nrwl
import { names, offsetFromRoot, projectRootDir, ProjectType } from '@nrwl/workspace';
import { runTasksInSerial } from '@nrwl/workspace/src/utilities/run-tasks-in-serial';

// Schematics
import init from '../init/generator';

// Schema
import { ApiSpecGeneratorSchema } from './schema';

const projectType = ProjectType.Library;

interface NormalizedSchema extends ApiSpecGeneratorSchema {
  projectName: string;
  projectRoot: string;
  projectDirectory: string;
  parsedTags: string[];
}

export default async function (tree: Tree, schema: ApiSpecGeneratorSchema) {
  const tasks: GeneratorCallback[] = [];

  const options = normalizeOptions(schema);

  // Init
  const initTask = await init(tree);
  tasks.push(initTask);

  // Add Project
  addProject(tree, options);

  if (options.withSample) {
    createFiles(tree, options);
  }

  return runTasksInSerial(...tasks);
}

function normalizeOptions(options: ApiSpecGeneratorSchema): NormalizedSchema {
  const name = names(options.name).fileName;
  const projectDirectory = options.directory ? `${names(options.name).fileName}/${name}` : name;
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

const addProject = (host: Tree, options: NormalizedSchema) => {
  addProjectConfiguration(host, options.projectName, {
    root: options.projectRoot,
    sourceRoot: joinPathFragments(options.projectRoot, 'src'),
    projectType,
    targets: {},
    tags: options.parsedTags,
  });
};

function createFiles(host: Tree, options: NormalizedSchema) {
  generateFiles(host, joinPathFragments(__dirname, './files'), options.projectRoot, {
    ...options,
    ...names(options.name),
    tmpl: '',
    offsetFromRoot: offsetFromRoot(options.projectRoot),
  });
}
