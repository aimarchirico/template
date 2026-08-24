# Changelog

## [1.10.4](https://github.com/aimarchirico/template/compare/template-app-v1.10.3...template-app-v1.10.4) (2026-08-24)


### Bug Fixes

* **setup:** align configured backend port and add EAS owner to the rename manifest ([88ff15d](https://github.com/aimarchirico/template/commit/88ff15d522ffe56db3fc374c25d6503abd284484))
* **setup:** fix provisioning pipeline bugs and rewrite install docs ([eb01d20](https://github.com/aimarchirico/template/commit/eb01d204c680b6423c3e1db1451659e0fae41e0c))

## [1.10.3](https://github.com/aimarchirico/template/compare/template-app-v1.10.2...template-app-v1.10.3) (2026-08-07)


### Bug Fixes

* remove outdated patch for [@expo](https://github.com/expo)__image-utils ([0f03dee](https://github.com/aimarchirico/template/commit/0f03dee38dfcfc68e73d4ce412c1940457aef516))
* remove patched dependency for @expo/image-utils ([231c39d](https://github.com/aimarchirico/template/commit/231c39d611f8dd00450b8f8f72f298496e5a76c0))
* update TypeScript error comment for nativewind type mismatch ([c9c3fe2](https://github.com/aimarchirico/template/commit/c9c3fe27875dcd9a1e8906662cd9c3a11298bd24))

## [1.10.2](https://github.com/aimarchirico/template/compare/template-app-v1.10.1...template-app-v1.10.2) (2026-08-07)


### Bug Fixes

* **deps:** update @aimarchirico/commons-ts ([e7e65a8](https://github.com/aimarchirico/template/commit/e7e65a8289f07fcd443f39651ec44c6d3caaccad))
* **deps:** update eas-cli to 21.6.0 ([69de27e](https://github.com/aimarchirico/template/commit/69de27e78b10aa2d85839cd250c4d39406deb2b5))
* **deps:** update jiti devDependency across workspace packages ([2722f6f](https://github.com/aimarchirico/template/commit/2722f6f81d0a2d01b89e9451b4009d3b723bfd80))
* **deps:** update jiti devDependency across workspace packages ([a65a1df](https://github.com/aimarchirico/template/commit/a65a1dff16e9a2eb7e26a9b61cf197543340f96d))
* **deps:** update nativewind ([35804e3](https://github.com/aimarchirico/template/commit/35804e3d16db1e0b4b0bd591657d8d4697318d93))
* **deps:** update nativewind and related dependencies to use caret versioning ([023c00e](https://github.com/aimarchirico/template/commit/023c00eee94791dde85c8104bcc1cead17578370))
* **eslint.config.ts:** remove redundant ignores ([9c404a5](https://github.com/aimarchirico/template/commit/9c404a525bfd4823829c0d521698d86b84f62e8e))
* resolve failing checks ([124a2ff](https://github.com/aimarchirico/template/commit/124a2ff8cb44f01957b162df89ece1213ca17134))
* **types:** add CSS module declaration to nativewind-env.d.ts ([d5eb291](https://github.com/aimarchirico/template/commit/d5eb291845932be8a207bdec7b20bacc96f46f27))
* **types:** ensure correct reference for react-native-css in nativewind-env.d.ts ([5f8b361](https://github.com/aimarchirico/template/commit/5f8b3616934c83390e5c890ec27d16c2256fcd04))
* **types:** restore CSS module declaration in nativewind-env.d.ts ([848f980](https://github.com/aimarchirico/template/commit/848f98073d51618495e24f6dcc6af2cb0ed4b103))

## [1.10.1](https://github.com/aimarchirico/template/compare/template-app-v1.10.0...template-app-v1.10.1) (2026-08-03)


### Bug Fixes

* **frontend:** repair corrupted app icons breaking Expo web/android builds ([37ef29f](https://github.com/aimarchirico/template/commit/37ef29f91f5ac06cbddc503a9b6920e0f0845b50))
* **frontend:** repair corrupted app icons breaking Expo web/android builds ([7e0e73f](https://github.com/aimarchirico/template/commit/7e0e73f1d24ffb14be53bda031cd46781a5be9ee))

## [1.10.0](https://github.com/aimarchirico/template/compare/template-app-v1.9.1...template-app-v1.10.0) (2026-08-03)


### Features

* add expo-test-utils package for react-native vitest support ([2ad211f](https://github.com/aimarchirico/template/commit/2ad211f40cddb6748e06cbce18a0f3b4de850f8a))
* adopt 80% test-coverage enforcement from commons ([3e9673e](https://github.com/aimarchirico/template/commit/3e9673ed2b056ea1095ed4a20c49608611c033f9))
* adopt 80% test-coverage threshold from commons ([19ed520](https://github.com/aimarchirico/template/commit/19ed520801cfe4ada4f6d72c36958829e27b3d90))


### Bug Fixes

* resolve frontend ESLint and test configuration ([d25a859](https://github.com/aimarchirico/template/commit/d25a8590282698899634954aa0009f278dad8ba6))
* update frontend config files for defineConfig pattern ([d14f193](https://github.com/aimarchirico/template/commit/d14f193524dfab96cbdec491b364ee82a96678be))

## [1.9.1](https://github.com/aimarchirico/template/compare/template-app-v1.9.0...template-app-v1.9.1) (2026-07-30)


### Bug Fixes

* **expo:** enable react compiler via app config instead of manual babel plugin ([c7d2cd4](https://github.com/aimarchirico/template/commit/c7d2cd43f911d42dd7b92ec5f429c91da99a83fb))
* **expo:** enable react compiler via app config instead of manual babel plugin ([dc259cd](https://github.com/aimarchirico/template/commit/dc259cdb41727630050d8531e28df739d096ef5f))
* **package:** add comment to trigger release ([a8cf878](https://github.com/aimarchirico/template/commit/a8cf8787d4eadc88b951871950b454d152dfa7e8))

## [1.9.0](https://github.com/aimarchirico/template/compare/template-app-v1.8.6...template-app-v1.9.0) (2026-07-29)


### Features

* automate post-scaffold provisioning through commons commands ([44dd34b](https://github.com/aimarchirico/template/commit/44dd34b3f0b94ef9058e4afd88b15cd70b64f318))
* **setup:** add initial settings.json for enabled plugins configuration ([de84f6f](https://github.com/aimarchirico/template/commit/de84f6ff05b348a399daeffc4c3918d67cf565ea))
* **setup:** rename Cloudflare pages environment task and script ([d73d29b](https://github.com/aimarchirico/template/commit/d73d29bc83c32b807b12e6c8af26a16f34db1c99))


### Bug Fixes

* **setup:** update dtrace-provider and unrs-resolver settings in pnpm-workspace.yaml ([cda6be2](https://github.com/aimarchirico/template/commit/cda6be2c65ec43255c19aa44816c6cc963b2770c))

## [1.8.6](https://github.com/aimarchirico/template/compare/template-app-v1.8.5...template-app-v1.8.6) (2026-07-25)


### Bug Fixes

* **_layout.tsx:** remove @ alias ([3336b37](https://github.com/aimarchirico/template/commit/3336b374f1f1331cc91756b238e06ee14a29ee81))

## [1.8.5](https://github.com/aimarchirico/template/compare/template-app-v1.8.4...template-app-v1.8.5) (2026-07-25)


### Bug Fixes

* update eslint config import to use eslint-app ([c30940a](https://github.com/aimarchirico/template/commit/c30940aa70dd2b1df2931c7c915b4e5010b942c0))
* update lockfile ([a359170](https://github.com/aimarchirico/template/commit/a3591708687745ed8f9a5de38a32257f9b1019f2))

## [1.8.4](https://github.com/aimarchirico/template/compare/template-app-v1.8.3...template-app-v1.8.4) (2026-07-20)


### Bug Fixes

* **frontend:** remove yargs-parser override breaking Android codegen ([6f78abc](https://github.com/aimarchirico/template/commit/6f78abc5e6406c092094ef725da99860ab52b367))

## [1.8.3](https://github.com/aimarchirico/template/compare/template-app-v1.8.2...template-app-v1.8.3) (2026-07-19)


### Bug Fixes

* add wrangler dep ([16220df](https://github.com/aimarchirico/template/commit/16220dfcb8961ec4af70ed4e8f49e42c63811155))

## [1.8.2](https://github.com/aimarchirico/template/compare/template-app-v1.8.1...template-app-v1.8.2) (2026-07-19)


### Bug Fixes

* add API task to install command in Taskfile ([d58ce91](https://github.com/aimarchirico/template/commit/d58ce9170ec4389313cb6e0653f8b88375d918b9))
* temporarily remove API task from install command ([9a58e3f](https://github.com/aimarchirico/template/commit/9a58e3f79d49f9d82817df1a00a719ffd19e2c22))

## [1.8.1](https://github.com/aimarchirico/template/compare/template-app-v1.8.0...template-app-v1.8.1) (2026-07-19)


### Bug Fixes

* move Cloudflare Pages function and environment configuration ([aedbcd4](https://github.com/aimarchirico/template/commit/aedbcd4dbffd8c862c2be3da6fd7b5e9c85f0794))
* move Cloudflare Pages function and update ESLint configuration ([8f85e6d](https://github.com/aimarchirico/template/commit/8f85e6df465afb668ddd9f1a524f4628ada709f5))
* update ESLint configuration to include specific file rules ([cedeb81](https://github.com/aimarchirico/template/commit/cedeb81e84aef7f1490b49ebac927a7ca3c905fa))

## [1.8.0](https://github.com/aimarchirico/template/compare/template-app-v1.7.1...template-app-v1.8.0) (2026-07-19)


### Features

* add Cloudflare Pages function and environment configuration ([729d026](https://github.com/aimarchirico/template/commit/729d026f01b7ead471a8989c3ae56cb675c2f23a))


### Bug Fixes

* update ESLint configuration and format export statement in Cloudflare function ([839406f](https://github.com/aimarchirico/template/commit/839406fed1c0549dbd4b86b157a4e1eafa34b41f))

## [1.7.1](https://github.com/aimarchirico/template/compare/template-app-v1.7.0...template-app-v1.7.1) (2026-07-19)


### Bug Fixes

* change Cloudflare Pages function to ts ([be7b551](https://github.com/aimarchirico/template/commit/be7b55197a565a5a9aaa9fea64cc309c621bf00b))

## [1.7.0](https://github.com/aimarchirico/template/compare/template-app-v1.6.1...template-app-v1.7.0) (2026-07-19)


### Features

* **expo:** restore commons-expo for configuration deduplication ([121c6f8](https://github.com/aimarchirico/template/commit/121c6f8b130a2bd8767972af4fde52caabed0d42))


### Bug Fixes

* **dependencies:** update @aimarchirico/commons-ts to version 1.1.1 ([7f489ad](https://github.com/aimarchirico/template/commit/7f489ad08e587b715434fc441dcd3b691d209814))
* streamline eslint configuration by removing unnecessary line breaks ([6ee726c](https://github.com/aimarchirico/template/commit/6ee726ccf2cb1bf0379a1c21fc226a7ea73f3d86))
* update commons dependencies to latest versions ([c7cf468](https://github.com/aimarchirico/template/commit/c7cf468ff4df5b6a85436f609611a7b82e0f87f5))
* update dependencies to latest versions for commons packages ([b20e837](https://github.com/aimarchirico/template/commit/b20e837092d837e825bc334db888417e63c0b254))

## [1.6.1](https://github.com/aimarchirico/template/compare/template-app-v1.6.0...template-app-v1.6.1) (2026-07-15)


### Bug Fixes

* **api-client:** reorder scripts in package.json for clarity ([57d49eb](https://github.com/aimarchirico/template/commit/57d49eb4fabb1802424c0807f5c3790592002ffe))
* **api-client:** update @aimarchirico/commons-openapi ([837e2b3](https://github.com/aimarchirico/template/commit/837e2b3020ed00e2a6bfe0e161038c8a30835c23))
* **api-client:** update @aimarchirico/commons-openapi to version 1.1.3 ([898de14](https://github.com/aimarchirico/template/commit/898de142007338ae8f8f15a6236d0dc6e9c7d1d5))

## [1.6.0](https://github.com/aimarchirico/template/compare/template-app-v1.5.1...template-app-v1.6.0) (2026-07-07)


### Features

* **config:** add EAS project ID to app configuration ([0814a4b](https://github.com/aimarchirico/template/commit/0814a4b22abaf136566b64780d9d116e715f71a7))
* **config:** add eas.json for Expo build configuration ([b7a3d3d](https://github.com/aimarchirico/template/commit/b7a3d3d1f2bcb1e5eaf2134509806f7e7c5ed3fa))
* **frontend:** sign android release builds with a managed keystore ([f865db0](https://github.com/aimarchirico/template/commit/f865db07b697914988342239ef650643246c190c))
* **frontend:** sign android release builds with a managed keystore ([9929a71](https://github.com/aimarchirico/template/commit/9929a71fcea32cc1da5f07e0c4e18f9417e7a3e0))


### Bug Fixes

* **config:** add missing comma in eas configuration ([e46b9f7](https://github.com/aimarchirico/template/commit/e46b9f74e972c9f9aaa54d6860002b9ff3bed097))
* **deps:** update @aimarchirico/commons-expo to version 1.2.0 ([7aec892](https://github.com/aimarchirico/template/commit/7aec8929b6c269b4bb763ccde81cca9187dec07a))
* **deps:** update @aimarchirico/commons-expo to version 1.2.0 ([840a86e](https://github.com/aimarchirico/template/commit/840a86e4fbbe3a1c83273db3c3473c3990e9ebad))

## [1.5.1](https://github.com/aimarchirico/template/compare/template-app-v1.5.0...template-app-v1.5.1) (2026-07-06)


### Bug Fixes

* **expo:** downgrade @babel/core to v7 for react-native-worklets compatibility ([bb5fb43](https://github.com/aimarchirico/template/commit/bb5fb430f9e045f4505983d017b481490a9f94d2))

## [1.5.0](https://github.com/aimarchirico/template/compare/template-app-v1.4.0...template-app-v1.5.0) (2026-07-06)


### Features

* CORS opt-in for local web dev + config/CI conformance ([149d2da](https://github.com/aimarchirico/template/commit/149d2da5de2aa81efb02966df33001fc47d6a0b6))
* enable CORS for local web dev ([a515fbc](https://github.com/aimarchirico/template/commit/a515fbc7e4d62d5d01d421e34cfac4f356650bf4))
* **expo:** add nativewind styling ([ff2f455](https://github.com/aimarchirico/template/commit/ff2f455d4de0338ec6b6a4eac39110546caf32e8))
* **expo:** add nativewind styling ([80ef92c](https://github.com/aimarchirico/template/commit/80ef92c50b23b22d43ae46fff86972452e1f8d66))
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
* **frontend:** filter by directory in Taskfile to support custom package names ([5d72486](https://github.com/aimarchirico/template/commit/5d724862132bbdd63114948f229489f9a8978da3))
* **frontend:** relocate generated api client to api-client package ([35aa875](https://github.com/aimarchirico/template/commit/35aa875b6e7ca13d5641a2d5935180c24903b56b))
* **frontend:** resolve expo typecheck failures in CI ([571ebd2](https://github.com/aimarchirico/template/commit/571ebd2b89771872079f7ae4fb054a0e7f1220af))
* **index.tsx:** remove template word ([6c71f08](https://github.com/aimarchirico/template/commit/6c71f08b5e0fbbe9bd8397285832a7d168c7b90a))
* pipeline configurations and package scripts ([acf4e03](https://github.com/aimarchirico/template/commit/acf4e03a444f6cad0889e8c10322fe0205447deb))
* remove invalid boundaries config in turbo.json ([00a0525](https://github.com/aimarchirico/template/commit/00a052543f6cee5689ac1e7cc6f9b68dfa9f0ca6))
* remove redundant node-linker setting from .npmrc and ensure consistency in pnpm-workspace.yaml ([6877ee7](https://github.com/aimarchirico/template/commit/6877ee7291414701641b017303a167c02f57d5ef))
* remove TypeScript compilation from eslint check script ([8518004](https://github.com/aimarchirico/template/commit/8518004ee7aa45d5cbe5dc468b052016940ac566))
* remove unnecessary comment from ESLint configuration ([92fb09e](https://github.com/aimarchirico/template/commit/92fb09e3c5d55be422fce29b1bcd87be1c54c27e))
* rename package to match project structure ([3768ee6](https://github.com/aimarchirico/template/commit/3768ee6d082f26157a603c36e343d21ca663234f))
* resolve botched dev merge in frontend ([ae86bd2](https://github.com/aimarchirico/template/commit/ae86bd2125d1227566af3875b32e514688d040d5))
* simplify eslint commands in package.json files ([a8376c3](https://github.com/aimarchirico/template/commit/a8376c33c43e0ade6bbaa728016502364a7ea913))
* **turbo.json:** fix tag names ([2f11cda](https://github.com/aimarchirico/template/commit/2f11cda404490214b35b694c7f4a7eb6aaa7bf2d))
* update @aimarchirico/core-expo version to ^0.1.2 in package.json ([8ccb0a6](https://github.com/aimarchirico/template/commit/8ccb0a64d772c9f2121c23bdaf1676cab65c84b8))
* update API client task to handle errors gracefully ([070fa05](https://github.com/aimarchirico/template/commit/070fa05cb4eaca253fe9266856b723c5228d82fb))
* update Cloudflare script comments and remove redundant routes configuration ([53ca549](https://github.com/aimarchirico/template/commit/53ca54937da372b0834049c9439fafd4fa26c4fd))
* update core-expo and core-openapi versions in package.json and pnpm-lock.yaml ([c2db007](https://github.com/aimarchirico/template/commit/c2db00740321bb8944ed37755069b2870433f366))
* update core-expo and core-ts version constraints in pnpm-workspace.yaml ([84ba89f](https://github.com/aimarchirico/template/commit/84ba89fd6bce6e789169119692bd2ce4aa46cfd5))
* update package names to include scope for template and tools ([591f3ba](https://github.com/aimarchirico/template/commit/591f3ba82f7a784e83d1473dce97f8a53ba41e23))
* **workflow:** add JDK 17 setup for Android native build ([402176d](https://github.com/aimarchirico/template/commit/402176d6dea81d3622120eed3547cd63ee6a23ab))

## [1.4.0](https://github.com/aimarchirico/template/compare/app-v1.3.0...app-v1.4.0) (2026-07-05)


### Features

* CORS opt-in for local web dev + config/CI conformance ([149d2da](https://github.com/aimarchirico/template/commit/149d2da5de2aa81efb02966df33001fc47d6a0b6))
* enable CORS for local web dev ([a515fbc](https://github.com/aimarchirico/template/commit/a515fbc7e4d62d5d01d421e34cfac4f356650bf4))
* **expo:** add nativewind styling ([ff2f455](https://github.com/aimarchirico/template/commit/ff2f455d4de0338ec6b6a4eac39110546caf32e8))
* **expo:** add nativewind styling ([80ef92c](https://github.com/aimarchirico/template/commit/80ef92c50b23b22d43ae46fff86972452e1f8d66))
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
* **frontend:** filter by directory in Taskfile to support custom package names ([5d72486](https://github.com/aimarchirico/template/commit/5d724862132bbdd63114948f229489f9a8978da3))
* **frontend:** relocate generated api client to api-client package ([35aa875](https://github.com/aimarchirico/template/commit/35aa875b6e7ca13d5641a2d5935180c24903b56b))
* **frontend:** resolve expo typecheck failures in CI ([571ebd2](https://github.com/aimarchirico/template/commit/571ebd2b89771872079f7ae4fb054a0e7f1220af))
* **index.tsx:** remove template word ([6c71f08](https://github.com/aimarchirico/template/commit/6c71f08b5e0fbbe9bd8397285832a7d168c7b90a))
* pipeline configurations and package scripts ([acf4e03](https://github.com/aimarchirico/template/commit/acf4e03a444f6cad0889e8c10322fe0205447deb))
* remove invalid boundaries config in turbo.json ([00a0525](https://github.com/aimarchirico/template/commit/00a052543f6cee5689ac1e7cc6f9b68dfa9f0ca6))
* remove redundant node-linker setting from .npmrc and ensure consistency in pnpm-workspace.yaml ([6877ee7](https://github.com/aimarchirico/template/commit/6877ee7291414701641b017303a167c02f57d5ef))
* remove TypeScript compilation from eslint check script ([8518004](https://github.com/aimarchirico/template/commit/8518004ee7aa45d5cbe5dc468b052016940ac566))
* remove unnecessary comment from ESLint configuration ([92fb09e](https://github.com/aimarchirico/template/commit/92fb09e3c5d55be422fce29b1bcd87be1c54c27e))
* rename package to match project structure ([3768ee6](https://github.com/aimarchirico/template/commit/3768ee6d082f26157a603c36e343d21ca663234f))
* resolve botched dev merge in frontend ([ae86bd2](https://github.com/aimarchirico/template/commit/ae86bd2125d1227566af3875b32e514688d040d5))
* simplify eslint commands in package.json files ([a8376c3](https://github.com/aimarchirico/template/commit/a8376c33c43e0ade6bbaa728016502364a7ea913))
* **turbo.json:** fix tag names ([2f11cda](https://github.com/aimarchirico/template/commit/2f11cda404490214b35b694c7f4a7eb6aaa7bf2d))
* update @aimarchirico/core-expo version to ^0.1.2 in package.json ([8ccb0a6](https://github.com/aimarchirico/template/commit/8ccb0a64d772c9f2121c23bdaf1676cab65c84b8))
* update API client task to handle errors gracefully ([070fa05](https://github.com/aimarchirico/template/commit/070fa05cb4eaca253fe9266856b723c5228d82fb))
* update Cloudflare script comments and remove redundant routes configuration ([53ca549](https://github.com/aimarchirico/template/commit/53ca54937da372b0834049c9439fafd4fa26c4fd))
* update core-expo and core-openapi versions in package.json and pnpm-lock.yaml ([c2db007](https://github.com/aimarchirico/template/commit/c2db00740321bb8944ed37755069b2870433f366))
* update core-expo and core-ts version constraints in pnpm-workspace.yaml ([84ba89f](https://github.com/aimarchirico/template/commit/84ba89fd6bce6e789169119692bd2ce4aa46cfd5))
* update package names to include scope for template and tools ([591f3ba](https://github.com/aimarchirico/template/commit/591f3ba82f7a784e83d1473dce97f8a53ba41e23))
* **workflow:** add JDK 17 setup for Android native build ([402176d](https://github.com/aimarchirico/template/commit/402176d6dea81d3622120eed3547cd63ee6a23ab))

## [1.3.0](https://github.com/aimarchirico/template/compare/template-app-v1.2.0...template-app-v1.3.0) (2026-07-03)


### Features

* **expo:** add nativewind styling ([ff2f455](https://github.com/aimarchirico/template/commit/ff2f455d4de0338ec6b6a4eac39110546caf32e8))
* **expo:** add nativewind styling ([80ef92c](https://github.com/aimarchirico/template/commit/80ef92c50b23b22d43ae46fff86972452e1f8d66))


### Bug Fixes

* **frontend:** relocate generated api client to api-client package ([35aa875](https://github.com/aimarchirico/template/commit/35aa875b6e7ca13d5641a2d5935180c24903b56b))

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
