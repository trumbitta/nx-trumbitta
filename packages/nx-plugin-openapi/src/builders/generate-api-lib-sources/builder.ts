import {
  BuilderContext,
  BuilderOutput,
  createBuilder,
} from '@angular-devkit/architect';
import { readWorkspaceJson } from '@nrwl/workspace';
import { Observable, from, of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { fork } from 'child_process';

import { deleteOutputDir } from '../../utils/delete-output-dir';
import { GenerateApiLibSourcesBuilderSchema } from './schema';

export default createBuilder(runBuilder);

export function runBuilder(
  options: GenerateApiLibSourcesBuilderSchema,
  context: BuilderContext
): Observable<BuilderOutput> {
  const projectName = context.target.project;
  const sourceSpecProjectRoot = readWorkspaceJson().projects[
    options.sourceSpecLib
  ].root;
  const apiSpecPath = `${sourceSpecProjectRoot}/${options.sourceSpecFileRelativePath}`;
  const outputDir = readWorkspaceJson().projects[projectName].sourceRoot;

  return new Observable((observer) => {
    try {
      context.logger.info(`Deleting outputDir ${outputDir}..`);

      deleteOutputDir(context.workspaceRoot, outputDir);

      context.logger.info(`Done deleting outputDir ${outputDir}.`);
      observer.next();
    } catch (error) {
      observer.error(error);
    }
  }).pipe(
    switchMap(() =>
      from(generateSources(apiSpecPath, options.generator, outputDir)).pipe(
        map(() => ({ success: true })),
        catchError((error) => {
          context.logger.error(error);

          return of(error);
        })
      )
    )
  );
}

function generateSources(
  apiSpecPath: string,
  generator: string,
  outputDir: string
): Promise<number> {
  return new Promise((resolve, reject) => {
    const cp = fork('node_modules/.bin/openapi-generator-cli', [
      'generate',
      '-i',
      apiSpecPath,
      '-g',
      generator,
      '-o',
      outputDir,
    ]);
    cp.on('error', (err) => {
      reject(err);
    });
    cp.on('exit', (code) => {
      if (code === 0) {
        resolve(code);
      } else {
        reject(code);
      }
    });
  });
}
// const observable = new Observable<BuilderOutput>((observer) => {
//   try {
//     //       // the versioning tags on this are weird, make sure this matches from package.json
//     // `@openapitools/openapi-generator-cli@cli-5.0.0-beta2`,
//     // 'generate',
//     // '-i',
//     // openapiFile,
//     // '-g',
//     // options.generatorType,
//     // `--additional-properties=${options.additionalOptions}`,
//     // '-o',
//     // sdkFolder,
//     const projectName = context.target.project;
//     const projectSourceRoot = readWorkspaceJson().projects[projectName]
//       .sourceRoot;
//     // const builderOptions: JsonObject = {
//     //   command: `npx openapi-generator-cli generate -i ${options.sourceSpecFileRelativePath}/${options.sourceSpecFile} -g ${options.generator} -o ${projectSourceRoot}`,
//     //   // args?: string;
//     //   // readyWhen?: string;
//     //   // cwd?: string;
//     //   // envFile?: string;
//     //   // outputPath?: string;
//     // };

//     observer.next({ success: true });
//     observer.complete();
//   } catch (err) {
//     observer.error(`Something went wrong with the builder`);
//   }
// });

// return observable;
// }
