import { defaultTheme } from './default'
import { whiteTheme } from './custom'
import merge from 'deepmerge'

export const Styles: { [key: string]: object } = Object.entries({
  default: defaultTheme,
  white: whiteTheme
}).reduce(
  (prev, [key, value]) => ({
    ...prev,
    [key]: merge.all([defaultTheme, value, { $theme: key }])
  }),
  {}
)
