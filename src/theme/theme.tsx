import React, { useContext, useEffect } from 'react'

import EStyleSheet from 'react-native-extended-stylesheet'
import { Theme } from '../@types/types'
import { Styles } from './styles'
import { useAsyncStorage } from '../hooks/useAsyncStorage'
import { useHandler } from '../hooks/useHandler'

interface ThemeContextProps {
  theme: Theme
  setTheme: Function
  selectTheme: Function
}

EStyleSheet.build(Styles.default)

export const ThemeContext = React.createContext<ThemeContextProps>({
  theme: {},
  setTheme: () => {},
  selectTheme: () => {}
})

export const ThemeContextProvider = ({ children }: any): JSX.Element => {
  const [theme, setTheme] = useAsyncStorage<Theme>('theme', Styles.default)
  const selectTheme = useHandler((name: string): void => setTheme(Styles[name]))
  useEffect(() => EStyleSheet.build(theme), [theme])

  return (
    <ThemeContext.Provider
      value={{ theme: theme ?? {}, setTheme, selectTheme }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = (): ThemeContextProps => useContext(ThemeContext)
