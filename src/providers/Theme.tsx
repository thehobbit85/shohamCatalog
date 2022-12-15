import React, { useEffect } from 'react'

import EStyleSheet from 'react-native-extended-stylesheet'
import { Theme } from '../types'
import { useAsyncStorage } from '../hooks/useAsyncStorage'

const defaultTheme = {
  $backgroundColor: '#084b3f',
  $theme: 'default'
}

// useEffect(() => {
//   const a = setInterval(() => {
//     i = !i
//     setTheme({
//       $backgroundColor: i ? '#084b3f' : 'white',
//       $theme: i ? 'default' : 'white'
//     })
//   }, 100)
//   return () => clearInterval(a)
// })

EStyleSheet.build(defaultTheme)

export const ThemeContext = React.createContext<[Theme, Function]>([
  {},
  () => {}
])

export const ThemeContextProvider = ({ children }: any): JSX.Element => {
  const [theme, setTheme] = useAsyncStorage<Theme>('theme', defaultTheme)

  useEffect(() => {
    console.log('21. theme', JSON.stringify(theme, null, 2))
    EStyleSheet.build(theme)
  }, [theme])

  return (
    <ThemeContext.Provider value={[theme ?? {}, setTheme]}>
      {children}
    </ThemeContext.Provider>
  )
}
