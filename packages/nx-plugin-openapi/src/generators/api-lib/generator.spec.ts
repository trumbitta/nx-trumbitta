// Nrwl
import { Tree, readJson, updateJson, WorkspaceJsonConfiguration, NxJsonConfiguration } from '@nrwl/devkit';
import { projectRootDir, ProjectType } from '@nrwl/workspace';
import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';

// Generator
import libraryGenerator from './generator';

// Schemas
import { ApiLibGeneratorSchema } from './schema';
import { GenerateApiLibSourcesExecutorSchema } from '../../executors/generate-api-lib-sources/schema';

describe('api-lib schematic', () => {
  let appTree: Tree;

  const defaultSchema: ApiLibGeneratorSchema = {
    name: 'my-lib',
    isRemoteSpec: false,
    generator: 'typescript-fetch',
    skipFormat: true,
  };

  beforeEach(async () => {
    appTree = createTreeWithEmptyWorkspace(2);
  });

  describe('not nested', () => {
    it('should update tsconfig.base.json', async () => {
      await libraryGenerator(appTree, defaultSchema);
      const tsconfigJson = readJson(appTree, 'tsconfig.base.json');

      expect(tsconfigJson.compilerOptions.paths[`@proj/${defaultSchema.name}`]).toEqual([
        `libs/${defaultSchema.name}/src/index.ts`,
      ]);
    });

    it('should update root tsconfig.base.json (no existing path mappings)', async () => {
      updateJson(appTree, 'tsconfig.base.json', (json) => {
        json.compilerOptions.paths = undefined;
        return json;
      });

      await libraryGenerator(appTree, defaultSchema);
      const tsconfigJson = readJson(appTree, '/tsconfig.base.json');

      expect(tsconfigJson.compilerOptions.paths[`@proj/${defaultSchema.name}`]).toEqual([
        `libs/${defaultSchema.name}/src/index.ts`,
      ]);
    });

    describe('When the API spec file is remote', () => {
      const sourceSpecUrl = 'http://foo.bar';
      const remoteSchema: ApiLibGeneratorSchema = {
        ...defaultSchema,
        isRemoteSpec: true,
        sourceSpecUrl,
      };

      it('should update workspace.json', async () => {
        await libraryGenerator(appTree, remoteSchema);
        const options: GenerateApiLibSourcesExecutorSchema = {
          generator: remoteSchema.generator,
          sourceSpecPathOrUrl: sourceSpecUrl,
        };
        const workspaceJson = readJson<WorkspaceJsonConfiguration>(appTree, '/workspace.json');

        expect(workspaceJson.projects[remoteSchema.name].root).toEqual(`libs/${remoteSchema.name}`);
        expect(workspaceJson.projects[remoteSchema.name].targets['generate-sources']).toMatchObject({
          executor: '@trumbitta/nx-plugin-openapi:generate-api-lib-sources',
          options,
        });
      });

      it('should NOT add implicitDependencies to nx.json', async () => {
        await libraryGenerator(appTree, remoteSchema);
        const nxJson = readJson<NxJsonConfiguration>(appTree, '/nx.json');

        expect(nxJson.projects).toEqual({
          [remoteSchema.name]: {
            tags: [],
          },
        });
      });
    });

    describe('When the API spec file is local', () => {
      const localSchema: ApiLibGeneratorSchema = {
        ...defaultSchema,
        isRemoteSpec: false,
        sourceSpecLib: 'foo',
        sourceSpecFileRelativePath: 'src/bar.yml',
      };
      it('should update workspace.json', async () => {
        await libraryGenerator(appTree, localSchema);

        const workspaceJson = readJson<WorkspaceJsonConfiguration>(appTree, '/workspace.json');
        const options: GenerateApiLibSourcesExecutorSchema = {
          generator: localSchema.generator,
          sourceSpecPathOrUrl: [
            projectRootDir(ProjectType.Library),
            localSchema.sourceSpecLib,
            localSchema.sourceSpecFileRelativePath,
          ].join('/'),
        };

        expect(workspaceJson.projects[localSchema.name].root).toEqual(`libs/${localSchema.name}`);
        expect(workspaceJson.projects[localSchema.name].targets['generate-sources']).toMatchObject({
          executor: '@trumbitta/nx-plugin-openapi:generate-api-lib-sources',
          options,
        });
      });

      it('should add implicitDependencies to nx.json', async () => {
        await libraryGenerator(appTree, localSchema);
        const nxJson = readJson<NxJsonConfiguration>(appTree, '/nx.json');

        expect(nxJson.projects).toEqual({
          [localSchema.name]: {
            tags: [],
            implicitDependencies: [localSchema.sourceSpecLib],
          },
        });
      });
    });
  });
});
