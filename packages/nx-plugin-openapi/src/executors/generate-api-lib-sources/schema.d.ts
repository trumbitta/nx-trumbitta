export interface BuildExecutorSchema {} // eslint-disable-line

export interface GenerateApiLibSourcesExecutorSchema extends BuildExecutorSchema {
  generator: string;
  sourceSpecPathOrUrl: string;
  sourceSpecUrlAuthorizationHeaders?: string;
  additionalProperties?: string;
  typeMappings?: string;
}
