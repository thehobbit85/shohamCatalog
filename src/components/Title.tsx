import Animated, { SlideInLeft } from 'react-native-reanimated'
import { Dimensions, Image } from 'react-native'
import React, { useMemo } from 'react'

import EStyleSheet from 'react-native-extended-stylesheet'
import { ThemedText } from './common/ThemedText'
import { scaleSize } from '../utils/utils'

const { height } = Dimensions.get('window')

export const Title = ({ title }: { title: string }): JSX.Element => {
  const imageSource = useMemo(
    () => require('../../assets/images/flower.png'),
    []
  )

  return (
    <Animated.View entering={SlideInLeft.duration(250)} style={styles.header}>
      <Image style={styles.logo} source={imageSource} />
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
    height: scaleSize(72),
    marginBottom: '$margins.small'
  },
  title: {
    flex: 1,
    height: '100%',
    fontSize: '$textSizes.h1',
    right: '$paddings.medium'
  },
  logo: {
    left: '$paddings.medium',
    height: height / 6,
    width: height / 6
  }
})
