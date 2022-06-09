import { ExecutorContext } from '@nrwl/tao/src/shared/workspace';
import { existsSync } from 'fs';
import executor from './executor';
import { GenerateApiLibSourcesExecutorSchema } from './schema';

describe('Command Runner Builder', () => {
  let context: (dir: string) => ExecutorContext;
  let schema: GenerateApiLibSourcesExecutorSchema;
  let dockerSchema: GenerateApiLibSourcesExecutorSchema;

  beforeEach(async () => {
    schema = {
      generator: 'typescript-fetch',
      sourceSpecPathOrUrl:
        './packages/nx-plugin-openapi/src/generators/api-spec/files/src/__name__.openapi.yml__tmpl__',
    };
    dockerSchema = {
      generator: 'typescript-fetch',
      sourceSpecPathOrUrl:
        './packages/nx-plugin-openapi/src/generators/api-spec/files/src/__name__.openapi.yml__tmpl__',
      useDockerBuild: true,
    };

    context = (dir: string) => ({
      root: '/root',
      cwd: '/root',
      projectName: 'proj',
      targetName: 'generate-sources',
      workspace: {
        version: 2,
        npmScope: 'foo',
        projects: {
          proj: {
            root: '',
            sourceRoot: `./tmp/src/${dir}`,
            targets: {},
          },
        },
      },
      isVerbose: false,
    });
  });

  it('can run', async () => {
    jest.setTimeout(30_000);
    const { success } = await executor(schema, context('local'));
    // Expect that it succeeded.
    expect(success).toBe(true);
    expect(existsSync(`./tmp/src/local/index.ts`)).toBe(true);
  });

  it('can run in docker', async () => {
    jest.setTimeout(30_000);
    const { success } = await executor(dockerSchema, context('docker'));
    // Expect that it succeeded.
    expect(success).toBe(true);
    expect(existsSync(`./tmp/src/docker/index.ts`)).toBe(true);
  });
});
