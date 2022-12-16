const defaultTheme = {
  $backgroundColor: '#084b3f'
}

export const Styles: { [key: string]: object } = Object.entries({
  default: defaultTheme,
  white: {
    $backgroundColor: 'white'
  }
}).reduce(
  (prev, [key, value]) => ({
    ...prev,
    [key]: { ...defaultTheme, ...value, $theme: key }
  }),
  {}
)
