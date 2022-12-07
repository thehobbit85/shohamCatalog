import React, { useCallback } from 'react'

import { Application } from './src/index'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { View } from 'react-native'
import { Context } from './src/context'

SplashScreen.preventAutoHideAsync().catch((error) => console.log(error))

const queryClient = new QueryClient()

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
      <QueryClientProvider client={queryClient}>
        <Context>
          <Application />
        </Context>
      </QueryClientProvider>
    </View>
  )
}
