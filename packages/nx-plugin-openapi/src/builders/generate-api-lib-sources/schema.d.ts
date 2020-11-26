import { JsonObject } from '@angular-devkit/core';

export interface GenerateApiLibSourcesBuilderSchema extends JsonObject {
  generator: string;
  sourceSpecFullPathOrUrl: string;
  sourceSpecUrlAuthorizationHeaders?: string;
  additionalProperties?: string;
}
