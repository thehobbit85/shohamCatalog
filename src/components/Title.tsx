import Animated, { SlideInLeft } from 'react-native-reanimated'
import { Dimensions, Image } from 'react-native'

import EStyleSheet from 'react-native-extended-stylesheet'
import React from 'react'
import { ThemedText } from './common/ThemedText'
import { scaleText } from '../utils/utils'

const { height } = Dimensions.get('window')

export const Title = ({ title }: { title: string }): JSX.Element => {
  return (
    <Animated.View entering={SlideInLeft.duration(250)} style={styles.header}>
      <Image style={styles.logo} source={require('../../assets/flower.png')} />
      <ThemedText style={styles.title}>{title}</ThemedText>
    </Animated.View>
  )
}

const styles = EStyleSheet.create({
  header: {
    zIndex: -1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    overflow: 'visible',
    height: scaleText(72)
  },
  title: {
    flex: 1,
    height: '100%',
    fontSize: scaleText(48),
    right: scaleText(16)
  },
  logo: {
    left: scaleText(16),
    height: height / 6,
    width: height / 6
  }
})
