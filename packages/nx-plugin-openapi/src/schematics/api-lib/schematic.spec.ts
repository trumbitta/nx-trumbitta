// Devkit
import { Tree } from '@angular-devkit/schematics';
import { UnitTestTree } from '@angular-devkit/schematics/testing';

// Nrwl
import { NxJson, projectRootDir, ProjectType, readJsonInTree } from '@nrwl/workspace';
import { createEmptyWorkspace } from '@nrwl/workspace/testing';

// Utils
import { runSchematic } from '../../utils/testing';

// Schemas
import { ApiLibSchematicSchema } from './schema';
import { GenerateApiLibSourcesBuilderSchema } from '../../builders/generate-api-lib-sources/schema';

describe('api-lib schematic', () => {
  let appTree: Tree;
  const baseOptions: ApiLibSchematicSchema = {
    name: 'test',
    isRemoteSpec: false,
    generator: 'typescript-fetch',
  };

  beforeEach(() => {
    appTree = createEmptyWorkspace(Tree.empty());
  });

  describe('not nested', () => {
    describe('When the API spec file is remote', () => {
      const sourceSpecUrl = 'http://foo.bar';
      let apiLibOptions: ApiLibSchematicSchema;
      let tree: UnitTestTree;

      beforeEach(async () => {
        apiLibOptions = { ...baseOptions, isRemoteSpec: true, sourceSpecUrl };
        tree = await runSchematic('api-lib', apiLibOptions, appTree);
      });

      it('should update workspace.json', async () => {
        const options: GenerateApiLibSourcesBuilderSchema = {
          generator: apiLibOptions.generator,
          sourceSpecFullPathOrUrl: sourceSpecUrl,
        };
        const workspaceJson = readJsonInTree(tree, '/workspace.json');

        expect(workspaceJson.projects[apiLibOptions.name].root).toEqual(`libs/${apiLibOptions.name}`);
        expect(workspaceJson.projects[apiLibOptions.name].architect['generate-sources']).toMatchObject({
          builder: '@trumbitta/nx-plugin-openapi:generate-api-lib-sources',
          options,
        });
      });

      it('should NOT add implicitDependencies to nx.json', async () => {
        const nxJson = readJsonInTree<NxJson>(tree, '/nx.json');

        expect(nxJson.projects).toEqual({
          [apiLibOptions.name]: {
            tags: [],
          },
        });
      });
    });

    describe('When the API spec file is local', () => {
      let apiLibOptions: ApiLibSchematicSchema;
      let tree: UnitTestTree;

      beforeEach(async () => {
        apiLibOptions = {
          ...baseOptions,
          isRemoteSpec: false,
          sourceSpecLib: 'foo',
          sourceSpecFileRelativePath: 'src/bar.yml',
        };
        tree = await runSchematic('api-lib', apiLibOptions, appTree);
      });

      it('should update workspace.json', () => {
        const workspaceJson = readJsonInTree(tree, '/workspace.json');
        const options: GenerateApiLibSourcesBuilderSchema = {
          generator: apiLibOptions.generator,
          sourceSpecFullPathOrUrl: [
            projectRootDir(ProjectType.Library),
            apiLibOptions.sourceSpecLib,
            apiLibOptions.sourceSpecFileRelativePath,
          ].join('/'),
        };

        expect(workspaceJson.projects[apiLibOptions.name].root).toEqual(`libs/${apiLibOptions.name}`);
        expect(workspaceJson.projects[apiLibOptions.name].architect['generate-sources']).toMatchObject({
          builder: '@trumbitta/nx-plugin-openapi:generate-api-lib-sources',
          options,
        });
      });

      it('should add implicitDependencies to nx.json', () => {
        const nxJson = readJsonInTree<NxJson>(tree, '/nx.json');

        expect(nxJson.projects).toEqual({
          [apiLibOptions.name]: {
            tags: [],
            implicitDependencies: [apiLibOptions.sourceSpecLib],
          },
        });
      });
    });
  });
});
