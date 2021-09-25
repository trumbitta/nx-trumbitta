# OpenAPI Plugin for Nx

[![NPM Version](https://badge.fury.io/js/%40trumbitta%2Fnx-plugin-openapi.svg)](https://www.npmjs.com/@trumbitta/nx-plugin-openapi)
[![License](https://img.shields.io/npm/l/@trumbitta/nx-plugin-openapi)]()

Keep your API spec files in libs, and auto-generate sources and docs.

## 🧐 What is it?

It's a plugin for organizing OpenAPI spec files in libraries. You can then have other libraries for API SDKs, server stubs, or documentation, all auto-generated from the spec files.

## 💡 How to install

```sh
npm install -D @trumbitta/nx-plugin-openapi
```

### Prerequisites

Sources get auto-generated via [`openapi-generator-cli`](https://github.com/OpenAPITools/openapi-generator-cli), so you'll need Java 8 installed.

## 🧰 Usage

### Create a lib for an API spec file

```sh
nx generate @trumbitta/nx-plugin-openapi:api-spec
```

```
✔ What name would you like to use? · api-spec
✔ Do you want me to also create a sample spec file for you? (y/N) · true
UPDATE package.json
UPDATE workspace.json
UPDATE nx.json
CREATE libs/my-service-api-spec/src/my-service-api-spec.openapi.yml
```

### Create a lib for auto-generated docs

```sh
nx generate @trumbitta/nx-plugin-openapi:api-lib
```

```
✔ What name would you like to use? · api-docs
✔ Which OpenAPITool generator would you like to use? (https://github.com/OpenAPITools/openapi-generator) · html
✔ Is the API spec file published online? (y/N) · false
✔ If it's online, what's the URL where I can get the API spec file from? ·
✔ If it's online, which authorization headers do you need to add? ·
✔ If it's local, what's the name of the lib containing the API spec file? · api-spec
✔ If it's local, what's the path of the API spec file starting from the lib root? · src/api-spec.openapi.yml
✔ Do you want to specify any additional properties for the generator? key1=value1,key2=value2 (https://openapi-generator.tech/docs/generators) ·
✔ Do you want to specify any global properties for the generator? key1=value1,key2=value2 (https://openapi-generator.tech/docs/globals) ·

UPDATE workspace.json
UPDATE nx.json
CREATE libs/api-docs/README.md
CREATE libs/api-docs/.babelrc
UPDATE tsconfig.base.json
```

### Create a lib for auto-generated client sources

```sh
nx generate @trumbitta/nx-plugin-openapi:api-lib
```

```
✔ What name would you like to use? · api-fetch
✔ Which OpenAPITool generator would you like to use? (https://github.com/OpenAPITools/openapi-generator) · typescript-fetch

✔ Is the API spec file published online? (y/N) · false
✔ If it's online, what's the URL where I can get the API spec file from? ·
✔ If it's online, which authorization headers do you need to add? ·
✔ If it's local, what's the name of the lib containing the API spec file? · api-spec
✔ If it's local, what's the path of the API spec file starting from the lib root? · src/api-spec.openapi.yml
✔ Do you want to specify any additional properties for the generator? key1=value1,key2=value2 (https://openapi-generator.tech/docs/generators) · typescriptThreePlus=true,supportsES6=true
✔ Do you want to specify any global properties for the generator? key1=value1,key2=value2 (https://openapi-generator.tech/docs/globals) ·

UPDATE workspace.json
UPDATE nx.json
CREATE libs/api-fetch/README.md
CREATE libs/api-fetch/.babelrc
UPDATE tsconfig.base.json
```

### Generate or update sources

Given the libs created in the examples above, then:

```sh
nx run api-docs:generate-sources

# Then you can simply serve it
npx http-server libs/api-docs/src

# Or you can configure a Nx serve target for it, or do whatever you want
```

```sh
nx run api-fetch:generate-sources
```

## ✍️ Generators

This OpenAPI plugin for Nx should support any generator you can use with `openapi-generator-cli`.

Find the ones you need, together with all the additional properties available for each generator, here: https://openapi-generator.tech/docs/generators

## 🙏 Acknowledgements

Many thanks to every project and every person I took inspiration from, but especially:

- [@vsavkin](https://github.com/vsavkin) for [@nrwl/react](https://github.com/nrwl/nx/tree/master/packages/react)
- [@ericwooley](https://github.com/ericwooley) for [his own @ericwooley/openapi-sdk](https://github.com/ericwooley/openapi-sdk)
- [@tinesoft](https://github.com/tinesoft) for inspiring me to take Nx plugin development for a spin with the release of their [@nxrocks/nx-spring-boot](https://github.com/tinesoft/nxrocks)
