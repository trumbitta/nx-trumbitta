export interface GenerateApiLibSourcesExecutorSchema {
  generator: string;
  sourceSpecPathOrUrl: string;
  sourceSpecUrlAuthorizationHeaders?: string;
  additionalProperties?: string;
  globalProperties?: string;
  typeMappings?: string;
}
