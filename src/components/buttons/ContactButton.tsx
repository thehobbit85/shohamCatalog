import { Dimensions, View } from 'react-native'

import EStyleSheet from 'react-native-extended-stylesheet'
import { NeuButton } from './NeuButton'
import React from 'react'
import { scaleSize } from '../../utils/utils'
import { useHandler } from '../../hooks/useHandler'

const { height } = Dimensions.get('window')

export const ContactButton = (): JSX.Element => {
  const handlePress = useHandler(() => {
    console.log('hey')
  })

  return (
    <View style={styles.contactButton}>
      <NeuButton
        onPress={handlePress}
        title={'צור קשר'}
        style={styles.contactButtonInner}
      />
    </View>
  )
}

const styles = EStyleSheet.create({
  contactButton: {
    height: scaleSize(80),
    zIndex: 4,
    position: 'absolute',
    top: height - scaleSize(82),
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  contactButtonInner: {
    borderRadius: '$borderRadii.large',
    height: '95%'
  }
})
