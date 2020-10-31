import { chain } from '@angular-devkit/schematics';
import { addDepsToPackageJson } from '@nrwl/workspace';

import { openapiGeneratorCliVersion } from '../../utils/versions';

export default function () {
  return chain([
    addDepsToPackageJson(
      {},
      {
        '@openapitools/openapi-generator-cli': openapiGeneratorCliVersion,
      }
    ),
  ]);
}
