import { Dimensions, View } from 'react-native'

import EStyleSheet from 'react-native-extended-stylesheet'
import { NeuButton } from './NeuButton'
import React from 'react'
import { scaleText } from '../../utils/utils'

const { height } = Dimensions.get('window')

export const Contact = (): JSX.Element => {
  return (
    <View style={styles.contactButton}>
      <NeuButton
        onPress={() => {
          console.log('hey')
        }}
        title={'צור קשר'}
        style={styles.contactButtonInner}
      />
    </View>
  )
}

const styles = EStyleSheet.create({
  contactButton: {
    height: scaleText(80),
    zIndex: 4,
    position: 'absolute',
    top: height - scaleText(82),
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  contactButtonInner: {
    borderRadius: scaleText(8),
    height: '95%'
  }
})
