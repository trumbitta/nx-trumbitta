// Nrwl
import { ensureNxProject, runNxCommand, uniq } from '@nrwl/nx-plugin/testing';
import { existsSync } from 'fs';

describe('Happy-path', () => {
  let apiSpecLibName: string;
  let apiLibLibName: string;

  beforeAll(() => {
    ensureNxProject('@trumbitta/nx-plugin-openapi', 'dist/packages/nx-plugin-openapi');
  });

  beforeEach(() => {
    apiSpecLibName = uniq('api-spec');
    apiLibLibName = uniq('api-lib');
  });

  it('should work with a local spec', () => {
    runNxCommand(`generate @trumbitta/nx-plugin-openapi:api-spec ${apiSpecLibName} --withSample`);

    runNxCommand(
      [
        'generate',
        '@trumbitta/nx-plugin-openapi:api-lib',
        apiLibLibName,
        '--generator=typescript-fetch',
        `--sourceSpecLib=${apiSpecLibName}`,
        `--sourceSpecFileRelativePath=src/${apiSpecLibName}.openapi.yml`,
      ].join(' '),
    );

    const execute = runNxCommand(`run ${apiLibLibName}:generate-sources`);

    // TODO devise proper expectations
    expect(execute).toContain('Done deleting outputDir');
    expect(existsSync(`./tmp/nx-e2e/proj/libs/${apiLibLibName}/src/index.ts`)).toBe(true);
  }, 120000);

  it('should work with docker', () => {
    runNxCommand(`generate @trumbitta/nx-plugin-openapi:api-spec ${apiSpecLibName} --withSample`);

    runNxCommand(
      [
        'generate',
        '@trumbitta/nx-plugin-openapi:api-lib',
        apiLibLibName,
        '--useDockerBuild=true',
        '--generator=typescript-fetch',
        `--sourceSpecLib=${apiSpecLibName}`,
        `--sourceSpecFileRelativePath=src/${apiSpecLibName}.openapi.yml`,
      ].join(' '),
    );

    const execute = runNxCommand(`run ${apiLibLibName}:generate-sources`);

    // TODO devise proper expectations
    expect(execute).toContain('Done deleting outputDir');
    expect(existsSync(`./tmp/nx-e2e/proj/libs/${apiLibLibName}/src/index.ts`)).toBe(true);
  }, 120000);

  it('should work with a remote spec', () => {
    runNxCommand(
      [
        'generate',
        '@trumbitta/nx-plugin-openapi:api-lib',
        apiLibLibName,
        '--generator=typescript-fetch',
        '--isRemoteSpec=true',
        '--sourceSpecUrl=https://petstore.swagger.io/v2/swagger.json',
      ].join(' '),
    );

    const execute = runNxCommand(`run ${apiLibLibName}:generate-sources`);

    // TODO devise proper expectations
    expect(execute).toContain('Done deleting outputDir');
  }, 120000);

  describe('When using the --global-properties option', () => {
    it('should work with just one value', async () => {
      runNxCommand(`generate @trumbitta/nx-plugin-openapi:api-spec ${apiSpecLibName} --withSample`);

      runNxCommand(
        [
          'generate',
          '@trumbitta/nx-plugin-openapi:api-lib',
          apiLibLibName,
          '--generator=typescript-fetch',
          `--sourceSpecLib=${apiSpecLibName}`,
          `--sourceSpecFileRelativePath=src/${apiSpecLibName}.openapi.yml`,
          `--global-properties=apis`,
        ].join(' '),
      );

      const execute = runNxCommand(`run ${apiLibLibName}:generate-sources`);

      // TODO devise proper expectations
      expect(execute).toContain('Done deleting outputDir');
    }, 120000);

    it('should work with multiple values', async () => {
      runNxCommand(`generate @trumbitta/nx-plugin-openapi:api-spec ${apiSpecLibName} --withSample`);

      runNxCommand(
        [
          'generate',
          '@trumbitta/nx-plugin-openapi:api-lib',
          apiLibLibName,
          '--generator=typescript-fetch',
          `--sourceSpecLib=${apiSpecLibName}`,
          `--sourceSpecFileRelativePath=src/${apiSpecLibName}.openapi.yml`,
          `--global-properties=apis,supportingFiles=runtime.ts`,
        ].join(' '),
      );

      const execute = runNxCommand(`run ${apiLibLibName}:generate-sources`);

      // TODO devise proper expectations
      expect(execute).toContain('Done deleting outputDir');
    }, 120000);
  });
});
