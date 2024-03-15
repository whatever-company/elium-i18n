# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [5.2.3](https://github.com/whatever-company/elium-i18n/compare/v5.2.2...v5.2.3) (2024-03-15)


### Bug Fixes

* dependabot correct registry ([0f58b4d](https://github.com/whatever-company/elium-i18n/commit/0f58b4d93c48fa79feaa35d9d5d697de7b3989e6))
* move dependabot file ([d2d4e2d](https://github.com/whatever-company/elium-i18n/commit/d2d4e2dc8aceffe265cb386d1d74cb6e12ab68b0))
* registries ([8167ca8](https://github.com/whatever-company/elium-i18n/commit/8167ca8e0b221b59095a61fffb0077622adc5e07))

### [5.2.2](https://github.com/whatever-company/elium-i18n/compare/v5.2.1...v5.2.2) (2022-06-10)

### Features

* **extract:** Add Typescript plugin to babel parser ([7acd74e](https://github.com/whatever-company/elium-i18n/commit/fd329610a7df66c7ebb0d9bcadfff6b36d363a92))

### [5.2.1](https://github.com/whatever-company/elium-i18n/compare/v5.2.0...v5.2.1) (2021-02-18)


### Bug Fixes

* **extract:** Ensure the directory exists before writing the pot ([cf8d0b1](https://github.com/whatever-company/elium-i18n/commit/cf8d0b13581a148cd572a427455f135b48dc8a5b))

## [5.2.0](https://github.com/whatever-company/elium-i18n/compare/v5.1.0...v5.2.0) (2021-02-16)


### Features

* **POT:** Add the key as the value as well ([8d03bff](https://github.com/whatever-company/elium-i18n/commit/8d03bff85f5728b3b0eac656ea0b01154b47bc2e))

## [5.1.0](https://github.com/whatever-company/elium-i18n/compare/v5.0.3...v5.1.0) (2021-02-15)


### Features

* **compile:** optional source filename for compile command. Use --source-filename option (defaults to 'elium.po' for backward compatibility) ([7acd74e](https://github.com/whatever-company/elium-i18n/commit/7acd74e764434c7343a4eff5dde171f4188b09f4))

### [5.0.3](https://github.com/whatever-company/elium-i18n/compare/v5.0.2...v5.0.3) (2021-02-15)


### Bug Fixes

* **extract:** wrong function name ([7605b9b](https://github.com/whatever-company/elium-i18n/commit/7605b9bd1fda5101e863d83bedfd044ae3697a43))

### [5.0.2](https://github.com/whatever-company/elium-i18n/compare/v5.0.1...v5.0.2) (2021-02-15)


### Bug Fixes

* **Publish:** Add missing scope ([dc65a02](https://github.com/whatever-company/elium-i18n/commit/dc65a02cd1c2b67e0904f48277df854ebd5bd128))

### [5.0.1](https://github.com/whatever-company/elium-i18n/compare/v5.0.0...v5.0.1) (2021-02-15)


### Bug Fixes

* **CI:** Remove unused deps + fix lint ([36058a7](https://github.com/whatever-company/elium-i18n/commit/36058a7b503a6c496e11a2b31baa1bcb80a26d1a))

## [5.0.0](https://github.com/whatever-company/elium-i18n/compare/v4.0.0...v5.0.0) (2021-02-15)


### Features

* **Upgrade:** Upgrade node, npm. Remove pull & push commands ([92e84f5](https://github.com/whatever-company/elium-i18n/commit/92e84f5516963b5c6ea49dddc9fb3dfd1ca99ba9))


### Bug Fixes

* turn date components into strings before calling padStart ([65db0b1](https://github.com/whatever-company/elium-i18n/commit/65db0b156d3279e94a09b4f2c491f2198645465e))

### [4.0.1](https://github.com/whatever-company/elium-i18n/compare/v4.0.0...v4.0.1) (2021-02-15)


### Bug Fixes

* turn date components into strings before calling padStart ([65db0b1](https://github.com/whatever-company/elium-i18n/commit/65db0b156d3279e94a09b4f2c491f2198645465e))

## [4.0.0](https://github.com/whatever-company/elium-i18n/compare/v3.0.2...v4.0.0) (2021-01-22)

### [3.0.2](https://github.com/whatever-company/elium-i18n/compare/v3.0.1...v3.0.2) (2020-04-14)


### Bug Fixes

* **deps:** update babel monorepo ([0117b31](https://github.com/whatever-company/elium-i18n/commit/0117b31c61d3d348635634800738e05949188ba3))
* **deps:** update dependency i18next-conv to v9.2.1 ([42f7e9c](https://github.com/whatever-company/elium-i18n/commit/42f7e9c794634b6259eeca2f6953cd4ea694b7ba))

### [3.0.1](https://github.com/whatever-company/elium-i18n/compare/v3.0.0...v3.0.1) (2020-03-17)


### Bug Fixes

* **deps:** pin dependencies ([52e68db](https://github.com/whatever-company/elium-i18n/commit/52e68db17a9fa404bb95e309d9e168e975521991))

## [3.0.0](https://github.com/whatever-company/elium-i18n/compare/v1.0.2...v3.0.0) (2020-02-21)


### Features

* Compile po to json to be used in webpack bundles ([b588824](https://github.com/whatever-company/elium-i18n/commit/b588824bdb3eddf7e61a96329729f0ad8925e74c))
* Support <> syntax ([01db935](https://github.com/whatever-company/elium-i18n/commit/01db935084831def5e4a04046bed34cff7e176fb))


### Bug Fixes

* fix extractor to manage plural defined in multiple places ([db80bc9](https://github.com/whatever-company/elium-i18n/commit/db80bc9b328662a02cf06246dd140b2d25905427))
* **Charset:** set charset to urf8 when compiling to pot ([4309ec3](https://github.com/whatever-company/elium-i18n/commit/4309ec36e22be4ff2b3901be4d08e81dfdd26823))
* **tx:** Force to refetch all langs including the source language if asked ([d48145a](https://github.com/whatever-company/elium-i18n/commit/d48145aad4003a5725dbbdaa55da1dd660d23957))
