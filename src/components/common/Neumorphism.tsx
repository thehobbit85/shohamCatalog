import React, { useMemo } from 'react'

import EStyleSheet from 'react-native-extended-stylesheet'
import { View } from 'react-native'
import color from 'color'

interface NeumorphismProps {
  children: any
  backgroundColor?: string
  onPress?: (tapped: boolean) => void
  revert?: boolean
  style?: any
}

export const Neumorphism = (props: NeumorphismProps): JSX.Element => {
  const {
    children,
    backgroundColor = EStyleSheet.value('$colors.background'),
    revert = false,
    style = {}
  } = props

  const lightShadow = color(backgroundColor).lighten(0.5).alpha(0.75).hexa()
  const darkShadow = color(backgroundColor).darken(0.5).alpha(0.75).hexa()
  const lightStyle = useMemo(
    () => ({
      ...styles.outerShadow,
      shadowColor: revert ? darkShadow : lightShadow,
      ...style
    }),
    [darkShadow, lightShadow, revert, style]
  )
  const darkStyle = useMemo(
    () => ({
      ...styles.innerShadow,
      shadowColor: revert ? lightShadow : darkShadow
    }),
    [darkShadow, lightShadow, revert]
  )

  return (
    <View style={lightStyle}>
      <View style={darkStyle}>{children}</View>
    </View>
  )
}

const styles = EStyleSheet.create({
  outerShadow: {
    shadowOffset: { width: -6, height: -6 },
    shadowRadius: 8,
    shadowOpacity: 1
  },
  innerShadow: {
    shadowOffset: { width: 6, height: 6 },
    shadowRadius: 8,
    shadowOpacity: 1
  }
})
