import React, { useEffect } from 'react'

import EStyleSheet from 'react-native-extended-stylesheet'
import { Theme } from '../utils/types'
import { Themes } from '../utils/themes'
import { useAsyncStorage } from '../hooks/useAsyncStorage'
import { useHandler } from '../hooks/useHandler'

EStyleSheet.build(Themes.default)

export const ThemeContext = React.createContext<{
  theme: Theme
  setTheme: Function
  selectTheme: Function
}>({
  theme: {},
  setTheme: () => {},
  selectTheme: () => {}
})

export const ThemeContextProvider = ({ children }: any): JSX.Element => {
  const [theme, setTheme] = useAsyncStorage<Theme>('theme', Themes.default)
  const selectTheme = useHandler((name: string): void => setTheme(Themes[name]))
  useEffect(() => EStyleSheet.build(theme), [theme])

  return (
    <ThemeContext.Provider
      value={{ theme: theme ?? {}, setTheme, selectTheme }}
    >
      {children}
    </ThemeContext.Provider>
  )
}
