export interface ApiSpecGeneratorSchema {
  name: string;
  tags?: string;
  directory?: string;
  withSample?: boolean;
  skipFormat?: boolean;
}
