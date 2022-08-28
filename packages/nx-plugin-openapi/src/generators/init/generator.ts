// Devkit
import { GeneratorCallback, Tree, addDependenciesToPackageJson } from '@nrwl/devkit';

// Nrwl
import { runTasksInSerial } from '@nrwl/workspace/src/utilities/run-tasks-in-serial';

// Utils
import { openapiGeneratorCliVersion } from '../../utils/versions';

export default async function (tree: Tree) {
  const tasks: GeneratorCallback[] = [];

  // Add openapi-generator-cli to dev dependencies
  const addDependenciesTask = addDependenciesToPackageJson(
    tree,
    {},
    { '@openapitools/openapi-generator-cli': openapiGeneratorCliVersion },
  );
  tasks.push(addDependenciesTask);

  return runTasksInSerial(...tasks);
}
