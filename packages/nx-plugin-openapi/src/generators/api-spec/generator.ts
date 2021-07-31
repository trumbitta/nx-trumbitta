// Nrwl
import {
  Tree,
  generateFiles,
  formatFiles,
  addProjectConfiguration,
  GeneratorCallback,
  joinPathFragments,
  names,
  offsetFromRoot,
  ProjectType,
  readWorkspaceConfiguration,
} from '@nrwl/devkit';
import { runTasksInSerial } from '@nrwl/workspace/src/utilities/run-tasks-in-serial';

// Schematics
import init from '../init/generator';

// Schema
import { ApiSpecGeneratorSchema } from './schema';

const projectType: ProjectType = 'library';

interface NormalizedSchema extends ApiSpecGeneratorSchema {
  projectName: string;
  projectRoot: string;
  projectDirectory: string;
  parsedTags: string[];
}

export default async function (tree: Tree, schema: ApiSpecGeneratorSchema) {
  const tasks: GeneratorCallback[] = [];

  const options = normalizeOptions(schema, tree);

  // Init
  const initTask = await init(tree);
  tasks.push(initTask);

  // Add Project
  addProject(tree, options);

  // Create Files
  createFiles(tree, options);

  // Format
  if (!options.skipFormat) {
    await formatFiles(tree);
  }

  return runTasksInSerial(...tasks);
}

function normalizeOptions(options: ApiSpecGeneratorSchema, tree: Tree): NormalizedSchema {
  const name = names(options.name).fileName;
  const projectDirectory = options.directory ? `${names(options.directory).fileName}/${name}` : name;
  const projectName = projectDirectory.replace(new RegExp('/', 'g'), '-');
  const workspaceLayout = readWorkspaceConfiguration(tree).workspaceLayout ?? { libsDir: 'libs' };
  const projectRoot = `${workspaceLayout.libsDir}/${projectDirectory}`;
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
  !options.withSample && host.write(joinPathFragments(options.projectRoot, 'src/.gitkeep'), '');

  options.withSample &&
    generateFiles(host, joinPathFragments(__dirname, './files'), options.projectRoot, {
      ...options,
      ...names(options.name),
      tmpl: '',
      offsetFromRoot: offsetFromRoot(options.projectRoot),
    });
}
