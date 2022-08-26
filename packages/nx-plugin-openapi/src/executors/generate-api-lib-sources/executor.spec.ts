jest.mock('child_process');
jest.mock('@nrwl/devkit');

import { logger } from '@nrwl/devkit';
import { ExecutorContext } from '@nrwl/tao/src/shared/workspace';
import { mockSpawn } from '../../test/mockSpawn';
import executor from './executor';
import { GenerateApiLibSourcesExecutorSchema } from './schema';

beforeEach(() => {
  jest.resetAllMocks();
});

describe('Command Runner Builder', () => {
  let context: (dir: string) => ExecutorContext;
  let schema: GenerateApiLibSourcesExecutorSchema;
  let dockerSchema: GenerateApiLibSourcesExecutorSchema;
  logger.log = jest.fn();
  logger.error = jest.fn();

  beforeEach(async () => {
    schema = {
      generator: 'typescript-fetch',
      sourceSpecPathOrUrl: 'open-api-spec.yml',
    };
    dockerSchema = {
      generator: 'typescript-fetch',
      sourceSpecPathOrUrl: 'open-api-spec.yml',
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
    const allSpawned = mockSpawn({
      command: 'npx',
      args: [
        'openapi-generator-cli',
        'generate',
        ...['-i', 'open-api-spec.yml'],
        ...['-g', 'typescript-fetch'],
        ...['-o', './tmp/src/local'],
      ],
      exitCode: 0,
    });
    const { success } = await executor(schema, context('local'));
    expect(success).toBe(true);
    allSpawned();
  });

  it('can run in docker', async () => {
    const allSpawned = mockSpawn({
      command: 'docker',
      args: [
        'run',
        '--rm',
        ...['-v', `${process.cwd()}:/local`],
        ...['-w', '/local'],
        'openapitools/openapi-generator-cli',
        'generate',
        ...['-i', 'open-api-spec.yml'],
        ...['-g', 'typescript-fetch'],
        ...['-o', './tmp/src/docker'],
      ],
      exitCode: 0,
    });
    const { success } = await executor(dockerSchema, context('docker'));
    expect(success).toBe(true);
    allSpawned();
  });

  it('can run with output', async () => {
    const allSpawned = mockSpawn({
      command: 'npx',
      args: [
        'openapi-generator-cli',
        'generate',
        ...['-i', 'open-api-spec.yml'],
        ...['-g', 'typescript-fetch'],
        ...['-o', './tmp/src/local'],
      ],
      stdout: 'stdout content',
      stderr: 'stderr content',
      exitCode: 0,
    });
    const { success } = await executor(schema, context('local'));
    expect(success).toBe(true);
    expect(logger.info).toHaveBeenLastCalledWith(expect.stringContaining('stdout content'));
    expect(logger.error).toHaveBeenLastCalledWith(expect.stringContaining('stderr content'));
    allSpawned();
  });

  it('can run without output', async () => {
    const allSpawned = mockSpawn({
      command: 'npx',
      args: [
        'openapi-generator-cli',
        'generate',
        ...['-i', 'open-api-spec.yml'],
        ...['-g', 'typescript-fetch'],
        ...['-o', './tmp/src/local'],
      ],
      stdout: 'stdout content',
      stderr: 'stderr content',
      exitCode: 0,
    });
    expect(logger.info).not.toHaveBeenLastCalledWith(expect.stringContaining('stdout content'));
    expect(logger.error).not.toHaveBeenLastCalledWith(expect.stringContaining('stderr content'));
    const { success } = await executor({ ...schema, silent: true }, context('local'));
    expect(success).toBe(true);
    allSpawned();
  });
});
