export interface ApiLibSchematicSchema {
  name: string;
  tags?: string;
  directory?: string;
  isRemoteSpec: boolean;
  sourceSpecUrl?: string;
  sourceSpecUrlAuthorizationHeaders?: string;
  sourceSpecLib?: string;
  sourceSpecFileRelativePath?: string;
  generator: string;
  additionalProperties?: string;
}
