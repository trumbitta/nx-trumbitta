// Devkit
import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';

/**
 * This is a fix test-utility that is needed because of a bug
 * createTreeWithEmptyWorkspace() create a workspace.json = { version: 1, projects: {} }
 * This is wrong, version should be 2
 *
 * if generator execution (await libraryGenerator(appTree, remoteSchema)) format files with formatFiles(tree) utility, the project properties are changed with old syntax : (targets -> architect) and (executor -> builder)
 *
 *  for example ...
 *  {"version":1,"projects":{"my-lib":{"root":"libs/my-lib","sourceRoot":"libs/my-lib/src","projectType":"library","targets":{"generate-sources":{"executor":"@trumbitta/nx-plugin-openapi:generate-api-lib-sources","options":{"generator":"typescript-fetch","sourceSpecPathOrUrl":"libs/foo/src/bar.yml"}}}}}}
 *  ... after formatFiles(tree) is changed into
 *  {"version":1,"projects":{"my-lib":{"root":"libs/my-lib","sourceRoot":"libs/my-lib/src","projectType":"library","architect":{"generate-sources":{"builder":"@trumbitta/nx-plugin-openapi:generate-api-lib-sources","options":{"generator":"typescript-fetch","sourceSpecPathOrUrl":"libs/foo/src/bar.yml"}}}}}}
 *
 *  The temporary solution is to create a workspace of version 2
 */
export const createTreeWithEmptyV2Workspace = () => {
  const appTree = createTreeWithEmptyWorkspace();
  appTree.write(
    '/workspace.json',
    JSON.stringify({
      version: 2,
      projects: {},
    }),
  );
  return appTree;
};
