import React, { useState } from 'react'
import { StyleSheet, Text, TextStyle, LayoutChangeEvent } from 'react-native'
import { useHandler } from '../../hooks/useHandler'
import { scaleText } from '../../utils/utils'

interface ThemedTextProps {
  children: any
  style?: TextStyle | TextStyle[]
}

export const ThemedText = ({
  children,
  style = {},
  ...props
}: ThemedTextProps): JSX.Element => {
  const [styleState, setStyleState] = useState<any>({})
  const styleArray = Array.isArray(style) ? style : [style]

  const handleLayout = useHandler(
    ({
      nativeEvent: {
        layout: { height, width }
      }
    }: LayoutChangeEvent) => {
      const newStyle = { ...styleState }
      if (newStyle.height == null) {
        newStyle.height = height * 1.1
      }
      if (newStyle.width == null) {
        newStyle.width = width * 1.2
      }
      setStyleState(newStyle)
    }
  )

  return children == null ? (
    <Text>{''}</Text>
  ) : (
    <Text
      onLayout={handleLayout}
      adjustsFontSizeToFit={true}
      numberOfLines={1}
      style={[styles.text, styleState, ...styleArray]}
      {...props}
    >
      {children}
    </Text>
  )
}

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    fontFamily: 'GveretLevin-Regular',
    fontSize: scaleText(36),
    color: 'white'
  }
})
