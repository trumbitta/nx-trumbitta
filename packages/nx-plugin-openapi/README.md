# OpenAPI Plugin for Nx

Keep your API spec files in libs, and auto-generate sources.

## What is it?

It's a plugin for organizing OpenAPI spec files in libraries. You can then have other libraries for API SDKs, server stubs, or documentation, all auto-generated from the spec files.

## How to install

```sh
npm install -D @trumbitta/nx-plugin-openapi
```

### Prerequisites

Sources get auto-generated via [`openapi-generator-cli`](https://github.com/OpenAPITools/openapi-generator-cli), so you'll need Java 8 installed.

## Usage

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

### Create a lib for auto-generated client sources, server stubs, docs

```sh
nx generate @trumbitta/nx-plugin-openapi:api-lib
```

```sh
? What name would you like to use? api-docs
? What's the name of the lib containing the API spec file? api-spec
? What's the path of the API spec file, starting from the lib root? src/api-spec.openapi.yml
? Which OpenAPITool generator would you like to use? (https://github.com/OpenAPITools/openapi-generator) html  
? Do you want to specify any additional properties for the generator? 
key1=value1,key2=value2 (https://openapi-generator.tech/docs/generator
s) 
CREATE libs/api-docs/README.md (1236 bytes)
UPDATE workspace.json (1220 bytes)
UPDATE nx.json (837 bytes)
```
