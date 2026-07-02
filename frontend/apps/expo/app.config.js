const IS_DEV = process.env.IS_DEV === 'true';

export default {
  expo: {
    name: IS_DEV ? 'Template (Dev)' : 'Template',
    slug: 'template',
    version: '1.1.1', // x-release-please-version
    orientation: 'portrait',
    icon: './src/assets/icons/icon.png',
    scheme: 'template',
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
      bundleIdentifier: IS_DEV
        ? 'no.chirico.template.dev'
        : 'no.chirico.template',
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './src/assets/icons/adaptive-icon.png',
        backgroundColor: '#0f0f0f',
      },
      package: IS_DEV ? 'no.chirico.template.dev' : 'no.chirico.template',
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
    },
    extra: {
      router: {
        origin: false,
      },
      apiUrl: process.env.API_URL || '',
    },
  },
};
