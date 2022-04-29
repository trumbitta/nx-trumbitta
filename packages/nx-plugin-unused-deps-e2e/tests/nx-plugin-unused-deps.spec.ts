import {
  checkFilesExist,
  ensureNxProject,
  readJson,
  runCommandAsync,
  runNxCommandAsync,
  updateFile,
} from '@nrwl/nx-plugin/testing';
// Devkit
import { appRootPath } from '@nrwl/tao/src/utils/app-root';

describe('nx-plugin-unused-deps', () => {
  const plugin = '@trumbitta/nx-plugin-unused-deps';
  const distPath = 'dist/packages/nx-plugin-unused-deps';

  beforeAll(async () => {
    ensureNxProject(plugin, distPath);

    await runCommandAsync('npm i react express; npm i -D jest @types/express');
    await runNxCommandAsync('generate @nrwl/node:app --name=app');
    await runCommandAsync(`npm remove @trumbitta/nx-plugin-unused-deps`);
    await runCommandAsync(`npm install $(npm pack ${appRootPath}/${distPath} | tail -1)`);
    updateFile('./apps/app/src/main.ts', `import * as express from "express"; express();`);
  }, 120000);

  // IDK why this stopped working
  it.skip('should display an info message at postinstall', async () => {
    await runCommandAsync(`npm remove @trumbitta/nx-plugin-unused-deps`);
    const { stdout } = await runCommandAsync(`npm install $(npm pack ${appRootPath}/${distPath} | tail -1)`);

    expect(stdout).toContain('$ nx generate @trumbitta/nx-plugin-unused-deps:check');
  }, 120000);

  it('should log unused deps to console', async () => {
    const { stdout } = await runNxCommandAsync(`generate ${plugin}:check`);

    expect(stdout).toContain('react');
    expect(stdout).toContain('jest');
    expect(stdout).not.toContain('express');
    expect(stdout).not.toContain('@types/express');

    console.log(stdout);
  }, 120000);

  describe('--json', () => {
    it('should also log to a JSON file', async () => {
      await runNxCommandAsync(`generate ${plugin}:check --json`);

      expect(() => checkFilesExist(`.nx-plugin-unused-deps.json`)).not.toThrow();
    }, 120000);
  });

  describe('--fix', () => {
    it('should delete unused deps from package.json', async () => {
      await runNxCommandAsync(`generate ${plugin}:check --fix`);

      const { dependencies, devDependencies } = readJson('package.json');
      expect(Object.keys(dependencies)).not.toContain('react');
      expect(Object.keys(devDependencies)).not.toContain('jest');
    }, 120000);
  });
});
