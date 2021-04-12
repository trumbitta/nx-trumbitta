## [1.3.0](https://github.com/trumbitta/nx-trumbitta/compare/v1.2.0...v1.3.0) (2021-04-12)


### Features

* **generators-api-lib:** add skipFormat property ([c10d87d](https://github.com/trumbitta/nx-trumbitta/commit/c10d87da26ad35d892cc69dc03f9f762337fcdf9))
* **generators-api-spec:** add skipFormat property ([5bf88f5](https://github.com/trumbitta/nx-trumbitta/commit/5bf88f5d3bd8d412822ddc52c234110f74d12dfb))


### Bug Fixes

* **generators-api-spec:** create always sourceRoot directory ([745133d](https://github.com/trumbitta/nx-trumbitta/commit/745133dec6b0ca5e940d3ad5d4e86c9335abc502))
* **generators-init:** remove unused schema ([27f596a](https://github.com/trumbitta/nx-trumbitta/commit/27f596a7164f0d50e961f3d52be13a389bf1e8a2))
* **generators-specs:** resolve workspace bug in case of skipFormat = false ([91e223c](https://github.com/trumbitta/nx-trumbitta/commit/91e223c25280d4ceb48e94b1dc5befe3ea32ea8f))

## [1.2.0](https://github.com/trumbitta/nx-trumbitta/compare/v1.1.1...v1.2.0) (2021-01-19)


### Features

* **nx-plugin-openapi:** add support for typeMappings option ([598ccec](https://github.com/trumbitta/nx-trumbitta/commit/598ccec0f84ccc3c7fcbe17b7899f2204a07b27f)), closes [#16](https://github.com/trumbitta/nx-trumbitta/issues/16)

### [1.1.1](https://github.com/trumbitta/nx-trumbitta/compare/v1.1.0...v1.1.1) (2021-01-18)


### Bug Fixes

* **nx-plugin-openapi:** update tsconfig import paths on api-lib creation ([0e5aade](https://github.com/trumbitta/nx-trumbitta/commit/0e5aade6db245d0cd8205d50226410f5a9416c6f)), closes [#14](https://github.com/trumbitta/nx-trumbitta/issues/14)

## [1.1.0](https://github.com/trumbitta/nx-trumbitta/compare/v1.0.1...v1.1.0) (2020-11-27)


### Features

* **nx-plugin-openapi:** (broken) add support for online API spec files ([0f6c6ee](https://github.com/trumbitta/nx-trumbitta/commit/0f6c6eea1033d36449240d84033b6152b1cc4555)), closes [#9](https://github.com/trumbitta/nx-trumbitta/issues/9)
* **nx-plugin-openapi:** start adding new options ([7be0f12](https://github.com/trumbitta/nx-trumbitta/commit/7be0f12d9ec6f48e9a86d9c13a025d35b7dc2fce)), closes [#9](https://github.com/trumbitta/nx-trumbitta/issues/9)


### Bug Fixes

* **nx-plugin-openapi:** replace readWorkspaceJson with custom util function ([5f82a79](https://github.com/trumbitta/nx-trumbitta/commit/5f82a790213d59628c3b5285348989155d63219b)), closes [#9](https://github.com/trumbitta/nx-trumbitta/issues/9)
* **nx-plugin-openapi:** somewhat workaround bogus behavior of Nx about a required prop with default ([9bd8605](https://github.com/trumbitta/nx-trumbitta/commit/9bd86055c1cc56b9a3f5235b6ab6aa0ff136cd2a)), closes [#9](https://github.com/trumbitta/nx-trumbitta/issues/9)

### [1.0.1](https://github.com/trumbitta/nx-trumbitta/compare/v1.0.0...v1.0.1) (2020-11-10)


### Bug Fixes

* **nx-plugin-openapi:** fix licensing and peer dependencies ([bb09067](https://github.com/trumbitta/nx-trumbitta/commit/bb090672622cdbf16cd13a8f9c06c4d1699563a8))

## 1.0.0 (2020-11-10)


### Features

* **generate-api-lib-sources:** add support for additionalProperties ([aa8ce75](https://github.com/trumbitta/nx-trumbitta/commit/aa8ce7559de6cb1ada9aa5ef95e0ac221a969fcf))
* simplify options, make tests pass ([d8f042d](https://github.com/trumbitta/nx-trumbitta/commit/d8f042d8c2b7610b50b2004de4c623df7c8290e1))
* **nx-plugin-openapi:** delete output dir before generating sources ([66a94ca](https://github.com/trumbitta/nx-trumbitta/commit/66a94ca004d52c9383eb58c802bb0c549e3a3050))
* actually generate API lib code ([f33f179](https://github.com/trumbitta/nx-trumbitta/commit/f33f1792263c8ebfd51aaace944dfb05a0af3e44))
* add api-lib schematic and first bits of generate-api-lib-sources builder ([c6b5816](https://github.com/trumbitta/nx-trumbitta/commit/c6b5816238990f92a87ab106719a758bd19bd5b2))
* make init schematic work ([263d56d](https://github.com/trumbitta/nx-trumbitta/commit/263d56d7c622795a60b6ab601d9a4fba94ba593e))


### Bug Fixes

* **nx-plugin-openapi:** make optional option optional for realsies ([25c6d07](https://github.com/trumbitta/nx-trumbitta/commit/25c6d07cded174aa63d789caed10e70b285109bc))
* preserve README of api-lib, fix some inputs ([a0a850f](https://github.com/trumbitta/nx-trumbitta/commit/a0a850f4082a87a334502822b379001247d729cb))
* tweak builder name ([bb8cd32](https://github.com/trumbitta/nx-trumbitta/commit/bb8cd32b7d378b43ba206250732d722a4c0af180))
