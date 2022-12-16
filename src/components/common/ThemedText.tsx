import { LayoutChangeEvent, Text, TextStyle } from 'react-native'
import React, { useMemo, useState } from 'react'

import EStyleSheet from 'react-native-extended-stylesheet'
import { scaleSize } from '../../utils/utils'
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
  const styleArray = useMemo(
    () => (Array.isArray(style) ? style : [style]),
    [style]
  )

  const textStyle = useMemo(
    () => [styles.text, styleState, ...styleArray],
    [styleArray, styleState]
  )

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
      style={textStyle}
      {...props}
    >
      {children}
    </Text>
  )
}

const styles = EStyleSheet.create({
  text: {
    paddingTop: scaleSize(1),
    paddingRight: '$paddings.xsmall',
    textAlign: '$textAlign',
    fontFamily: '$fontFamily',
    fontSize: '$textSizes.h2',
    color: '$colors.text'
  }
})
