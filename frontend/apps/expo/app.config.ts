const NAME = 'Template';
const PACKAGE = 'no.chirico.template';
const LOWER_CASE = NAME.toLowerCase().replace(/\s+/g, '');

/**
 * Build the Expo app configuration for the given environment.
 * @param isDev Whether this is a development build.
 * @param apiUrl The API URL to embed in the app config.
 * @returns The Expo app configuration.
 */
export function buildExpoConfig(isDev: boolean, apiUrl: string) {
  return {
    expo: {
      name: isDev ? `${NAME} (Dev)` : NAME,
      slug: LOWER_CASE,
      version: '1.10.3', // x-release-please-version
      orientation: 'portrait',
      icon: './src/assets/icons/icon.png',
      scheme: LOWER_CASE,
      userInterfaceStyle: 'dark',
      newArchEnabled: true,
      splash: {
        image: './src/assets/icons/splash.png',
        resizeMode: 'contain',
        backgroundColor: '#0f0f0f',
      },
      assetBundlePatterns: ['**/*'],
      ios: {
        supportsTablet: true,
        bundleIdentifier: isDev ? `${PACKAGE}.dev` : PACKAGE,
      },
      android: {
        adaptiveIcon: {
          foregroundImage: './src/assets/icons/adaptive-icon.png',
          backgroundColor: '#0f0f0f',
        },
        package: isDev ? `${PACKAGE}.dev` : PACKAGE,
        minSdkVersion: 26,
      },
      web: {
        bundler: 'metro',
        output: 'static',
        favicon: './src/assets/icons/transparent-icon.png',
      },
      plugins: ['expo-router', 'expo-splash-screen', 'expo-status-bar'],
      experiments: {
        typedRoutes: true,
        reactCompiler: true,
      },
      extra: {
        router: {
          origin: false,
        },
        eas: {
          projectId: '1665a7a4-4be6-41ff-8bf2-6d13cba5baae',
        },
        apiUrl,
      },
    },
  };
}

/** Expo app configuration. */
export default buildExpoConfig(
  process.env.IS_DEV === 'true',
  process.env.API_URL || '',
);
