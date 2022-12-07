import React from 'react'
import { StyleSheet, Dimensions, Image } from 'react-native'

import { scaleText } from '../utils/utils'
import { BRAND_NAME } from '../utils/constants'
import { ThemedText } from './ThemedText'

import Animated, { SlideInLeft } from 'react-native-reanimated'

const { height, width } = Dimensions.get('window')

export const Title = (): JSX.Element => {
  return (
    <Animated.View entering={SlideInLeft.duration(250)} style={styles.header}>
      <Image style={styles.logo} source={require('../../assets/flower.png')} />
      <ThemedText style={styles.title}>{BRAND_NAME}</ThemedText>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  header: {
    zIndex: -1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    overflow: 'visible',
    height: scaleText(72)
  },
  title: {
    marginTop: scaleText(8),
    fontSize: scaleText(48),
    marginBottom: scaleText(8),
    alignSelf: 'flex-end'
  },
  logo: {
    alignSelf: 'flex-end',
    marginRight: -width / 16,
    height: height / 6,
    width: height / 6,
    bottom: 0,
    left: 0
  }
})
