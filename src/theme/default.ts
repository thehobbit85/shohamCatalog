import { scaleSize } from '../utils/utils'

export const defaultTheme = {
  $colors: {
    background: '#084b3f',
    text: 'white'
  },
  $textSizes: {
    h1: scaleSize(48),
    h2: scaleSize(36),
    h3: scaleSize(24),
    h4: scaleSize(16)
  },
  $borderRadii: {
    xlarge: scaleSize(24),
    large: scaleSize(16),
    medium: scaleSize(12),
    small: scaleSize(10)
  },
  $margins: {
    xxlarge: scaleSize(56),
    xlarge: scaleSize(36),
    large: scaleSize(24),
    medium: scaleSize(16),
    small: scaleSize(8),
    xsmall: scaleSize(4)
  },
  $paddings: {
    xxlarge: scaleSize(56),
    xlarge: scaleSize(36),
    large: scaleSize(24),
    medium: scaleSize(16),
    small: scaleSize(8),
    xsmall: scaleSize(4)
  }
}
