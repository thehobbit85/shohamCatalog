import EStyleSheet from 'react-native-extended-stylesheet'
import { Neumorphism } from '../common/Neumorphism'
import React from 'react'
import { ThemedText } from '../common/ThemedText'
import { TouchableOpacity } from 'react-native'
import { scaleText } from '../../utils/utils'

interface NeuButtonProps {
  title: string
  onPress: () => void
  style?: object
}

export const NeuButton = (props: NeuButtonProps): JSX.Element => {
  return (
    <Neumorphism style={{ ...styles.button, ...props?.style }}>
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
    borderRadius: scaleText(16),
    height: scaleText(64),
    padding: scaleText(10),
    marginBottom: scaleText(16),
    justifyContent: 'center',
    backgroundColor: '$backgroundColor'
  },
  text: {
    height: '100%',
    width: '100%'
  }
})
