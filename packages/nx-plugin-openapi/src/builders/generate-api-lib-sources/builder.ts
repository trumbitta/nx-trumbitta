import {
  BuilderContext,
  BuilderOutput,
  createBuilder,
} from '@angular-devkit/architect';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { GenerateApiLibSourcesBuilderSchema } from './schema';

export function runBuilder(
  options: GenerateApiLibSourcesBuilderSchema,
  context: BuilderContext
): Observable<BuilderOutput> {
  return of({ success: true }).pipe(
    tap(() => {
      context.logger.info('Builder ran for generate-api-lib-sources');
    })
  );
}

export default createBuilder(runBuilder);
