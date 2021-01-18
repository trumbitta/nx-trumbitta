export interface ApiLibSchematicSchema {
  name: string;
  generator?: string;
  tags?: string;
  directory?: string;
  importPath?: string;
  isRemoteSpec: boolean;
  sourceSpecUrl?: string;
  sourceSpecUrlAuthorizationHeaders?: string;
  sourceSpecLib?: string;
  sourceSpecFileRelativePath?: string;
  additionalProperties?: string;
}
