export interface ApiLibGeneratorSchema {
  name: string;
  useDockerBuild?: boolean;
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
  globalProperties?: string;
  templateDir?: string;
  skipFormat?: boolean;
}
