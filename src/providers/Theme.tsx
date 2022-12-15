import React, { useEffect } from 'react'

import EStyleSheet from 'react-native-extended-stylesheet'
import { Theme } from '../utils/types'
import { useAsyncStorage } from '../hooks/useAsyncStorage'
import { useHandler } from '../hooks/useHandler'

const Themes: { [key: string]: object } = {
  default: {
    $backgroundColor: '#084b3f'
  },
  white: {
    $backgroundColor: 'white'
  }
}

const pickTheme = (theme: string): object => ({
  ...Themes?.[theme],
  $theme: theme
})

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

  const selectTheme = useHandler((name: string): void =>
    setTheme(pickTheme(name))
  )

  useEffect(() => {
    EStyleSheet.build(theme)
  }, [theme])

  return (
    <ThemeContext.Provider
      value={{ theme: theme ?? {}, setTheme, selectTheme }}
    >
      {children}
    </ThemeContext.Provider>
  )
}
