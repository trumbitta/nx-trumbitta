import {
  BuilderContext,
  BuilderOutput,
  createBuilder,
} from '@angular-devkit/architect';
import { readWorkspaceJson } from '@nrwl/workspace';
import { Observable, from, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { fork } from 'child_process';

import { GenerateApiLibSourcesBuilderSchema } from './schema';

export default createBuilder(runBuilder);

export function runBuilder(
  options: GenerateApiLibSourcesBuilderSchema,
  context: BuilderContext
): Observable<BuilderOutput> {
  return from(
    new Promise((resolve, reject) => {
      const projectName = context.target.project;
      const projectSourceRoot = readWorkspaceJson().projects[projectName]
        .sourceRoot;
      const sourceSpecProjectRoot = readWorkspaceJson().projects[
        options.sourceSpecLib
      ].root;

      const cp = fork('node_modules/.bin/openapi-generator-cli', [
        'generate',
        '-i',
        `${sourceSpecProjectRoot}/${options.sourceSpecFileRelativePath}`,
        '-g',
        options.generator,
        '-o',
        projectSourceRoot,
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
    })
  ).pipe(
    map(() => ({ success: true })),
    catchError((error) => {
      context.logger.error(error);

      return of(error);
    })
  );
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
