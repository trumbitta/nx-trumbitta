// Nrwl
import { ensureNxProject, runNxCommandAsync, runNxCommand, runPackageManagerInstall } from '@nrwl/nx-plugin/testing';

describe('Happy-path', () => {
  // beforeAll(() => {
  //   ensureNxProject('@trumbitta/nx-plugin-openapi', 'dist/packages/nx-plugin-openapi');
  //   runPackageManagerInstall();
  // });

  it('should work with a local spec', () => {
    ensureNxProject('@trumbitta/nx-plugin-openapi', 'dist/packages/nx-plugin-openapi');

    runNxCommand(`generate @trumbitta/nx-plugin-openapi:api-spec api-spec --withSample`);

    runNxCommand(
      [
        'generate',
        '@trumbitta/nx-plugin-openapi:api-lib',
        'api-lib',
        '--generator=typescript-fetch',
        '--sourceSpecLib=api-spec',
        `--sourceSpecFileRelativePath=src/api-spec.openapi.yml`,
      ].join(' '),
    );

    const execute = runNxCommand(`run api-lib:generate-sources`);

    // TODO devise proper expectations
    expect(execute).toContain('Done deleting outputDir');
  }, 120000);

  it('should work with a remote spec', () => {
    ensureNxProject('@trumbitta/nx-plugin-openapi', 'dist/packages/nx-plugin-openapi');

    runNxCommand(
      [
        'generate',
        '@trumbitta/nx-plugin-openapi:api-lib',
        'api-lib',
        '--generator=typescript-fetch',
        '--isRemoteSpec=true',
        '--sourceSpecUrl=https://petstore.swagger.io/v2/swagger.json',
      ].join(' '),
    );

    runNxCommand(`run api-lib:generate-sources`);

    // TODO devise proper expectations
    expect(true).toBe(true);
  }, 120000);

  describe('When using the --global-properties option', () => {
    it('should work with just one value', async () => {
      ensureNxProject('@trumbitta/nx-plugin-openapi', 'dist/packages/nx-plugin-openapi');

      runNxCommand(`generate @trumbitta/nx-plugin-openapi:api-spec api-spec --withSample`);

      runNxCommand(
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

      runNxCommand(`run api-lib-global-properties:generate-sources`);

      // TODO devise proper expectations
      expect(true).toBe(true);
    }, 120000);

    it('should work with multiple values', async () => {
      ensureNxProject('@trumbitta/nx-plugin-openapi', 'dist/packages/nx-plugin-openapi');

      runNxCommand(`generate @trumbitta/nx-plugin-openapi:api-spec api-spec --withSample`);

      runNxCommand(
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

      runNxCommand(`run api-lib-global-properties:generate-sources`);

      // TODO devise proper expectations
      expect(true).toBe(true);
    }, 120000);
  });
});
