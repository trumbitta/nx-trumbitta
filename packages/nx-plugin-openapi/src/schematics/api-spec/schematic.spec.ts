// Devkit
import { Tree } from '@angular-devkit/schematics';

// Nrwl
import { NxJson, readJsonInTree } from '@nrwl/workspace';
import { createEmptyWorkspace } from '@nrwl/workspace/testing';

// Utils
import { runSchematic } from '../../utils/testing';

// Schema
import { ApiSpecSchematicSchema } from './schema';

describe('api-spec schematic', () => {
  let appTree: Tree;
  const options: ApiSpecSchematicSchema = { name: 'test' };

  beforeEach(() => {
    appTree = createEmptyWorkspace(Tree.empty());
  });

  describe('not nested', () => {
    it('should update workspace.json', async () => {
      const tree = await runSchematic('api-spec', options, appTree);
      const workspaceJson = readJsonInTree(tree, '/workspace.json');

      expect(workspaceJson.projects[options.name].root).toEqual(`libs/${options.name}`);
    });

    it('should update nx.json', async () => {
      const tree = await runSchematic('api-spec', options, appTree);
      const nxJson = readJsonInTree<NxJson>(tree, '/nx.json');
      expect(nxJson.projects).toEqual({
        [options.name]: {
          tags: [],
        },
      });
    });
  });
});
