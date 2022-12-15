import React from 'react'
import { View, StyleSheet } from 'react-native'
import { BACKGROUND_COLOR } from '../../utils/constants'
import color from 'color'

interface NeumorphismProps {
  children: any
  backgroundColor?: string
  onPress?: (tapped: boolean) => void
  revert?: boolean
  style?: any
}

export class Neumorphism extends React.PureComponent<NeumorphismProps> {
  render(): JSX.Element {
    const {
      children,
      backgroundColor = BACKGROUND_COLOR,
      revert = false,
      style = {}
    } = this.props
    const lightShadow = color(backgroundColor).lighten(0.5).alpha(0.75).hexa()
    const darkShadow = color(backgroundColor).darken(0.5).alpha(0.75).hexa()

    return (
      <View
        style={{
          ...styles.lightShadow,
          shadowColor: revert ? darkShadow : lightShadow,
          ...style
        }}
      >
        <View
          style={{
            ...styles.darkShadow,
            shadowColor: revert ? lightShadow : darkShadow
          }}
        >
          {children}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  lightShadow: {
    shadowOffset: { width: -6, height: -6 },
    shadowRadius: 8,
    shadowOpacity: 1
  },
  darkShadow: {
    shadowOffset: { width: 6, height: 6 },
    shadowRadius: 8,
    shadowOpacity: 1
  }
})
