// Based on code by Philip Fulcher @PhilipJFulcher

import { logger, readJson, removeDependenciesFromPackageJson, writeJsonFile, Tree } from '@nrwl/devkit';
import { createProjectGraphAsync } from '@nrwl/workspace/src/core/project-graph';

// Models
import { CheckGeneratorSchema } from './schema';
import { PackageJsonDeps } from './package-json-deps.model';

interface PackageRecord {
  [key: string]: number;
}

interface PackageJson {
  dependencies: {
    [key: string]: string;
  };
  devDependencies: {
    [key: string]: string;
  };
}

export default async function (tree: Tree, options: CheckGeneratorSchema) {
  const packageRecord: PackageRecord = await checkDeps();
  const packageJson = readJson<PackageJson>(tree, 'package.json');
  const jsonFile = `.nx-plugin-unused-deps.json`;

  const filterPackageRecord = (depName) => !packageRecord[`npm:${depName}`];
  const dependencies: PackageJsonDeps = {
    dependencies: Object.keys(packageJson.dependencies).filter(filterPackageRecord),
    devDependencies: Object.keys(packageJson.devDependencies).filter(filterPackageRecord),
  };

  logDependencies(dependencies, options.json, jsonFile);

  if (options.fix) {
    updatePackageJson(tree, dependencies);
  }
}

function updatePackageJson(tree: Tree, packageJsonDeps: PackageJsonDeps) {
  const { dependencies, devDependencies } = packageJsonDeps;
  removeDependenciesFromPackageJson(tree, dependencies, devDependencies);

  logger.info(`nx-plugin-unused-deps - updated package.json`);
}

function logDependencies(dependencies: PackageJsonDeps, toJson: CheckGeneratorSchema['json'], jsonFile: string) {
  logger.log(dependencies);

  if (toJson) {
    writeJsonFile(jsonFile, dependencies);

    logger.info(`nx-plugin-unused-deps - unused dependencies written to:\n${jsonFile}`);
  }
}

async function checkDeps(packageRecord: PackageRecord = {}) {
  const graph = await createProjectGraphAsync();

  Object.keys(graph.dependencies).forEach((projectName) => {
    const deps = graph.dependencies[projectName];

    const libNames = deps.filter((dep) => dep.target.startsWith('npm')).map((dep) => dep.target);

    libNames.forEach((libName) => {
      if (packageRecord[libName] === undefined) {
        packageRecord[libName] = 1;
      } else {
        packageRecord[libName]++;
      }
    });
  });

  return packageRecord;
}
