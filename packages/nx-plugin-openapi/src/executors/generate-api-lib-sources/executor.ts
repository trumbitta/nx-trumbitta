// Devkit
import { logger, ExecutorContext } from '@nrwl/devkit';

// Third Parties
import { from, of } from 'rxjs';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { spawn } from 'cross-spawn';

// Utils
import { deleteOutputDir } from '../../utils/delete-output-dir';

// Schema
import { GenerateApiLibSourcesExecutorSchema } from './schema';

export default async function runExecutor(
  options: GenerateApiLibSourcesExecutorSchema,
  context: ExecutorContext,
): Promise<{ success: boolean }> {
  const outputDir = context.workspace.projects[context.projectName].sourceRoot;
  const root = context.root;

  return of(outputDir)
    .pipe(
      tap((outputDir) => {
        logger.info(`Deleting outputDir ${outputDir}...`);

        deleteOutputDir(root, outputDir);

        logger.info(`Done deleting outputDir ${outputDir}.`);
      }),
      switchMap((outputDir) =>
        from(
          generateSources(
            options.sourceSpecPathOrUrl,
            options.sourceSpecUrlAuthorizationHeaders,
            options.generator,
            options.additionalProperties,
            options.typeMappings,
            outputDir,
          ),
        ).pipe(
          map(() => ({ success: true })),
          catchError((error) => {
            logger.error(error);
            return of(error);
          }),
        ),
      ),
      catchError((error) => of(error)),
    )
    .toPromise<{ success: boolean }>();
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

    const child = spawn('node_modules/.bin/openapi-generator-cli', args);

    child.on('error', (err) => {
      reject(err);
    });
    child.on('exit', (code) => {
      if (code === 0) {
        resolve(code);
      } else {
        reject(code);
      }
    });
  });
}
