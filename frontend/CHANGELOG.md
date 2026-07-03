# Changelog

## [1.2.0](https://github.com/aimarchirico/template/compare/template-app-v1.1.1...template-app-v1.2.0) (2026-07-03)


### Features

* **frontend:** add initial screens layout and assets ([75a7f91](https://github.com/aimarchirico/template/commit/75a7f91106c776f3a839c61b5a1d50068e947923))
* **frontend:** configure pnpm workspaces and turborepo task pipelines ([8603c9a](https://github.com/aimarchirico/template/commit/8603c9aa68e3da0181caddd901a815ec7bb49cc3))
* **frontend:** create api-client package and migrate api generation script ([c27f495](https://github.com/aimarchirico/template/commit/c27f4958984307133af3faa5f00187c305c22d8b))
* **frontend:** create api-client package and migrate api generation script ([128ee54](https://github.com/aimarchirico/template/commit/128ee542dbb234c712bc7ab1fc5ab51e34a4d426))
* **frontend:** create shared configuration packages for eslint, typescript, and prettier ([3e1eb2c](https://github.com/aimarchirico/template/commit/3e1eb2ce476d126f095234778ddbfde294474e10))
* **frontend:** migrate expo application to pnpm workspace and turborepo monorepo ([33555a8](https://github.com/aimarchirico/template/commit/33555a85c93f8f78dd3c499ba592d40b85ccb53b))
* **frontend:** migrate expo application to pnpm workspace and turborepo monorepo ([f0dec20](https://github.com/aimarchirico/template/commit/f0dec20255af5b717aba43536adcfc282ea183f4))
* **frontend:** relocate expo host application to apps/expo and adapt configs ([40ea9b9](https://github.com/aimarchirico/template/commit/40ea9b9c32a4b5c619e57d81282c7fe488e2ce78))
* **frontend:** relocate expo host application to apps/expo and adapt configs ([71b0133](https://github.com/aimarchirico/template/commit/71b0133f281eccdc161c002cbfc4d62f23913849))
* **frontend:** update taskfiles, init scripts, and deployment workflows for monorepo orchestration ([88c5204](https://github.com/aimarchirico/template/commit/88c52048461dd6a37f05f08df759740c01e4ddb9))
* **frontend:** update taskfiles, init scripts, and deployment workflows for monorepo orchestration ([0733327](https://github.com/aimarchirico/template/commit/0733327c10a814ad71d5ad27b8c79aff34425c55))
* **task:** add install command to run task and fix directory for build task ([6be288d](https://github.com/aimarchirico/template/commit/6be288dd8ab919b1a443a870b45519475ca5bfd1))
* **turbo.json:** add boundary rules to turbo ([426fbe0](https://github.com/aimarchirico/template/commit/426fbe047f882819a24a361d163a27eed2c4bcc0))
* **workflows:** add ci and deployment workflows ([0ead45f](https://github.com/aimarchirico/template/commit/0ead45f7b499e71c6f06af7de8e7847bc82384fe))


### Bug Fixes

* add CHANGELOG.md to markdownlint ignores ([45b2345](https://github.com/aimarchirico/template/commit/45b23455f3fe586fcfabc3214adbce70c46967e8))
* change core references to commons ([857d53d](https://github.com/aimarchirico/template/commit/857d53dc113afb010ba94ab942a18b501fdd3385))
* **component:** fix release please ([5b8201e](https://github.com/aimarchirico/template/commit/5b8201e6c6c21925acd25508313cee93ee5136f2))
* correct tsconfig extends path in expo configuration ([a2c2c86](https://github.com/aimarchirico/template/commit/a2c2c867354c413f8098766f5b49b2d5507e6168))
* **env.example:** remove additional path reference ([3ecb40c](https://github.com/aimarchirico/template/commit/3ecb40c877f844a0b969b1f702e9d357d4421041))
* **env.example:** remove template reference ([4e64ae5](https://github.com/aimarchirico/template/commit/4e64ae5502f4ac92376a22a0962a767556bbb678))
* **frontend:** clarify dev environment flag usage in app config ([f957000](https://github.com/aimarchirico/template/commit/f957000f814a1571f6b85c424759994a97d4df57))
* **frontend:** define packageManager for Turborepo and use package.json for prettier config ([10a466a](https://github.com/aimarchirico/template/commit/10a466ada96ac6719c3342ae222a7723adeaaa7f))
* **frontend:** define packageManager for Turborepo and use package.json for prettier config ([424aa79](https://github.com/aimarchirico/template/commit/424aa79401c91d3f2ca9b99db810c22e1d6b7149))
* **frontend:** resolve expo typecheck failures in CI ([571ebd2](https://github.com/aimarchirico/template/commit/571ebd2b89771872079f7ae4fb054a0e7f1220af))
* **index.tsx:** remove template word ([6c71f08](https://github.com/aimarchirico/template/commit/6c71f08b5e0fbbe9bd8397285832a7d168c7b90a))
* remove invalid boundaries config in turbo.json ([00a0525](https://github.com/aimarchirico/template/commit/00a052543f6cee5689ac1e7cc6f9b68dfa9f0ca6))
* remove TypeScript compilation from eslint check script ([8518004](https://github.com/aimarchirico/template/commit/8518004ee7aa45d5cbe5dc468b052016940ac566))
* remove unnecessary comment from ESLint configuration ([92fb09e](https://github.com/aimarchirico/template/commit/92fb09e3c5d55be422fce29b1bcd87be1c54c27e))
* resolve botched dev merge in frontend ([ae86bd2](https://github.com/aimarchirico/template/commit/ae86bd2125d1227566af3875b32e514688d040d5))
* **turbo.json:** fix tag names ([2f11cda](https://github.com/aimarchirico/template/commit/2f11cda404490214b35b694c7f4a7eb6aaa7bf2d))
* update @aimarchirico/core-expo version to ^0.1.2 in package.json ([8ccb0a6](https://github.com/aimarchirico/template/commit/8ccb0a64d772c9f2121c23bdaf1676cab65c84b8))
* update API client task to handle errors gracefully ([070fa05](https://github.com/aimarchirico/template/commit/070fa05cb4eaca253fe9266856b723c5228d82fb))
* update core-expo and core-openapi versions in package.json and pnpm-lock.yaml ([c2db007](https://github.com/aimarchirico/template/commit/c2db00740321bb8944ed37755069b2870433f366))
* update core-expo and core-ts version constraints in pnpm-workspace.yaml ([84ba89f](https://github.com/aimarchirico/template/commit/84ba89fd6bce6e789169119692bd2ce4aa46cfd5))
* update package names to include scope for template and tools ([591f3ba](https://github.com/aimarchirico/template/commit/591f3ba82f7a784e83d1473dce97f8a53ba41e23))
* **workflow:** add JDK 17 setup for Android native build ([402176d](https://github.com/aimarchirico/template/commit/402176d6dea81d3622120eed3547cd63ee6a23ab))

## [1.1.1](https://github.com/aimarchirico/template/compare/app-v1.1.0...app-v1.1.1) (2026-07-02)


### Bug Fixes

* change core references to commons ([857d53d](https://github.com/aimarchirico/template/commit/857d53dc113afb010ba94ab942a18b501fdd3385))

## [1.1.0](https://github.com/aimarchirico/template/compare/app-v1.0.0...app-v1.1.0) (2026-07-02)


### Features

* **frontend:** add initial screens layout and assets ([75a7f91](https://github.com/aimarchirico/template/commit/75a7f91106c776f3a839c61b5a1d50068e947923))
* **frontend:** configure pnpm workspaces and turborepo task pipelines ([8603c9a](https://github.com/aimarchirico/template/commit/8603c9aa68e3da0181caddd901a815ec7bb49cc3))
* **frontend:** create api-client package and migrate api generation script ([c27f495](https://github.com/aimarchirico/template/commit/c27f4958984307133af3faa5f00187c305c22d8b))
* **frontend:** create api-client package and migrate api generation script ([128ee54](https://github.com/aimarchirico/template/commit/128ee542dbb234c712bc7ab1fc5ab51e34a4d426))
* **frontend:** create shared configuration packages for eslint, typescript, and prettier ([3e1eb2c](https://github.com/aimarchirico/template/commit/3e1eb2ce476d126f095234778ddbfde294474e10))
* **frontend:** migrate expo application to pnpm workspace and turborepo monorepo ([33555a8](https://github.com/aimarchirico/template/commit/33555a85c93f8f78dd3c499ba592d40b85ccb53b))
* **frontend:** migrate expo application to pnpm workspace and turborepo monorepo ([f0dec20](https://github.com/aimarchirico/template/commit/f0dec20255af5b717aba43536adcfc282ea183f4))
* **frontend:** relocate expo host application to apps/expo and adapt configs ([40ea9b9](https://github.com/aimarchirico/template/commit/40ea9b9c32a4b5c619e57d81282c7fe488e2ce78))
* **frontend:** relocate expo host application to apps/expo and adapt configs ([71b0133](https://github.com/aimarchirico/template/commit/71b0133f281eccdc161c002cbfc4d62f23913849))
* **frontend:** update taskfiles, init scripts, and deployment workflows for monorepo orchestration ([88c5204](https://github.com/aimarchirico/template/commit/88c52048461dd6a37f05f08df759740c01e4ddb9))
* **frontend:** update taskfiles, init scripts, and deployment workflows for monorepo orchestration ([0733327](https://github.com/aimarchirico/template/commit/0733327c10a814ad71d5ad27b8c79aff34425c55))
* **task:** add install command to run task and fix directory for build task ([6be288d](https://github.com/aimarchirico/template/commit/6be288dd8ab919b1a443a870b45519475ca5bfd1))
* **turbo.json:** add boundary rules to turbo ([426fbe0](https://github.com/aimarchirico/template/commit/426fbe047f882819a24a361d163a27eed2c4bcc0))
* **workflows:** add ci and deployment workflows ([0ead45f](https://github.com/aimarchirico/template/commit/0ead45f7b499e71c6f06af7de8e7847bc82384fe))


### Bug Fixes

* add CHANGELOG.md to markdownlint ignores ([45b2345](https://github.com/aimarchirico/template/commit/45b23455f3fe586fcfabc3214adbce70c46967e8))
* change core references to commons ([857d53d](https://github.com/aimarchirico/template/commit/857d53dc113afb010ba94ab942a18b501fdd3385))
* **component:** fix release please ([5b8201e](https://github.com/aimarchirico/template/commit/5b8201e6c6c21925acd25508313cee93ee5136f2))
* correct tsconfig extends path in expo configuration ([a2c2c86](https://github.com/aimarchirico/template/commit/a2c2c867354c413f8098766f5b49b2d5507e6168))
* **env.example:** remove additional path reference ([3ecb40c](https://github.com/aimarchirico/template/commit/3ecb40c877f844a0b969b1f702e9d357d4421041))
* **env.example:** remove template reference ([4e64ae5](https://github.com/aimarchirico/template/commit/4e64ae5502f4ac92376a22a0962a767556bbb678))
* **frontend:** clarify dev environment flag usage in app config ([f957000](https://github.com/aimarchirico/template/commit/f957000f814a1571f6b85c424759994a97d4df57))
* **frontend:** define packageManager for Turborepo and use package.json for prettier config ([10a466a](https://github.com/aimarchirico/template/commit/10a466ada96ac6719c3342ae222a7723adeaaa7f))
* **frontend:** define packageManager for Turborepo and use package.json for prettier config ([424aa79](https://github.com/aimarchirico/template/commit/424aa79401c91d3f2ca9b99db810c22e1d6b7149))
* **frontend:** resolve expo typecheck failures in CI ([571ebd2](https://github.com/aimarchirico/template/commit/571ebd2b89771872079f7ae4fb054a0e7f1220af))
* **index.tsx:** remove template word ([6c71f08](https://github.com/aimarchirico/template/commit/6c71f08b5e0fbbe9bd8397285832a7d168c7b90a))
* remove invalid boundaries config in turbo.json ([00a0525](https://github.com/aimarchirico/template/commit/00a052543f6cee5689ac1e7cc6f9b68dfa9f0ca6))
* remove TypeScript compilation from eslint check script ([8518004](https://github.com/aimarchirico/template/commit/8518004ee7aa45d5cbe5dc468b052016940ac566))
* remove unnecessary comment from ESLint configuration ([92fb09e](https://github.com/aimarchirico/template/commit/92fb09e3c5d55be422fce29b1bcd87be1c54c27e))
* resolve botched dev merge in frontend ([ae86bd2](https://github.com/aimarchirico/template/commit/ae86bd2125d1227566af3875b32e514688d040d5))
* **turbo.json:** fix tag names ([2f11cda](https://github.com/aimarchirico/template/commit/2f11cda404490214b35b694c7f4a7eb6aaa7bf2d))
* update @aimarchirico/core-expo version to ^0.1.2 in package.json ([8ccb0a6](https://github.com/aimarchirico/template/commit/8ccb0a64d772c9f2121c23bdaf1676cab65c84b8))
* update API client task to handle errors gracefully ([070fa05](https://github.com/aimarchirico/template/commit/070fa05cb4eaca253fe9266856b723c5228d82fb))
* update core-expo and core-openapi versions in package.json and pnpm-lock.yaml ([c2db007](https://github.com/aimarchirico/template/commit/c2db00740321bb8944ed37755069b2870433f366))
* update core-expo and core-ts version constraints in pnpm-workspace.yaml ([84ba89f](https://github.com/aimarchirico/template/commit/84ba89fd6bce6e789169119692bd2ce4aa46cfd5))
* update package names to include scope for template and tools ([591f3ba](https://github.com/aimarchirico/template/commit/591f3ba82f7a784e83d1473dce97f8a53ba41e23))
* **workflow:** add JDK 17 setup for Android native build ([402176d](https://github.com/aimarchirico/template/commit/402176d6dea81d3622120eed3547cd63ee6a23ab))

## [1.1.0](https://github.com/aimarchirico/template/compare/app-v1.0.0...app-v1.1.0) (2026-07-02)


### Features

* **frontend:** add initial screens layout and assets ([75a7f91](https://github.com/aimarchirico/template/commit/75a7f91106c776f3a839c61b5a1d50068e947923))
* **frontend:** configure pnpm workspaces and turborepo task pipelines ([8603c9a](https://github.com/aimarchirico/template/commit/8603c9aa68e3da0181caddd901a815ec7bb49cc3))
* **frontend:** create api-client package and migrate api generation script ([c27f495](https://github.com/aimarchirico/template/commit/c27f4958984307133af3faa5f00187c305c22d8b))
* **frontend:** create api-client package and migrate api generation script ([128ee54](https://github.com/aimarchirico/template/commit/128ee542dbb234c712bc7ab1fc5ab51e34a4d426))
* **frontend:** create shared configuration packages for eslint, typescript, and prettier ([3e1eb2c](https://github.com/aimarchirico/template/commit/3e1eb2ce476d126f095234778ddbfde294474e10))
* **frontend:** migrate expo application to pnpm workspace and turborepo monorepo ([33555a8](https://github.com/aimarchirico/template/commit/33555a85c93f8f78dd3c499ba592d40b85ccb53b))
* **frontend:** migrate expo application to pnpm workspace and turborepo monorepo ([f0dec20](https://github.com/aimarchirico/template/commit/f0dec20255af5b717aba43536adcfc282ea183f4))
* **frontend:** relocate expo host application to apps/expo and adapt configs ([40ea9b9](https://github.com/aimarchirico/template/commit/40ea9b9c32a4b5c619e57d81282c7fe488e2ce78))
* **frontend:** relocate expo host application to apps/expo and adapt configs ([71b0133](https://github.com/aimarchirico/template/commit/71b0133f281eccdc161c002cbfc4d62f23913849))
* **frontend:** update taskfiles, init scripts, and deployment workflows for monorepo orchestration ([88c5204](https://github.com/aimarchirico/template/commit/88c52048461dd6a37f05f08df759740c01e4ddb9))
* **frontend:** update taskfiles, init scripts, and deployment workflows for monorepo orchestration ([0733327](https://github.com/aimarchirico/template/commit/0733327c10a814ad71d5ad27b8c79aff34425c55))
* **task:** add install command to run task and fix directory for build task ([6be288d](https://github.com/aimarchirico/template/commit/6be288dd8ab919b1a443a870b45519475ca5bfd1))
* **turbo.json:** add boundary rules to turbo ([426fbe0](https://github.com/aimarchirico/template/commit/426fbe047f882819a24a361d163a27eed2c4bcc0))
* **workflows:** add ci and deployment workflows ([0ead45f](https://github.com/aimarchirico/template/commit/0ead45f7b499e71c6f06af7de8e7847bc82384fe))


### Bug Fixes

* add CHANGELOG.md to markdownlint ignores ([45b2345](https://github.com/aimarchirico/template/commit/45b23455f3fe586fcfabc3214adbce70c46967e8))
* **component:** fix release please ([5b8201e](https://github.com/aimarchirico/template/commit/5b8201e6c6c21925acd25508313cee93ee5136f2))
* correct tsconfig extends path in expo configuration ([a2c2c86](https://github.com/aimarchirico/template/commit/a2c2c867354c413f8098766f5b49b2d5507e6168))
* **env.example:** remove additional path reference ([3ecb40c](https://github.com/aimarchirico/template/commit/3ecb40c877f844a0b969b1f702e9d357d4421041))
* **env.example:** remove template reference ([4e64ae5](https://github.com/aimarchirico/template/commit/4e64ae5502f4ac92376a22a0962a767556bbb678))
* **frontend:** clarify dev environment flag usage in app config ([f957000](https://github.com/aimarchirico/template/commit/f957000f814a1571f6b85c424759994a97d4df57))
* **frontend:** define packageManager for Turborepo and use package.json for prettier config ([10a466a](https://github.com/aimarchirico/template/commit/10a466ada96ac6719c3342ae222a7723adeaaa7f))
* **frontend:** define packageManager for Turborepo and use package.json for prettier config ([424aa79](https://github.com/aimarchirico/template/commit/424aa79401c91d3f2ca9b99db810c22e1d6b7149))
* **frontend:** resolve expo typecheck failures in CI ([571ebd2](https://github.com/aimarchirico/template/commit/571ebd2b89771872079f7ae4fb054a0e7f1220af))
* **index.tsx:** remove template word ([6c71f08](https://github.com/aimarchirico/template/commit/6c71f08b5e0fbbe9bd8397285832a7d168c7b90a))
* remove invalid boundaries config in turbo.json ([00a0525](https://github.com/aimarchirico/template/commit/00a052543f6cee5689ac1e7cc6f9b68dfa9f0ca6))
* remove TypeScript compilation from eslint check script ([8518004](https://github.com/aimarchirico/template/commit/8518004ee7aa45d5cbe5dc468b052016940ac566))
* remove unnecessary comment from ESLint configuration ([92fb09e](https://github.com/aimarchirico/template/commit/92fb09e3c5d55be422fce29b1bcd87be1c54c27e))
* resolve botched dev merge in frontend ([ae86bd2](https://github.com/aimarchirico/template/commit/ae86bd2125d1227566af3875b32e514688d040d5))
* **turbo.json:** fix tag names ([2f11cda](https://github.com/aimarchirico/template/commit/2f11cda404490214b35b694c7f4a7eb6aaa7bf2d))
* update @aimarchirico/commons-expo version to ^0.1.2 in package.json ([8ccb0a6](https://github.com/aimarchirico/template/commit/8ccb0a64d772c9f2121c23bdaf1676cab65c84b8))
* update API client task to handle errors gracefully ([070fa05](https://github.com/aimarchirico/template/commit/070fa05cb4eaca253fe9266856b723c5228d82fb))
* update commons-expo and commons-openapi versions in package.json and pnpm-lock.yaml ([c2db007](https://github.com/aimarchirico/template/commit/c2db00740321bb8944ed37755069b2870433f366))
* update commons-expo and commons-ts version constraints in pnpm-workspace.yaml ([84ba89f](https://github.com/aimarchirico/template/commit/84ba89fd6bce6e789169119692bd2ce4aa46cfd5))
* update package names to include scope for template and tools ([591f3ba](https://github.com/aimarchirico/template/commit/591f3ba82f7a784e83d1473dce97f8a53ba41e23))
* **workflow:** add JDK 17 setup for Android native build ([402176d](https://github.com/aimarchirico/template/commit/402176d6dea81d3622120eed3547cd63ee6a23ab))

## [1.1.1](https://github.com/aimarchirico/template/compare/frontend-v1.1.0...frontend-v1.1.1) (2026-07-02)


### Bug Fixes

* **workflow:** add JDK 17 setup for Android native build ([402176d](https://github.com/aimarchirico/template/commit/402176d6dea81d3622120eed3547cd63ee6a23ab))

## [1.1.0](https://github.com/aimarchirico/template/compare/frontend-v1.0.0...frontend-v1.1.0) (2026-07-02)


### Features

* **frontend:** add initial screens layout and assets ([75a7f91](https://github.com/aimarchirico/template/commit/75a7f91106c776f3a839c61b5a1d50068e947923))
* **frontend:** configure pnpm workspaces and turborepo task pipelines ([8603c9a](https://github.com/aimarchirico/template/commit/8603c9aa68e3da0181caddd901a815ec7bb49cc3))
* **frontend:** create api-client package and migrate api generation script ([c27f495](https://github.com/aimarchirico/template/commit/c27f4958984307133af3faa5f00187c305c22d8b))
* **frontend:** create api-client package and migrate api generation script ([128ee54](https://github.com/aimarchirico/template/commit/128ee542dbb234c712bc7ab1fc5ab51e34a4d426))
* **frontend:** create shared configuration packages for eslint, typescript, and prettier ([3e1eb2c](https://github.com/aimarchirico/template/commit/3e1eb2ce476d126f095234778ddbfde294474e10))
* **frontend:** migrate expo application to pnpm workspace and turborepo monorepo ([33555a8](https://github.com/aimarchirico/template/commit/33555a85c93f8f78dd3c499ba592d40b85ccb53b))
* **frontend:** migrate expo application to pnpm workspace and turborepo monorepo ([f0dec20](https://github.com/aimarchirico/template/commit/f0dec20255af5b717aba43536adcfc282ea183f4))
* **frontend:** relocate expo host application to apps/expo and adapt configs ([40ea9b9](https://github.com/aimarchirico/template/commit/40ea9b9c32a4b5c619e57d81282c7fe488e2ce78))
* **frontend:** relocate expo host application to apps/expo and adapt configs ([71b0133](https://github.com/aimarchirico/template/commit/71b0133f281eccdc161c002cbfc4d62f23913849))
* **frontend:** update taskfiles, init scripts, and deployment workflows for monorepo orchestration ([88c5204](https://github.com/aimarchirico/template/commit/88c52048461dd6a37f05f08df759740c01e4ddb9))
* **frontend:** update taskfiles, init scripts, and deployment workflows for monorepo orchestration ([0733327](https://github.com/aimarchirico/template/commit/0733327c10a814ad71d5ad27b8c79aff34425c55))
* **task:** add install command to run task and fix directory for build task ([6be288d](https://github.com/aimarchirico/template/commit/6be288dd8ab919b1a443a870b45519475ca5bfd1))
* **turbo.json:** add boundary rules to turbo ([426fbe0](https://github.com/aimarchirico/template/commit/426fbe047f882819a24a361d163a27eed2c4bcc0))
* **workflows:** add ci and deployment workflows ([0ead45f](https://github.com/aimarchirico/template/commit/0ead45f7b499e71c6f06af7de8e7847bc82384fe))


### Bug Fixes

* **component:** fix release please ([5b8201e](https://github.com/aimarchirico/template/commit/5b8201e6c6c21925acd25508313cee93ee5136f2))
* correct tsconfig extends path in expo configuration ([a2c2c86](https://github.com/aimarchirico/template/commit/a2c2c867354c413f8098766f5b49b2d5507e6168))
* **env.example:** remove additional path reference ([3ecb40c](https://github.com/aimarchirico/template/commit/3ecb40c877f844a0b969b1f702e9d357d4421041))
* **env.example:** remove template reference ([4e64ae5](https://github.com/aimarchirico/template/commit/4e64ae5502f4ac92376a22a0962a767556bbb678))
* **frontend:** clarify dev environment flag usage in app config ([f957000](https://github.com/aimarchirico/template/commit/f957000f814a1571f6b85c424759994a97d4df57))
* **frontend:** define packageManager for Turborepo and use package.json for prettier config ([10a466a](https://github.com/aimarchirico/template/commit/10a466ada96ac6719c3342ae222a7723adeaaa7f))
* **frontend:** define packageManager for Turborepo and use package.json for prettier config ([424aa79](https://github.com/aimarchirico/template/commit/424aa79401c91d3f2ca9b99db810c22e1d6b7149))
* **frontend:** resolve expo typecheck failures in CI ([571ebd2](https://github.com/aimarchirico/template/commit/571ebd2b89771872079f7ae4fb054a0e7f1220af))
* **index.tsx:** remove template word ([6c71f08](https://github.com/aimarchirico/template/commit/6c71f08b5e0fbbe9bd8397285832a7d168c7b90a))
* remove invalid boundaries config in turbo.json ([00a0525](https://github.com/aimarchirico/template/commit/00a052543f6cee5689ac1e7cc6f9b68dfa9f0ca6))
* remove TypeScript compilation from eslint check script ([8518004](https://github.com/aimarchirico/template/commit/8518004ee7aa45d5cbe5dc468b052016940ac566))
* remove unnecessary comment from ESLint configuration ([92fb09e](https://github.com/aimarchirico/template/commit/92fb09e3c5d55be422fce29b1bcd87be1c54c27e))
* resolve botched dev merge in frontend ([ae86bd2](https://github.com/aimarchirico/template/commit/ae86bd2125d1227566af3875b32e514688d040d5))
* **turbo.json:** fix tag names ([2f11cda](https://github.com/aimarchirico/template/commit/2f11cda404490214b35b694c7f4a7eb6aaa7bf2d))
* update @aimarchirico/commons-expo version to ^0.1.2 in package.json ([8ccb0a6](https://github.com/aimarchirico/template/commit/8ccb0a64d772c9f2121c23bdaf1676cab65c84b8))
* update API client task to handle errors gracefully ([070fa05](https://github.com/aimarchirico/template/commit/070fa05cb4eaca253fe9266856b723c5228d82fb))
* update commons-expo and commons-openapi versions in package.json and pnpm-lock.yaml ([c2db007](https://github.com/aimarchirico/template/commit/c2db00740321bb8944ed37755069b2870433f366))
* update commons-expo and commons-ts version constraints in pnpm-workspace.yaml ([84ba89f](https://github.com/aimarchirico/template/commit/84ba89fd6bce6e789169119692bd2ce4aa46cfd5))
* update package names to include scope for template and tools ([591f3ba](https://github.com/aimarchirico/template/commit/591f3ba82f7a784e83d1473dce97f8a53ba41e23))
