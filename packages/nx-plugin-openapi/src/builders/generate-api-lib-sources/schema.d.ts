import { JsonObject } from '@angular-devkit/core';

export interface GenerateApiLibSourcesBuilderSchema extends JsonObject {
  generator: string;
  sourceSpecLib: string;
  sourceSpecFileRelativePath: string;
  additionalProperties?: string;
}
