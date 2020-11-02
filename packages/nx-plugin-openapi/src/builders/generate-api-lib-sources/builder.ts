import {
  BuilderContext,
  BuilderOutput,
  createBuilder,
} from '@angular-devkit/architect';
import { JsonObject } from '@angular-devkit/core';
import { readWorkspaceJson } from '@nrwl/workspace';
import { Observable } from 'rxjs';

import { GenerateApiLibSourcesBuilderSchema } from './schema';

export function runBuilder(
  options: GenerateApiLibSourcesBuilderSchema,
  context: BuilderContext
): Observable<BuilderOutput> {
  const observable = new Observable<BuilderOutput>((observer) => {
    try {
      //       // the versioning tags on this are weird, make sure this matches from package.json
      // `@openapitools/openapi-generator-cli@cli-5.0.0-beta2`,
      // 'generate',
      // '-i',
      // openapiFile,
      // '-g',
      // options.generatorType,
      // `--additional-properties=${options.additionalOptions}`,
      // '-o',
      // sdkFolder,
      const projectName = context.target.project;
      const projectSourceRoot = readWorkspaceJson().projects[projectName]
        .sourceRoot;
      const builderOptions: JsonObject = {
        command: `npx openapi-generator-cli generate -i ${options.sourceSpecFileRelativePath}/${options.sourceSpecFile} -g ${options.generator} -o ${projectSourceRoot}`,
        // args?: string;
        // readyWhen?: string;
        // cwd?: string;
        // envFile?: string;
        // outputPath?: string;
      };
      context.scheduleBuilder('@nrwl/workspace:run-commands', builderOptions);

      observer.next({ success: true });
      observer.complete();
    } catch (err) {
      observer.error(`Something went wrong with the builder`);
    }
  });

  return observable;
}

export default createBuilder(runBuilder);
