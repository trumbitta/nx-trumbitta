// Devkit
import { Tree } from '@angular-devkit/schematics';
import { UnitTestTree } from '@angular-devkit/schematics/testing';

// Nrwl
import { NxJson, projectRootDir, ProjectType, readJsonInTree, updateJsonInTree } from '@nrwl/workspace';
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
    it('should update tsconfig.base.json', async () => {
      const tree = await runSchematic('lib', { name: 'myLib' }, appTree);
      const tsconfigJson = readJsonInTree(tree, '/tsconfig.base.json');
      expect(tsconfigJson.compilerOptions.paths['@proj/my-lib']).toEqual(['libs/my-lib/src/index.ts']);
    });

    it('should update root tsconfig.base.json (no existing path mappings)', async () => {
      const updatedTree: any = updateJsonInTree('tsconfig.base.json', (json) => {
        json.compilerOptions.paths = undefined;
        return json;
      })(appTree, null);

      const tree = await runSchematic('lib', { name: 'myLib' }, updatedTree);
      const tsconfigJson = readJsonInTree(tree, '/tsconfig.base.json');
      expect(tsconfigJson.compilerOptions.paths['@proj/my-lib']).toEqual(['libs/my-lib/src/index.ts']);
    });

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
          sourceSpecPathOrUrl: sourceSpecUrl,
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
          sourceSpecPathOrUrl: [
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
