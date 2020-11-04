// Devkit
import { Tree } from '@angular-devkit/schematics';

// Nrwl
import { NxJson, readJsonInTree } from '@nrwl/workspace';
import { createEmptyWorkspace } from '@nrwl/workspace/testing';

// Utils
import { runSchematic } from '../../utils/testing';

// Schema
import { ApiLibSchematicSchema } from './schema';

describe('api-lib schematic', () => {
  let appTree: Tree;
  const options: ApiLibSchematicSchema = {
    name: 'test',
    sourceSpecLib: 'foo',
    sourceSpecFileRelativePath: 'src/bar.yml',
    openapitoolsGenerator: 'typescript-fetch',
  };

  beforeEach(() => {
    appTree = createEmptyWorkspace(Tree.empty());
  });

  describe('not nested', () => {
    it('should update workspace.json', async () => {
      const tree = await runSchematic('api-lib', options, appTree);
      const workspaceJson = readJsonInTree(tree, '/workspace.json');

      expect(workspaceJson.projects[options.name].root).toEqual(`libs/${options.name}`);
      expect(workspaceJson.projects[options.name].architect['generate-sources']).toMatchObject({
        builder: '@trumbitta/nx-plugin-openapi:generate-api-lib-sources',
        options: {
          generator: options.openapitoolsGenerator,
        },
      });
    });

    it('should update nx.json', async () => {
      const tree = await runSchematic('api-lib', options, appTree);
      const nxJson = readJsonInTree<NxJson>(tree, '/nx.json');
      expect(nxJson.projects).toEqual({
        [options.name]: {
          tags: [],
          implicitDependencies: [options.sourceSpecLib],
        },
      });
    });
  });
});
