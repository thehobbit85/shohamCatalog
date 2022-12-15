import { LayoutChangeEvent, Text, TextStyle } from 'react-native'
import React, { useState } from 'react'

import EStyleSheet from 'react-native-extended-stylesheet'
import { scaleText } from '../../utils/utils'
import { useHandler } from '../../hooks/useHandler'

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

const styles = EStyleSheet.create({
  text: {
    paddingTop: scaleText(1),
    paddingRight: scaleText(4),
    textAlign: 'right',
    fontFamily: 'GveretLevin-Regular',
    fontSize: scaleText(36),
    color: 'white'
  }
})
