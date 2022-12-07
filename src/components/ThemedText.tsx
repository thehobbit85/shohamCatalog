import React, { useState, useRef } from 'react'
import { StyleSheet, Text, TextStyle, LayoutChangeEvent } from 'react-native'
import { useHandler } from '../hooks/useHandler'
import { scaleText } from '../utils/utils'

interface ThemedTextProps {
  children: any
  style?: TextStyle
}

export const ThemedText = ({
  children,
  style = {}
}: ThemedTextProps): JSX.Element => {
  const styleRef = useRef<TextStyle>({ ...style })
  const [styleState, setStyleState] = useState({ ...style })

  const handleLayout = useHandler(
    ({
      nativeEvent: {
        layout: { height, width }
      }
    }: LayoutChangeEvent) => {
      if (styleRef.current.height == null) {
        styleRef.current.height = height * 1.1
      }
      if (styleRef.current.width == null) {
        styleRef.current.width = width * 1.2
      }
      setStyleState(styleRef.current)
    }
  )

  return (
    <Text
      onLayout={handleLayout}
      adjustsFontSizeToFit={true}
      numberOfLines={1}
      style={{ ...styles.text, ...styleState }}
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
