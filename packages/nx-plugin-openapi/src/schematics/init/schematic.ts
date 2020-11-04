// Devkit
import { chain } from '@angular-devkit/schematics';

// Nrwl
import { addDepsToPackageJson } from '@nrwl/workspace';

// Utils
import { openapiGeneratorCliVersion } from '../../utils/versions';

export default function () {
  return chain([
    addDepsToPackageJson(
      {},
      {
        '@openapitools/openapi-generator-cli': openapiGeneratorCliVersion,
      },
    ),
  ]);
}
