export interface ApiLibSchematicSchema {
  name: string;
  tags?: string;
  directory?: string;
  sourceSpecLib: string;
  sourceSpecFileRelativePath: string;
  openapitoolsGenerator: string;
}
