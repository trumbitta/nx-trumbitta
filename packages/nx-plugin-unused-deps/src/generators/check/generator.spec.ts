import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';
import { Tree, addDependenciesToPackageJson, logger } from '@nrwl/devkit';
import * as devkit from '@nrwl/devkit';

import generator from './generator';

// Models
import { CheckGeneratorSchema } from './schema';
import { PackageJsonDeps } from './package-json-deps.model';

describe('check generator', () => {
  let appTree: Tree;

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace(2);
    addDependenciesToPackageJson(appTree, { react: 'latest' }, { jest: 'latest' });
  });

  it('should log to console with no options', async () => {
    const options: CheckGeneratorSchema = {};
    const spy = jest.spyOn(logger, 'log');
    const mockPackageJsonDeps: PackageJsonDeps = {
      dependencies: ['react'],
      devDependencies: ['jest'],
    };

    await generator(appTree, options);

    expect(spy).toHaveBeenCalledWith(mockPackageJsonDeps);
  });

  it('should log to file when requested', async () => {
    const options: CheckGeneratorSchema = { json: true };
    const spy = jest.spyOn(devkit, 'writeJsonFile').mockImplementation(() => null);

    await generator(appTree, options);

    expect(spy).toHaveBeenCalled();
  });

  it('should update package.json when requested', async () => {
    const options: CheckGeneratorSchema = { fix: true };
    const spy = jest.spyOn(devkit, 'removeDependenciesFromPackageJson').mockImplementation(() => null);

    await generator(appTree, options);

    expect(spy).toHaveBeenCalled();
  });
});
