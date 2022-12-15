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
import { ThemedText } from '../common/ThemedText'
import { Neumorphism } from '../common/Neumorphism'
import { BACKGROUND_COLOR } from '../../utils/constants'
import { Translations, TypeData } from '../../types'
import { useHandler } from '../../hooks/useHandler'
import { ExpendButton } from '../buttons/ExpendButton'
import { TranslationContext } from '../../providers/Translations'

const { height, width } = Dimensions.get('window')

interface TypeRowProps extends TypeData {
  onOpened?: (type: string) => void
  onClosed?: (type: string) => void
}

export const TypeRow = ({
  id,
  potType,
  imageUri,
  onOpened,
  onClosed
}: TypeRowProps): JSX.Element => {
  const [pressed, setPressed] = useState(false)
  const open = useSharedValue(0)
  const translations = useContext<Translations>(TranslationContext)

  const handlePress = useHandler(() => {
    if (onClosed != null && open.value === 1) onClosed(id)
    if (onOpened != null && open.value === 0) onOpened(id)
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

  // Title Animation
  const typeRight = width / 2.5
  const typeTop = scaleText(64)
  const typeAnimatedStyle = useAnimatedStyle(() => ({
    marginTop: open.value * typeTop,
    right: -open.value * typeRight,
    width: `${(1 + open.value / 2) * 100}%`
  }))

  // Arrow Animation
  const arrowBottom = height - typeTop
  const arrowAnimatedStyle = useAnimatedStyle(() => ({
    marginLeft: interpolate(open.value, [0, 1], [styles.arrow.marginLeft, 8], {
      extrapolateRight: Extrapolation.CLAMP
    }),
    bottom: open.value * arrowBottom
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
        entering={SlideInLeft.duration(250)}
        exiting={SlideOutLeft.duration(250)}
        style={[styles.container, containerAnimatedStyle]}
      >
        <View style={styles.column}>
          <Animated.View style={[styles.type, typeAnimatedStyle]}>
            {pressed ? (
              <ThemedText
                style={styles.title}
              >{`${translations[id]} - ${potType}`}</ThemedText>
            ) : (
              <ThemedText>{translations[id]}</ThemedText>
            )}
          </Animated.View>

          {!pressed ? (
            <View style={styles.type}>
              <ThemedText style={styles.potType}>{potType}</ThemedText>
            </View>
          ) : null}

          <Animated.View style={[styles.arrow, arrowAnimatedStyle]}>
            <ExpendButton
              onPress={handlePress}
              open={pressed}
              size={scaleText(36)}
            />
          </Animated.View>
        </View>

        <Animated.View style={[styles.imageView, imageAnimatedStyle]}>
          <CachedImage
            resizeMode="contain"
            source={{ uri: imageUri }}
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
  type: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    top: scaleText(4),
    marginRight: scaleText(-26)
  },
  title: {
    textAlign: 'right',
    width: '100%'
  },
  potType: {
    fontSize: scaleText(24)
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
