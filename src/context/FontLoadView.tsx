import * as SplashScreen from 'expo-splash-screen'

import React, { useCallback } from 'react'

import { View } from 'react-native'
import { useFonts } from 'expo-font'

interface FontLoadViewProps {
  children: any
  customFonts?: { [name: string]: any }
}

SplashScreen.preventAutoHideAsync().catch((error) => console.log(error))

export const FontLoadView = ({
  children,
  customFonts = {}
}: FontLoadViewProps): JSX.Element | null => {
  const [fontsLoaded] = useFonts(customFonts)

  const onLayoutRootView = useCallback(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync().catch((error) => console.log(error))
    }
  }, [fontsLoaded])

  if (!fontsLoaded) {
    return null
  }

  return <View onLayout={onLayoutRootView}>{children}</View>
}
