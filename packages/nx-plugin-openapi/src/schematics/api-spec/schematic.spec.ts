import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import { createEmptyWorkspace } from '@nrwl/workspace/testing';
import { join } from 'path';

import { ApiSpecSchematicSchema } from './schema';

describe('nx-plugin-openapi schematic', () => {
  let appTree: Tree;
  const options: ApiSpecSchematicSchema = { name: 'test' };

  const testRunner = new SchematicTestRunner(
    '@trumbitta/nx-plugin-openapi',
    join(__dirname, '../../../collection.json')
  );

  beforeEach(() => {
    appTree = createEmptyWorkspace(Tree.empty());
  });

  it('should run successfully', async () => {
    await expect(
      testRunner.runSchematicAsync('api-spec', options, appTree).toPromise()
    ).resolves.not.toThrowError();
  });
});
