import Animated, {
  Easing,
  Extrapolation,
  SlideInLeft,
  SlideOutLeft,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated'
import { Dimensions, View } from 'react-native'
import React, { useEffect, useState } from 'react'

// @ts-expect-error
import CachedImage from 'react-native-expo-cached-image'
import EStyleSheet from 'react-native-extended-stylesheet'
import { ExpendButton } from '../buttons/ExpendButton'
import { Neumorphism } from '../common/Neumorphism'
import { ThemedText } from '../common/ThemedText'
import { TypeData } from '../../@types/types'
import { scaleText } from '../../utils/utils'
import { useHandler } from '../../hooks/useHandler'
import { useStore } from '../../state/useStore'

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

  const translations = useStore((state) => state.translations)

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
  const typeTop = scaleText(80)
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
            <ThemedText style={styles.title}>
              {pressed ? `${translations[id]} - ${potType}` : translations[id]}
            </ThemedText>
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

const styles = EStyleSheet.create({
  container: {
    marginTop: scaleText(24),
    marginLeft: scaleText(-36),
    marginRight: scaleText(36),
    marginBottom: scaleText(14),
    height: height / 5,
    borderRadius: 24,
    backgroundColor: '$backgroundColor',
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
    marginTop: scaleText(8),
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
