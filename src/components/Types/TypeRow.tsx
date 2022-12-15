import React, { useState, useEffect, useContext, useMemo } from 'react'
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

  // Arrow Animation
  const arrowBottom = height - scaleText(60)
  const arrowAnimatedStyle = useAnimatedStyle(() => ({
    paddingLeft: interpolate(
      open.value,
      [0, 1],
      [styles.arrow.paddingLeft, 8],
      {
        extrapolateRight: Extrapolation.CLAMP
      }
    ),
    bottom: open.value * arrowBottom
  }))

  // Type Animation
  const typeRight = width / 2.5
  const typeBottom = height - scaleText(142)
  const typeAnimatedStyle = useAnimatedStyle(() => ({
    right: -open.value * typeRight,
    bottom: open.value * typeBottom
  }))

  // PotType Animation
  const potRight = width / 5
  const potBottom = height - scaleText(142)
  const potTypeAnimatedStyle = useAnimatedStyle(() => ({
    right: -open.value * potRight,
    bottom: open.value * potBottom
  }))

  // Image Animation
  const imageAnimatedStyle = useAnimatedStyle(() => ({
    bottom: withTiming(open.value > 0.95 ? -height / 4 : 0, {
      duration: 250,
      easing: Easing.out(Easing.poly(5))
    })
  }))

  const dataStyle = useMemo(
    () => (pressed ? styles.dataOpen : styles.dataClose),
    [pressed]
  )

  return (
    <Neumorphism>
      <Animated.View
        entering={SlideInLeft.duration(250)}
        exiting={SlideOutLeft.duration(250)}
        style={[styles.container, containerAnimatedStyle]}
      >
        <View style={dataStyle}>
          <Animated.View style={[styles.type, typeAnimatedStyle]}>
            <ThemedText>{translations[id]}</ThemedText>
          </Animated.View>

          <Animated.View style={[styles.type, potTypeAnimatedStyle]}>
            <ThemedText style={styles.potType}>{potType}</ThemedText>
          </Animated.View>

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
  // Data/Text Styles
  dataClose: {
    borderColor: 'white',
    borderWidth: 3,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  dataOpen: {
    borderColor: 'black',
    borderWidth: 3,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  type: {
    alignSelf: 'flex-end',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: scaleText(-26)
  },
  potType: {
    fontSize: scaleText(24)
  },
  arrow: {
    width: '100%',
    paddingTop: scaleText(8),
    paddingLeft: scaleText(26),
    paddingBottom: scaleText(16)
  },
  // Image Styles
  imageView: {
    flex: 1
  },
  image: {
    height: height / 4,
    width: height / 3.5
  }
})
