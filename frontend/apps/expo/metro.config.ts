import {getDefaultConfig} from 'expo/metro-config';
import {withNativeWind} from 'nativewind/metro';
import path from 'path';

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '../..');

const config = getDefaultConfig(projectRoot);

config.watchFolders = [workspaceRoot];
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
];
Object.assign(config.resolver, {disableHierarchicalLookup: true});

/** Metro configuration with NativeWind support and monorepo workspace resolution. */
// @ts-expect-error - Mismatch between expo/metro-config and nativewind/metro types
export default withNativeWind(config, {input: './src/global.css'});
