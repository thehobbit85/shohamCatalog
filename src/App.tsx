import React, { useEffect, useMemo } from 'react'

import { FontLoadView } from './context/FontLoadView'
import { Home } from './screens/Home'
import { ParallaxProvider } from './hooks/useParallax'
import { ThemeContextProvider } from './theme/theme'
import { useHandler } from './hooks/useHandler'
import { useStore } from './state/useStore'

export default function App(): JSX.Element | null {
  const fetchData = useStore(useHandler((state) => state.fetchData))

  useEffect(() => {
    fetchData().catch((e) => console.log(e))
  }, [fetchData])

  const customFonts = useMemo(
    () => ({
      'GveretLevin-Regular': require('../assets/fonts/GveretLevin-Regular.ttf')
    }),
    []
  )

  return (
    <ParallaxProvider>
      <ThemeContextProvider>
        <FontLoadView customFonts={customFonts}>
          <Home />
        </FontLoadView>
      </ThemeContextProvider>
    </ParallaxProvider>
  )
}
