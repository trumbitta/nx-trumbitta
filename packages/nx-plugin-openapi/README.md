# OpenAPI Plugin for Nx

Keep your API spec files in libs, and auto-generate sources.

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

```sh
? What name would you like to use? my-service-api-sp
ec
? Do you want a sample spec file? Yes
CREATE libs/my-service-api-spec/src/my-service-api-spec.openapi.yml (18876 bytes)
UPDATE workspace.json (1384 bytes)
UPDATE nx.json (890 bytes)
```

### Create a lib for auto-generated docs

```sh
nx generate @trumbitta/nx-plugin-openapi:api-lib
```

```sh
? What name would you like to use? api-docs
? What's the name of the lib containing the API spec file? api-spec
? What's the path of the API spec file, starting from the lib root? src/api-spec.openapi.yml
? Which OpenAPITool generator would you like to use? (https://github.com/OpenAPITools/openapi-generator) html  
? Do you want to specify any additional properties for the generator? key1=value1,key2=value2 (https://openapi-generator.tech/docs/generators)
CREATE libs/api-docs/README.md (1236 bytes)
UPDATE workspace.json (1220 bytes)
UPDATE nx.json (837 bytes)
```

### Create a lib for auto-generated client sources

```sh
nx generate @trumbitta/nx-plugin-openapi:api-lib
```

```sh
? What name would you like to use? api-fetch
? What's the name of the lib containing the API spec file? api-spec
? What's the path of the API spec file, starting from the lib root? src/api-spec.openapi.yml
? Which OpenAPITool generator would you like to use? (https://github.com/OpenAPITools/openapi-generator) typescript-fetch  
? Do you want to specify any additional properties for the generator? 
key1=value1,key2=value2 (https://openapi-generator.tech/docs/generators) typescriptThreePlus=true,supportsES6=true
CREATE libs/api-docs/README.md (1236 bytes)
UPDATE workspace.json (1220 bytes)
UPDATE nx.json (837 bytes)
```

### Generate or update sources

Given the libs created in the examples above, then:

```sh
nx run api-docs:generate-sources
```

```sh
nx run api-fetch:generate-sources
```

## ✍️ Generators

This OpenAPI plugin for Nx should support any generator you can use with `openapi-generator-cli`.

Find the ones you need, togethere with all the additional properties available for each, here: https://openapi-generator.tech/docs/generators

## 🙏 Acknowledgements

Many thanks to every project and every person I took inspiration from, but especially:

- [@vsavkin](https://github.com/vsavkin) for [@nrwl/react](https://github.com/nrwl/nx/tree/master/packages/react)
- [@ericwooley](https://github.com/ericwooley) for [his own @ericwooley/openapi-sdk](https://github.com/ericwooley/openapi-sdk)
- [@tinesoft](https://github.com/tinesoft) for inspiring me to take Nx plugin development for a spin with the release of their [@nxrocks/nx-spring-boot](https://github.com/tinesoft/nxrocks)
