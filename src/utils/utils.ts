import { Dimensions } from 'react-native'

const { width } = Dimensions.get('window')

// Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 320
// Manual Shrinking Factor
const manualFactor = 0.5
// Differences between current sizes and guideline sizes:
const horizontalRatio = (width - guidelineBaseWidth) / guidelineBaseWidth
// Factor to scale text pixels by
const scalingFactor = 1 + manualFactor * horizontalRatio

export const scaleText = (size: number): number =>
  Math.round(size * scalingFactor)

export const lowerCaseFirst = (str: string): string =>
  str.charAt(0).toLowerCase() + str.slice(1)
