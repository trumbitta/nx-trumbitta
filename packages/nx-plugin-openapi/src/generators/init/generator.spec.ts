// Devkit
import { Tree, readJson } from '@nrwl/devkit';

// Generator
import libraryGenerator from './generator';

// Utils
import { createTreeWithEmptyV2Workspace } from '../../utils/test-utils';

describe('init schematic', () => {
  let appTree: Tree;

  beforeEach(() => {
    appTree = createTreeWithEmptyV2Workspace();
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
