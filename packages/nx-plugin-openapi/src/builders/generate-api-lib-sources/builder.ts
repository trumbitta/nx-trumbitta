// Devkit
import { BuilderContext, BuilderOutput, createBuilder } from '@angular-devkit/architect';

// Nrwl
import { readWorkspaceJson } from '@nrwl/workspace';

// Third Parties
import { Observable, from, of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { fork } from 'child_process';

// Utils
import { deleteOutputDir } from '../../utils/delete-output-dir';

// Schema
import { GenerateApiLibSourcesBuilderSchema } from './schema';

export default createBuilder(runBuilder);

export function runBuilder(
  options: GenerateApiLibSourcesBuilderSchema,
  context: BuilderContext,
): Observable<BuilderOutput> {
  const projectName = context.target.project;
  const apiSpecPathOrUrl = options.sourceSpecFullPathOrUrl;
  context.logger.info('WWWWOAAAAAA');
  console.log(context.workspaceRoot);
  console.log(readWorkspaceJson());
  const outputDir = readWorkspaceJson().projects[projectName].sourceRoot;

  return new Observable<BuilderOutput>((observer) => {
    try {
      context.logger.info(`Deleting outputDir ${outputDir}...`);

      deleteOutputDir(context.workspaceRoot, outputDir);

      context.logger.info(`Done deleting outputDir ${outputDir}.`);
      observer.next();
    } catch (error) {
      observer.error(error);
    }
  }).pipe(
    switchMap(() =>
      from(
        generateSources(
          apiSpecPathOrUrl,
          options.sourceSpecUrlAuthorizationHeaders,
          options.generator,
          options.additionalProperties,
          outputDir,
        ),
      ).pipe(
        map(() => ({ success: true })),
        catchError((error) => {
          context.logger.error(error);

          return of(error);
        }),
      ),
    ),
  );
}

function generateSources(
  apiSpecPathOrUrl: string,
  apiSpecAuthorizationHeaders: string,
  generator: string,
  additionalProperties: string,
  outputDir: string,
): Promise<number> {
  return new Promise((resolve, reject) => {
    const args = ['generate', '-i', apiSpecPathOrUrl, '-g', generator, '-o', outputDir];

    if (additionalProperties) {
      args.push(...['--additional-properties', additionalProperties]);
    }

    if (apiSpecAuthorizationHeaders) {
      args.push(...['--auth', apiSpecAuthorizationHeaders]);
    }

    const cp = fork('node_modules/.bin/openapi-generator-cli', args);

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
