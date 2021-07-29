// Nrwl
import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';
import { NxJsonConfiguration, readJson, Tree, readProjectConfiguration } from '@nrwl/devkit';

// Generator
import libraryGenerator from './generator';

// Schema
import { ApiSpecGeneratorSchema } from './schema';

describe('api-spec schematic', () => {
  let appTree: Tree;
  const defaultSchema: ApiSpecGeneratorSchema = { name: 'test' };

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace(2);
  });

  describe('not nested', () => {
    it('should update workspace.json', async () => {
      await libraryGenerator(appTree, defaultSchema);
      const projectRoot = readProjectConfiguration(appTree, defaultSchema.name).root;

      expect(projectRoot).toEqual(`libs/${defaultSchema.name}`);
    });

    it('should update nx.json', async () => {
      await libraryGenerator(appTree, defaultSchema);

      const nxJson = readJson<NxJsonConfiguration>(appTree, '/nx.json');
      expect(nxJson.projects).toEqual({
        [defaultSchema.name]: {
          tags: [],
        },
      });
    });
  });
});
