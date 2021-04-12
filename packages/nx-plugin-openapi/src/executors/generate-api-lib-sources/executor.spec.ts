// Schema
import { GenerateApiLibSourcesExecutorSchema } from './schema';

import executor from './executor';

import { ExecutorContext } from '@nrwl/tao/src/shared/workspace';

// Disabling this until I figure out how to test it
// Probably childProcess should be mocked
// Probably should ckeck openapi params too
xdescribe('Command Runner Builder', () => {
  let context: ExecutorContext;
  let schema: GenerateApiLibSourcesExecutorSchema;

  beforeEach(async () => {
    schema = {
      generator: 'typescript-fetch',
      sourceSpecPathOrUrl: '',
    };

    context = {
      root: '/root',
      cwd: '/root',
      projectName: 'proj',
      targetName: 'generate-sources',
      workspace: {
        version: 2,
        projects: {
          proj: {
            root: '',
            sourceRoot: 'src',
            targets: {},
          },
        },
      },
      isVerbose: false,
    };
  });

  it('can run', async () => {
    const { success } = await executor(schema, context);
    // Expect that it succeeded.
    expect(success).toBe(true);
  });
});
