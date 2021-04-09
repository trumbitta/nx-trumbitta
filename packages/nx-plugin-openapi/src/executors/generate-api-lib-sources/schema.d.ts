export interface GenerateApiLibSourcesExecutorSchema {
  generator: string;
  sourceSpecPathOrUrl: string;
  sourceSpecUrlAuthorizationHeaders?: string;
  additionalProperties?: string;
  typeMappings?: string;
}
