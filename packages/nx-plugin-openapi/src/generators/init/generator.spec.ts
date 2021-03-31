// Devkit
import { Tree, readJson } from '@nrwl/devkit';
import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';

// Generator
import libraryGenerator from './generator';

// Schema
import { InitGeneratorSchema } from './schema';

describe('init schematic', () => {
  let appTree: Tree;
  const defaultSchema: InitGeneratorSchema = { skipFormat: false };

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace();
  });

  it('should add openapi dep to package.json if not already present', async () => {
    await libraryGenerator(appTree, defaultSchema);
    const packageJson = readJson(appTree, '/package.json');

    expect(packageJson).toMatchObject({
      dependencies: {},
      devDependencies: {
        '@openapitools/openapi-generator-cli': expect.anything(),
      },
    });
  });
});
