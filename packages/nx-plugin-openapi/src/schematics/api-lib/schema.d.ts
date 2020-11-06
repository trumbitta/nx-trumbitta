export interface ApiLibSchematicSchema {
  name: string;
  tags?: string;
  directory?: string;
  sourceSpecLib: string;
  sourceSpecFileRelativePath: string;
  generator: string;
  additionalProperties: string;
}
