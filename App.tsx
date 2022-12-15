import React, { useCallback } from 'react'

import { Application } from './src/index'

import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { View } from 'react-native'
import { Providers } from './src/providers/Providers'

SplashScreen.preventAutoHideAsync().catch((error) => console.log(error))

export default function App(): JSX.Element | null {
  const [fontsLoaded] = useFonts({
    'GveretLevin-Regular': require('./assets/fonts/GveretLevin-Regular.ttf')
  })

  const onLayoutRootView = useCallback(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync().catch((error) => console.log(error))
    }
  }, [fontsLoaded])

  if (!fontsLoaded) {
    return null
  }

  return (
    <View onLayout={onLayoutRootView}>
      <Providers>
        <Application />
      </Providers>
    </View>
  )
}
