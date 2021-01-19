// Devkit
import { BuilderContext, BuilderOutput, createBuilder } from '@angular-devkit/architect';

// Third Parties
import { Observable, from, of } from 'rxjs';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { fork } from 'child_process';

// Utils
import { deleteOutputDir } from '../../utils/delete-output-dir';
import { getProjectSourceRoot } from '../../utils/get-project-source-root';

// Schema
import { GenerateApiLibSourcesBuilderSchema } from './schema';

export default createBuilder(runBuilder);

export function runBuilder(
  options: GenerateApiLibSourcesBuilderSchema,
  context: BuilderContext,
): Observable<BuilderOutput> {
  const apiSpecPathOrUrl = options.sourceSpecPathOrUrl;

  return from(getProjectSourceRoot(context)).pipe(
    tap((outputDir) => {
      context.logger.info(`Deleting outputDir ${outputDir}...`);

      deleteOutputDir(context.workspaceRoot, outputDir);

      context.logger.info(`Done deleting outputDir ${outputDir}.`);
    }),
    switchMap((outputDir) =>
      from(
        generateSources(
          apiSpecPathOrUrl,
          options.sourceSpecUrlAuthorizationHeaders,
          options.generator,
          options.additionalProperties,
          options.typeMappings,
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
    catchError((error) => of(error)),
  );
}

function generateSources(
  apiSpecPathOrUrl: string,
  apiSpecAuthorizationHeaders: string,
  generator: string,
  additionalProperties: string,
  typeMappings: string,
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

    if (typeMappings) {
      args.push(...['--type-mappings', typeMappings]);
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
