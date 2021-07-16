// Nrwl
import { Tree, readJson } from '@nrwl/devkit';
import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';

// Generator
import libraryGenerator from './generator';

describe('init schematic', () => {
  let appTree: Tree;

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace(2);
  });

  it('should add openapi dep to package.json if not already present', async () => {
    await libraryGenerator(appTree);
    const packageJson = readJson(appTree, '/package.json');

    expect(packageJson).toMatchObject({
      dependencies: {},
      devDependencies: {
        '@openapitools/openapi-generator-cli': expect.anything(),
      },
    });
  });
});
