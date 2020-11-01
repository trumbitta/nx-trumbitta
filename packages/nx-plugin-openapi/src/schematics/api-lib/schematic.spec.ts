import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import { NxJson, readJsonInTree } from '@nrwl/workspace';
import { createEmptyWorkspace } from '@nrwl/workspace/testing';
import { join } from 'path';
import { runSchematic } from '../../utils/testing';

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

      expect(workspaceJson.projects[options.name].root).toEqual(
        `libs/${options.name}`
      );
      expect(
        workspaceJson.projects[options.name].architect.build
      ).toMatchObject({
        builder: '@trumbitta/api-lib:build',
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
