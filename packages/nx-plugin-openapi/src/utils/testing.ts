import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import { Tree } from '@angular-devkit/schematics';

import { join } from 'path';

const testRunner = new SchematicTestRunner(
  '@trumbitta/nx-plugin-openapi',
  join(__dirname, '../../collection.json')
);

export function runSchematic<SchemaOptions = any>(
  schematicName: string,
  options: SchemaOptions,
  tree: Tree
) {
  return testRunner.runSchematicAsync(schematicName, options, tree).toPromise();
}
