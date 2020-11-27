import { JsonObject } from '@angular-devkit/core';

export interface GenerateApiLibSourcesBuilderSchema extends JsonObject {
  generator: string;
  sourceSpecPathOrUrl: string;
  sourceSpecUrlAuthorizationHeaders?: string;
  additionalProperties?: string;
}
