import { ThemedText } from '../common/ThemedText'
import { useHandler } from '../../hooks/useHandler'
import {
  PHONE_NUMBER,
  EMAIL_ADDRESS,
  BACKGROUND_COLOR
} from '../../utils/constants'
import React from 'react'
import { Linking, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import { Neumorphism } from '../common/Neumorphism'

import Animated, { SlideInDown } from 'react-native-reanimated'
import { scaleText } from '../../utils/utils'
const { height } = Dimensions.get('window')

export const FavoritesFooter = (): JSX.Element => {
  const callPhoneNumber = useHandler(() => {
    Linking.openURL(`tel:${PHONE_NUMBER}`).catch((error) => console.log(error))
  })
  const sendEmail = useHandler(() => {
    Linking.openURL(`mailto:${EMAIL_ADDRESS}`).catch((error) =>
      console.log(error)
    )
  })

  return (
    <Neumorphism>
      <Animated.View
        style={styles.footer}
        entering={SlideInDown.delay(250).duration(250)}
      >
        <Neumorphism style={{ ...styles.button, ...styles.leftButton }}>
          <TouchableOpacity onPress={sendEmail}>
            <ThemedText style={styles.text}>{'שלח מייל'}</ThemedText>
          </TouchableOpacity>
        </Neumorphism>
        <Neumorphism style={{ ...styles.button, ...styles.rightButton }}>
          <TouchableOpacity onPress={callPhoneNumber}>
            <ThemedText style={styles.text}>{'התקשר'}</ThemedText>
          </TouchableOpacity>
        </Neumorphism>
      </Animated.View>
    </Neumorphism>
  )
}

const styles = StyleSheet.create({
  footer: {
    borderRadius: scaleText(16),
    backgroundColor: BACKGROUND_COLOR,
    position: 'absolute',
    bottom: height / 6,
    width: '100%',
    height: height / 7,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: scaleText(16),
    height: scaleText(64),
    padding: scaleText(10),
    marginBottom: scaleText(16),
    justifyContent: 'center',
    backgroundColor: BACKGROUND_COLOR
  },
  leftButton: { marginLeft: scaleText(16), marginRight: scaleText(8) },
  rightButton: { marginLeft: scaleText(8), marginRight: scaleText(16) },
  text: {
    height: '100%',
    width: '100%'
  }
})
