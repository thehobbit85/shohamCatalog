import React, { useState, useEffect, useContext } from 'react'
// @ts-expect-error
import CachedImage from 'react-native-expo-cached-image'
import { View, StyleSheet, Dimensions } from 'react-native'
import { scaleText } from '../../utils/utils'

import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  Extrapolation,
  SlideInLeft,
  SlideOutLeft
} from 'react-native-reanimated'
import { ThemedText } from '../ThemedText'
import { Neumorphism } from '../Neumorphism'
import { GOOGLE_DRIVE_URI, BACKGROUND_COLOR } from '../../utils/constants'
import { Translations, TypeData } from '../../types'
import { useHandler } from '../../hooks/useHandler'
import { ExpendIcon } from './ExpendIcon'
import { TranslationContext } from '../../context'

const { height, width } = Dimensions.get('window')

interface TypeRowProps extends TypeData {
  onOpened?: (type: string) => void
  onClosed?: (type: string) => void
}

export const TypeRow = ({
  type,
  imageId,
  onOpened,
  onClosed
}: TypeRowProps): JSX.Element => {
  const [pressed, setPressed] = useState(false)
  const open = useSharedValue(0)
  const translations = useContext<Translations>(TranslationContext)

  const handlePress = useHandler(() => {
    if (onClosed != null && open.value === 1) onClosed(type)
    if (onOpened != null && open.value === 0) onOpened(type)
    setPressed(!pressed)
  })

  useEffect(() => {
    open.value = withTiming(pressed ? 1 : 0, {
      duration: 250,
      easing: Easing.out(Easing.cubic)
    })
  }, [open, pressed])

  /// /////////////////////////////////////////
  /// ///////////// Animations ////////////////
  /// /////////////////////////////////////////

  // Container Animation
  const containerAnimatedStyle = useAnimatedStyle(() => {
    const interpolateOpen = (start: number, end: number): number =>
      interpolate(open.value, [0, 1], [start, end], {
        extrapolateRight: Extrapolation.CLAMP
      })

    return {
      marginTop: interpolateOpen(styles.container.marginTop, -64),
      marginLeft: interpolateOpen(styles.container.marginLeft, 0),
      marginRight: interpolateOpen(styles.container.marginRight, 0),
      marginBottom: interpolateOpen(styles.container.marginBottom, 0),
      height: interpolateOpen(styles.container.height, height + 74)
    }
  })

  // Arrow Animation
  const arrowTop = height - scaleText(60)
  const arrowAnimatedStyle = useAnimatedStyle(() => ({
    marginLeft: interpolate(open.value, [0, 1], [styles.arrow.marginLeft, 8], {
      extrapolateRight: Extrapolation.CLAMP
    }),
    bottom: open.value * arrowTop
  }))

  // Title Animation
  const titleRight = width / 2.5
  const titleAnimatedStyle = useAnimatedStyle(() => ({
    marginTop: open.value * 62,
    right: -open.value * titleRight
  }))

  // Image Animation
  const imageAnimatedStyle = useAnimatedStyle(() => ({
    bottom: withTiming(open.value > 0.95 ? -height / 4 : 0, {
      duration: 250,
      easing: Easing.out(Easing.poly(5))
    })
  }))

  return (
    <Neumorphism>
      <Animated.View
        entering={SlideInLeft.delay(250).duration(250)}
        exiting={SlideOutLeft.duration(250)}
        style={[styles.container, containerAnimatedStyle]}
      >
        <View style={styles.column}>
          <Animated.View style={[styles.title, titleAnimatedStyle]}>
            <ThemedText>{translations[type]}</ThemedText>
          </Animated.View>

          <Animated.View style={[styles.arrow, arrowAnimatedStyle]}>
            <ExpendIcon
              onPress={handlePress}
              open={pressed}
              size={scaleText(36)}
            />
          </Animated.View>
        </View>

        <Animated.View style={[styles.imageView, imageAnimatedStyle]}>
          <CachedImage
            resizeMode="contain"
            source={{ uri: `${GOOGLE_DRIVE_URI}${imageId}` }}
            style={styles.image}
          />
        </Animated.View>
      </Animated.View>
    </Neumorphism>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: scaleText(24),
    marginLeft: scaleText(-36),
    marginRight: scaleText(36),
    marginBottom: scaleText(14),
    height: height / 5,
    borderRadius: 24,
    backgroundColor: BACKGROUND_COLOR,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  column: {
    height: '100%',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  title: {
    alignSelf: 'flex-end',
    top: scaleText(8),
    marginRight: scaleText(-24)
  },
  arrow: {
    marginLeft: scaleText(36),
    paddingBottom: scaleText(16)
  },
  imageView: {
    flex: 1
  },
  image: {
    height: height / 4,
    width: height / 3.5
  }
})
