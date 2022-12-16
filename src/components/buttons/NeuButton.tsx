import React, { useMemo } from 'react'

import EStyleSheet from 'react-native-extended-stylesheet'
import { Neumorphism } from '../common/Neumorphism'
import { ThemedText } from '../common/ThemedText'
import { TouchableOpacity } from 'react-native'
import { scaleSize } from '../../utils/utils'

interface NeuButtonProps {
  title: string
  onPress: () => void
  style?: object
}

export const NeuButton = (props: NeuButtonProps): JSX.Element => {
  const neuStyles = useMemo(
    () => ({ ...styles.button, ...props?.style }),
    [props?.style]
  )

  return (
    <Neumorphism style={neuStyles}>
      <TouchableOpacity onPress={props.onPress}>
        <ThemedText style={styles.text}>{props.title}</ThemedText>
      </TouchableOpacity>
    </Neumorphism>
  )
}

const styles = EStyleSheet.create({
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: '$borderRadii.large',
    height: scaleSize(64),
    padding: scaleSize(10),
    marginBottom: '$margins.medium',
    justifyContent: 'center',
    backgroundColor: '$colors.background'
  },
  text: {
    height: '100%',
    width: '100%'
  }
})
