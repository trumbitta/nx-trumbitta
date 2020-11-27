// Devkit
import { Architect } from '@angular-devkit/architect';
import { TestingArchitectHost } from '@angular-devkit/architect/testing';
import { schema } from '@angular-devkit/core';

// Third Parties
import { join } from 'path';

// Schema
import { GenerateApiLibSourcesBuilderSchema } from './schema';

const options: GenerateApiLibSourcesBuilderSchema = {
  generator: 'typescript-fetch',
  sourceSpecPathOrUrl: '',
};

// Disabling this until I figure out how to test it
xdescribe('Command Runner Builder', () => {
  let architect: Architect;
  let architectHost: TestingArchitectHost;

  beforeEach(async () => {
    const registry = new schema.CoreSchemaRegistry();
    registry.addPostTransform(schema.transforms.addUndefinedDefaults);

    architectHost = new TestingArchitectHost('/root', '/root');
    architect = new Architect(architectHost, registry);

    // This will either take a Node package name, or a path to the directory
    // for the package.json file.
    await architectHost.addBuilderFromPackage(join(__dirname, '../../..'));
  });

  it('can run', async () => {
    // A "run" can have multiple outputs, and contains progress information.
    const run = await architect.scheduleBuilder('@trumbitta/nx-plugin-openapi:generate-api-lib-sources', options);
    // The "result" member (of type BuilderOutput) is the next output.
    const output = await run.result;

    // Stop the builder from running. This stops Architect from keeping
    // the builder-associated states in memory, since builders keep waiting
    // to be scheduled.
    await run.stop();

    // Expect that it succeeded.
    expect(output.success).toBe(true);
  });
});
