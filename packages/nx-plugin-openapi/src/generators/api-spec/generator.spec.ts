// Nrwl
import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';
import { Tree, readProjectConfiguration } from '@nrwl/devkit';

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
    it('should create or update project configuration', async () => {
      await libraryGenerator(appTree, defaultSchema);
      const { root } = readProjectConfiguration(appTree, defaultSchema.name);

      expect(root).toEqual(`libs/${defaultSchema.name}`);
    });
  });
});
