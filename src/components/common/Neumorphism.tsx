import React, { useMemo } from 'react'

import EStyleSheet from 'react-native-extended-stylesheet'
import { View } from 'react-native'
import color from 'color'
import { useTheme } from '../../theme/theme'

interface NeumorphismProps {
  children: any
  backgroundColor?: string
  onPress?: (tapped: boolean) => void
  revert?: boolean
  style?: any
}

export const Neumorphism = (props: NeumorphismProps): JSX.Element => {
  const { children, revert = false, style = {} } = props

  const { theme } = useTheme()

  const backgroundColor = props.backgroundColor ?? theme?.$colors?.background
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
    shadowOffset: {
      width: '$neumorphism.outerShadow.shadowOffset.width',
      height: '$neumorphism.outerShadow.shadowOffset.height'
    },
    shadowRadius: '$neumorphism.outerShadow.shadowRadius',
    shadowOpacity: '$neumorphism.outerShadow.shadowOpacity'
  },
  innerShadow: {
    shadowOffset: {
      width: '$neumorphism.innerShadow.shadowOffset.width',
      height: '$neumorphism.innerShadow.shadowOffset.height'
    },
    shadowRadius: '$neumorphism.innerShadow.shadowRadius',
    shadowOpacity: '$neumorphism.innerShadow.shadowOpacity'
  }
})
