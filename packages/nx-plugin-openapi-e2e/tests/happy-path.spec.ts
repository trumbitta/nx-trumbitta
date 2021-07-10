// Nrwl
import { ensureNxProject, runNxCommandAsync } from '@nrwl/nx-plugin/testing';

describe('Happy-path', () => {
  it('should work with a local spec', async () => {
    ensureNxProject('@trumbitta/nx-plugin-openapi', 'dist/packages/nx-plugin-openapi');

    const generate1 = await runNxCommandAsync(`generate @trumbitta/nx-plugin-openapi:api-spec api-spec --withSample`);

    const generate2 = await runNxCommandAsync(
      [
        'generate',
        '@trumbitta/nx-plugin-openapi:api-lib',
        'api-lib',
        '--generator=typescript-fetch',
        '--sourceSpecLib=api-spec',
        `--sourceSpecFileRelativePath=src/api-spec.openapi.yml`,
      ].join(' '),
    );

    const execute = await runNxCommandAsync(`run api-lib:generate-sources`);

    // TODO devise proper expectations
    expect(execute.stdout).toContain('Done deleting outputDir');
  }, 120000);

  it('should work with a remote spec', async () => {
    ensureNxProject('@trumbitta/nx-plugin-openapi', 'dist/packages/nx-plugin-openapi');

    await runNxCommandAsync(
      [
        'generate',
        '@trumbitta/nx-plugin-openapi:api-lib',
        'api-lib',
        '--generator=typescript-fetch',
        '--isRemoteSpec=true',
        '--sourceSpecUrl=https://petstore.swagger.io/v2/swagger.json',
      ].join(' '),
    );

    await runNxCommandAsync(`run api-lib:generate-sources`);

    // TODO devise proper expectations
    expect(true).toBe(true);
  }, 120000);

  describe('When using the --global-properties option', () => {
    it('should work with just one value', async () => {
      ensureNxProject('@trumbitta/nx-plugin-openapi', 'dist/packages/nx-plugin-openapi');

      await runNxCommandAsync(`generate @trumbitta/nx-plugin-openapi:api-spec api-spec --withSample`);

      await runNxCommandAsync(
        [
          'generate',
          '@trumbitta/nx-plugin-openapi:api-lib',
          'api-lib-global-properties',
          '--generator=typescript-fetch',
          '--sourceSpecLib=api-spec',
          `--sourceSpecFileRelativePath=src/api-spec.openapi.yml`,
          `--global-properties=apis`,
        ].join(' '),
      );

      await runNxCommandAsync(`run api-lib-global-properties:generate-sources`);

      // TODO devise proper expectations
      expect(true).toBe(true);
    }, 120000);

    it('should work with multiple values', async () => {
      ensureNxProject('@trumbitta/nx-plugin-openapi', 'dist/packages/nx-plugin-openapi');

      await runNxCommandAsync(`generate @trumbitta/nx-plugin-openapi:api-spec api-spec --withSample`);

      await runNxCommandAsync(
        [
          'generate',
          '@trumbitta/nx-plugin-openapi:api-lib',
          'api-lib-global-properties',
          '--generator=typescript-fetch',
          '--sourceSpecLib=api-spec',
          `--sourceSpecFileRelativePath=src/api-spec.openapi.yml`,
          `--global-properties=apis,supportingFiles=runtime.ts`,
        ].join(' '),
      );

      await runNxCommandAsync(`run api-lib-global-properties:generate-sources`);

      // TODO devise proper expectations
      expect(true).toBe(true);
    }, 120000);
  });
});
