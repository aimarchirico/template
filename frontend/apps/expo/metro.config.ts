import {getDefaultConfig} from 'expo/metro-config';
import {withNativeWind} from 'nativewind/metro';

const config = getDefaultConfig(__dirname);

/** Metro configuration with NativeWind support. */
// @ts-expect-error - Mismatch between expo/metro-config and nativewind/metro types
export default withNativeWind(config, {input: './src/global.css'});
