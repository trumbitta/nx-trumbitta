// From https://github.com/nrwl/nx/commit/7fcf136cad16a3111ffdc2965551f442e2618409#diff-0e0fabf373c42117939de9dac468f38475b2cb149476275279fecf66383cd2dc

// Third Parties
import { existsSync } from 'fs';
import { resolve } from 'path';
import * as rimraf from 'rimraf';

/**
 * Delete an output directory, but error out if it's the root of the project.
 */
export function deleteOutputDir(root: string, outputPath: string) {
  const resolvedOutputPath = resolve(root, outputPath);
  if (resolvedOutputPath === root) {
    throw new Error('Output path MUST not be project root directory!');
  }

  if (existsSync(resolvedOutputPath)) {
    rimraf.sync(resolvedOutputPath);
  }
}
