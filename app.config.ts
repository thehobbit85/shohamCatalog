const baseConfig = {
  name: 'Catalog',
  slug: 'shohamcatalog',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/images/icon.png',
  userInterfaceStyle: 'light',
  splash: {
    image: './assets/images/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#084b3f'
  },
  updates: {
    fallbackToCacheTimeout: 0
  },
  assetBundlePatterns: ['**/*'],
  jsEngine: 'hermes',
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.shohamtech.catalog'
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/images/adaptive-icon.png',
      backgroundColor: '#084b3f'
    },
    package: 'com.shohamtech.catalog'
  },
  web: {
    favicon: './assets/images/favicon.png'
  },
  extra: {
    eas: {
      projectId: 'e83b688c-2141-485d-870f-d2c47f2a5a0c'
    }
  },
  owner: 'shohamtech'
}

export default {
  ...baseConfig,
  plugins: ['expo-community-flipper'],
  mods: {
    ios: {
      podfileProperties: (config: { modResults: any }) => {
        config.modResults = {
          ...config.modResults,
          'ios.deploymentTarget': '14.0'
        }
        return config
      }
    }
  }
}
