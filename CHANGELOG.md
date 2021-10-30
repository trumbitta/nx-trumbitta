### [1.9.2](https://github.com/trumbitta/nx-trumbitta/compare/v1.9.1...v1.9.2) (2021-10-30)


### Bug Fixes

* **open-in-gitpod:** tweak TS config ([e73060e](https://github.com/trumbitta/nx-trumbitta/commit/e73060e703e3e6ef5fa22e2f70e8f32c602603b1))

### [1.9.1](https://github.com/trumbitta/nx-trumbitta/compare/v1.9.0...v1.9.1) (2021-10-30)


### Bug Fixes

* tweak some details ([d953f2d](https://github.com/trumbitta/nx-trumbitta/commit/d953f2dbda19a482d44a2f07f2b14725f82ab07b))

## [1.9.0](https://github.com/trumbitta/nx-trumbitta/compare/v1.8.0...v1.9.0) (2021-10-30)


### Features

* **open-in-gitpod:** add CLI to open current local repo in Gitpod ([9cd931a](https://github.com/trumbitta/nx-trumbitta/commit/9cd931ad238b4a3282e5776c4c71f1714c2192cd))

## [1.8.0](https://github.com/trumbitta/nx-trumbitta/compare/v1.7.1...v1.8.0) (2021-10-22)


### Features

* **nx:** update to v13.0.1 ([1434e20](https://github.com/trumbitta/nx-trumbitta/commit/1434e20f9340d5f3a96e35155e2b60ea69859f93))

### [1.7.1](https://github.com/trumbitta/nx-trumbitta/compare/v1.7.0...v1.7.1) (2021-10-08)


### Bug Fixes

* fix NPM packaging ([1ed7e3f](https://github.com/trumbitta/nx-trumbitta/commit/1ed7e3f2acb84d9b34df8330dcea60a455b8c360))

## [1.7.0](https://github.com/trumbitta/nx-trumbitta/compare/v1.6.1...v1.7.0) (2021-10-08)


### Features

* **nx-plugin-unused-deps:** add plugin to check package.json for unused deps ([c9d9d32](https://github.com/trumbitta/nx-trumbitta/commit/c9d9d321d0f8dde18795555856cd0979e8c7f236))

### [1.6.1](https://github.com/trumbitta/nx-trumbitta/compare/v1.6.0...v1.6.1) (2021-07-31)


### Bug Fixes

* **nx-plugin-openapi:** fix support for --directory option ([6fd54f0](https://github.com/trumbitta/nx-trumbitta/commit/6fd54f07b73dc2b44076e8aebd1e80e0e8d99668))

## [1.6.0](https://github.com/trumbitta/nx-trumbitta/compare/v1.5.1...v1.6.0) (2021-07-30)


### Features

* **nx-plugin-openapi:** add .babelrc to generated api libs ([c002a7c](https://github.com/trumbitta/nx-trumbitta/commit/c002a7c20b9089918aac22d49b7408a38343d145)), closes [#37](https://github.com/trumbitta/nx-trumbitta/issues/37)
* **nx-plugin-openapi:** update to Nx v12.6.2 and revert unwanted [@angular](https://github.com/angular) devkit dep ([e028dc3](https://github.com/trumbitta/nx-trumbitta/commit/e028dc38e564ecba897ca971a92363350e1558db)), closes [#37](https://github.com/trumbitta/nx-trumbitta/issues/37)

### [1.5.1](https://github.com/trumbitta/nx-trumbitta/compare/v1.5.0...v1.5.1) (2021-07-16)


### Bug Fixes

* **nx-plugin-openapi:** fix botched 1.6.0 release and add required peer dependency ([a2059e4](https://github.com/trumbitta/nx-trumbitta/commit/a2059e4f94a6a5661ec25a7f080721e0b0300a4f))

## [1.5.0](https://github.com/trumbitta/nx-trumbitta/compare/v1.4.0...v1.5.0) (2021-07-16)


### Features

* **nx-plugin-openapi:** update to Nx 12.5.8 ([6ef4170](https://github.com/trumbitta/nx-trumbitta/commit/6ef4170e867c8bef1cbfd9d3582eace5e0681754)), closes [#34](https://github.com/trumbitta/nx-trumbitta/issues/34)

## [1.4.0](https://github.com/trumbitta/nx-trumbitta/compare/v1.3.1...v1.4.0) (2021-06-02)


### Features

* **global-properties:** add global-properties option ([fed54ee](https://github.com/trumbitta/nx-trumbitta/commit/fed54eedfc997343eb24645a2b8e0a534aac307d))
* **global-properties:** use spread operator ([6d69298](https://github.com/trumbitta/nx-trumbitta/commit/6d6929819bfebb3a2ed30e2e3a29b740a2675548))


### Bug Fixes

* **global-properties:** add missing option when building the executor configuration ([6d6fbf9](https://github.com/trumbitta/nx-trumbitta/commit/6d6fbf9700aea59ebae06e31462dd295c16e071c))
* **global-property:** typo fix (original was correct) ([b5a2dc6](https://github.com/trumbitta/nx-trumbitta/commit/b5a2dc66a727cddb6bb84c58e5a911085e010142))
* **typo:** global-property => global-properties ([92f7100](https://github.com/trumbitta/nx-trumbitta/commit/92f710015c0c609b10bb820b7474ca2c5cdad1c9))

### [1.3.1](https://github.com/trumbitta/nx-trumbitta/compare/v1.3.0...v1.3.1) (2021-05-31)


### Bug Fixes

* **generators-api-lib:** add cross-spawn ([472cc20](https://github.com/trumbitta/nx-trumbitta/commit/472cc2091ecc1bcc877c29b5778b969d8ceff54e))
* **generators-api-lib:** install cross-spawn types ([1a0b362](https://github.com/trumbitta/nx-trumbitta/commit/1a0b3622919a1d49a0c3d118fefce4b83ab7aff5))
* **generators-api-lib:** move esModuleInterop ([459a858](https://github.com/trumbitta/nx-trumbitta/commit/459a8583de879fb4c29f4fc4e7c2cce68a813c19))
* **generators-api-lib:** use cross-spawn ([e9ac14b](https://github.com/trumbitta/nx-trumbitta/commit/e9ac14b086c316c57aede4ac2ae499187241e716))

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
