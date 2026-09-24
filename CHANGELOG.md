# Changelog

All notable changes to this project are documented in this file.

### [0.2.8](https://github.com/leo91000/vue-tiptap-renderer/compare/v0.2.7...v0.2.8) (2026-09-24)

### Bug Fixes

- Preserve link attributes when applying text styles or rendering nested marks (upstream the patch used by Eliah).
- Preserve explicit link `rel` values and default missing/empty values to `noopener noreferrer`.

### Maintenance

- Add regression tests for links and ESM/CommonJS server-rendering smoke tests.
- Update Tiptap, Vue, Vitest, Vite, ESLint and jsdom; retain TypeScript 5.9 for build-tool compatibility.
- Standardize development on Node 24 and test Node 22/24 in CI with a frozen lockfile.
- Replace the local release script with checked tag releases using npm trusted publishing and provenance.
- Remove unused release tooling and stale configuration, include the MIT license, and document all exports and release steps.

### [0.2.7](https://github.com/leo91000/vue-tiptap-renderer/compare/v0.2.6...v0.2.7) (2025-09-10)


### Features

* **renderer:** support textStyle color and backgroundColor ([80d09bc](https://github.com/leo91000/vue-tiptap-renderer/commit/80d09bc9e1ea96c7fd4872934e8948530d8d7832))

### [0.2.6](https://github.com/leo91000/vue-tiptap-renderer/compare/v0.2.5...v0.2.6) (2023-12-07)


### Bug Fixes

* Use export type instead of raw export ([a18656a](https://github.com/leo91000/vue-tiptap-renderer/commit/a18656aa4bfbc0edd7878e2e771b043ea80279d5))

### [0.2.5](https://github.com/leo91000/vue-tiptap-renderer/compare/v0.2.4...v0.2.5) (2023-12-07)

### [0.2.4](https://github.com/leo91000/vue-tiptap-renderer/compare/v0.2.3...v0.2.4) (2023-12-07)

### [0.2.3](https://github.com/leo91000/vue-tiptap-renderer/compare/v0.2.2...v0.2.3) (2023-12-07)


### Features

* Add extractContentText util and upgrade deps ([a7bfbcd](https://github.com/leo91000/vue-tiptap-renderer/commit/a7bfbcd6061ca62778f778cfdfbc4213ba6feb49))

### [0.2.2](https://github.com/leo91000/vue-tiptap-renderer/compare/v0.2.1...v0.2.2) (2022-05-15)


### Bug Fixes

* Marks only rendering span ([a38b2cf](https://github.com/leo91000/vue-tiptap-renderer/commit/a38b2cfe8bdfdd422ab3fe72b610cea5b171d833))

### [0.2.1](https://github.com/leo91000/vue-tiptap-renderer/compare/v0.2.0...v0.2.1) (2022-05-15)


### Bug Fixes

* Import Text symbol from vue-demi instead of runtime core ([be94364](https://github.com/leo91000/vue-tiptap-renderer/commit/be9436478a520c5aff3efac0506363511f1486b9))

## [0.2.0](https://github.com/leo91000/vue-tiptap-renderer/compare/v0.1.6...v0.2.0) (2022-05-15)


### ⚠ BREAKING CHANGES

* Remove CSS style import requirement

### Features

* Remove CSS style import requirement ([316f7ae](https://github.com/leo91000/vue-tiptap-renderer/commit/316f7ae32529afb1301248810dd5f6a6aab371ce))

### [0.1.6](https://github.com/leo91000/vue-tiptap-renderer/compare/v0.1.5...v0.1.6) (2022-05-15)


### Features

* Added utility functions `getContentFirstImage` & `getContentWordCount` ([e49f4e8](https://github.com/leo91000/vue-tiptap-renderer/commit/e49f4e8c107185e002281caa08db9ec9a43eb541))

### [0.1.5](https://github.com/leo91000/vue-tiptap-renderer/compare/v0.1.4...v0.1.5) (2022-05-14)

### [0.1.4](https://github.com/leo91000/vue-tiptap-renderer/compare/v0.1.3...v0.1.4) (2022-05-14)

### [0.1.3](https://github.com/leo91000/vue-tiptap-renderer/compare/v0.1.1...v0.1.3) (2022-05-14)

### [0.1.2](https://github.com/leo91000/vue-tiptap-renderer/compare/v0.1.1...v0.1.2) (2022-05-14)

### 0.1.1 (2022-05-14)


### Features

* Init project ([923b1f1](https://github.com/leo91000/vue-tiptap-renderer/commit/923b1f1adcb75aea0be8acfd058ce99d32cb1968))
