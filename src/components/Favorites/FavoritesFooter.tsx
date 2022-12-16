import Animated, { SlideInDown, SlideOutDown } from 'react-native-reanimated'
import { Dimensions, Linking } from 'react-native'
import { EMAIL_ADDRESS, PHONE_NUMBER } from '../../theme/constants'

import EStyleSheet from 'react-native-extended-stylesheet'
import { NeuButton } from '../buttons/NeuButton'
import { Neumorphism } from '../common/Neumorphism'
import React from 'react'
import { useHandler } from '../../hooks/useHandler'

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
        exiting={SlideOutDown.duration(250)}
      >
        <NeuButton
          style={styles.leftButton}
          onPress={sendEmail}
          title={'שלח מייל'}
        />
        <NeuButton
          style={styles.rightButton}
          onPress={callPhoneNumber}
          title={'התקשר'}
        />
      </Animated.View>
    </Neumorphism>
  )
}

const styles = EStyleSheet.create({
  footer: {
    borderRadius: '$borderRadii.large',
    backgroundColor: '$colors.background',
    position: 'absolute',
    bottom: height / 6,
    width: '100%',
    height: height / 7,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  leftButton: { marginLeft: '$margins.medium', marginRight: '$margins.small' },
  rightButton: { marginLeft: '$margins.small', marginRight: '$margins.medium' },
  text: {
    height: '100%',
    width: '100%'
  }
})
