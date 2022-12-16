import { defaultTheme } from './default'
import merge from 'deepmerge'
import { white } from './custom'

export const Styles: { [key: string]: object } = Object.entries({
  default: defaultTheme,
  white
}).reduce(
  (prev, [key, value]) => ({
    ...prev,
    [key]: merge.all([defaultTheme, value, { $theme: key }])
  }),
  {}
)
