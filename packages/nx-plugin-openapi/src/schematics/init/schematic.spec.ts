// Devkit
import { Tree } from '@angular-devkit/schematics';

// Nrwl
import { createEmptyWorkspace } from '@nrwl/workspace/testing';
import { readJsonInTree } from '@nrwl/workspace';

// Utils
import { runSchematic } from '../../utils/testing';

// Schema
import { InitSchematicSchema } from './schema';

describe('init schematic', () => {
  let appTree: Tree;
  const options: InitSchematicSchema = { skipFormat: false };

  beforeEach(() => {
    appTree = createEmptyWorkspace(Tree.empty());
  });

  it('should add openapi dep to package.json if not already present', async () => {
    const tree = await runSchematic('init', options, appTree);
    const packageJson = readJsonInTree(tree, '/package.json');

    expect(packageJson).toMatchObject({
      dependencies: {},
      devDependencies: {
        '@openapitools/openapi-generator-cli': expect.anything(),
      },
    });
  });
});
