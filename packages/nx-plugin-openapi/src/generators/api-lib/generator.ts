// Nrwl
import {
  Tree,
  generateFiles,
  addProjectConfiguration,
  updateJson,
  GeneratorCallback,
  getWorkspaceLayout,
  joinPathFragments,
  formatFiles,
  names,
  offsetFromRoot,
  ProjectType,
  readWorkspaceConfiguration,
} from '@nrwl/devkit';
import { runTasksInSerial } from '@nrwl/workspace/src/utilities/run-tasks-in-serial';

// Third Parties
import { join } from 'path';

// Schematics
import init from '../init/generator';

// Schemas
import { ApiLibGeneratorSchema } from './schema';
import { GenerateApiLibSourcesExecutorSchema } from '../../executors/generate-api-lib-sources/schema';

const projectType: ProjectType = 'library';

interface NormalizedSchema extends ApiLibGeneratorSchema {
  projectName: string;
  projectRoot: string;
  projectRootApiSpecLib?: string;
  projectDirectory: string;
  parsedTags: string[];
}

export default async function (tree: Tree, schema: ApiLibGeneratorSchema) {
  const tasks: GeneratorCallback[] = [];

  const options = normalizeOptions(tree, schema);

  // Init
  const initTask = await init(tree);
  tasks.push(initTask);

  // Add Project
  addProject(tree, options);

  // Create files
  createFiles(tree, options);

  // Update TS config
  updateTsConfig(tree, options);

  // Format
  if (!schema.skipFormat) {
    await formatFiles(tree);
  }

  return runTasksInSerial(...tasks);
}

function normalizeOptions(host: Tree, options: ApiLibGeneratorSchema): NormalizedSchema {
  const name = names(options.name).fileName;
  const projectDirectory = options.directory ? `${names(options.directory).fileName}/${name}` : name;
  const projectName = projectDirectory.replace(new RegExp('/', 'g'), '-');
  const { libsDir, npmScope } = getWorkspaceLayout(host);
  const projectRoot = joinPathFragments(`${libsDir}/${projectDirectory}`);

  const workspaceLayout = readWorkspaceConfiguration(host).workspaceLayout ?? { libsDir: 'libs' };
  const projectRootApiSpecLib =
    !options.isRemoteSpec && options.sourceSpecLib ? `${workspaceLayout.libsDir}/${options.sourceSpecLib}` : undefined;
  const parsedTags = options.tags ? options.tags.split(',').map((s) => s.trim()) : [];
  const importPath = options.importPath || `@${npmScope}/${projectDirectory}`;

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

const getExecutorOptions = (options: NormalizedSchema): GenerateApiLibSourcesExecutorSchema => {
  const executorOptions: GenerateApiLibSourcesExecutorSchema = {
    generator: options.generator,
    sourceSpecPathOrUrl: options.isRemoteSpec
      ? options.sourceSpecUrl
      : [options.projectRootApiSpecLib, options.sourceSpecFileRelativePath].join('/'),
    additionalProperties: options.additionalProperties,
    globalProperties: options.globalProperties,
  };

  if (options.isRemoteSpec && options.sourceSpecUrlAuthorizationHeaders) {
    executorOptions.sourceSpecUrlAuthorizationHeaders = options.sourceSpecUrlAuthorizationHeaders;
  }

  return executorOptions;
};

const addProject = (host: Tree, options: NormalizedSchema) => {
  const executorOptions = getExecutorOptions(options);

  addProjectConfiguration(host, options.projectName, {
    root: options.projectRoot,
    sourceRoot: joinPathFragments(options.projectRoot, 'src'),
    projectType,
    targets: {
      'generate-sources': {
        executor: '@trumbitta/nx-plugin-openapi:generate-api-lib-sources',
        options: executorOptions,
      },
    },
    implicitDependencies: !options.isRemoteSpec && options.sourceSpecLib ? [options.sourceSpecLib] : undefined,
    tags: options.parsedTags,
  });
};

function createFiles(host: Tree, options: NormalizedSchema) {
  generateFiles(host, join(__dirname, './files'), options.projectRoot, {
    ...options,
    ...names(options.name),
    dot: '.',
    tmpl: '',
    offsetFromRoot: offsetFromRoot(options.projectRoot),
  });
}

function updateTsConfig(host: Tree, options: NormalizedSchema): void {
  updateJson(host, 'tsconfig.base.json', (json) => {
    const compilerOptions = json.compilerOptions;
    compilerOptions.paths = compilerOptions.paths || {};
    delete compilerOptions.paths[options.name];
    if (compilerOptions.paths[options.importPath]) {
      throw new Error(
        `You already have a library using the import path "${options.importPath}". Make sure to specify a unique one.`,
      );
    }

    const { libsDir } = getWorkspaceLayout(host);
    compilerOptions.paths[options.importPath] = [`${libsDir}/${options.projectDirectory}/src/index.ts`];

    return json;
  });
}
