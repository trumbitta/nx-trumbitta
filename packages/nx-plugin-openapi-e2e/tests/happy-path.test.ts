// Nrwl
import { ensureNxProject, runNxCommandAsync } from '@nrwl/nx-plugin/testing';
import { projectRootDir, ProjectType } from '@nrwl/workspace';

describe('happy-path e2e', () => {
  it('should work', async (done) => {
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

    expect(true).toBe(true);
    done();
  }, 90000);
});
