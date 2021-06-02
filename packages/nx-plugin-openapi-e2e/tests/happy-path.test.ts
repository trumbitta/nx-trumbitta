// Nrwl
import { ensureNxProject, runNxCommandAsync } from '@nrwl/nx-plugin/testing';

describe('Happy-path', () => {
  it('should work with a local spec', async (done) => {
    ensureNxProject('@trumbitta/nx-plugin-openapi', 'dist/packages/nx-plugin-openapi');

    await runNxCommandAsync(`generate @trumbitta/nx-plugin-openapi:api-spec api-spec --withSample`);

    await runNxCommandAsync(
      [
        'generate',
        '@trumbitta/nx-plugin-openapi:api-lib',
        'api-lib',
        '--generator=typescript-fetch',
        '--sourceSpecLib=api-spec',
        `--sourceSpecFileRelativePath=src/api-spec.openapi.yml`,
      ].join(' '),
    );

    await runNxCommandAsync(`run api-lib:generate-sources`);

    // TODO devise proper expectations
    expect(true).toBe(true);
    done();
  }, 90000);

  it('should work with a remote spec', async (done) => {
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
    done();
  }, 90000);

  describe('When using the --global-properties option', () => {
    it('should work with just one value', async (done) => {
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
      done();
    }, 90000);

    it('should work with multiple values', async (done) => {
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
      done();
    }, 90000);
  });
});
