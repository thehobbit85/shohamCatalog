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
import React, { useEffect, useMemo, useState } from 'react'

// @ts-expect-error
import CachedImage from 'react-native-expo-cached-image'
import EStyleSheet from 'react-native-extended-stylesheet'
import { ExpendButton } from '../buttons/ExpendButton'
import { Neumorphism } from '../common/Neumorphism'
import { ThemedText } from '../common/ThemedText'
import { TypeData } from '../../@types/types'
import { scaleSize } from '../../utils/utils'
import { useHandler } from '../../hooks/useHandler'
import { useStore } from '../../state/useStore'
import { useTheme } from '../../theme/theme'

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

  const { theme } = useTheme()
  const open = useSharedValue(0)
  const imageSource = useMemo(() => ({ uri: imageUri }), [imageUri])

  const translations = useStore(useHandler((state) => state.translations))

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
      marginTop: interpolateOpen(styles.itemContainer.marginTop, -64),
      marginLeft: interpolateOpen(styles.itemContainer.marginLeft, 0),
      marginRight: interpolateOpen(styles.itemContainer.marginRight, 0),
      marginBottom: interpolateOpen(styles.itemContainer.marginBottom, 0),
      height: interpolateOpen(styles.itemContainer.height, height + 74)
    }
  })

  const containerStyles = useMemo(
    () => [styles.itemContainer, containerAnimatedStyle],
    [containerAnimatedStyle]
  )

  // Type Animation
  const typeRight = width / 2.5
  const typeTop = scaleSize(80)
  const typeAnimatedStyle = useAnimatedStyle(() => ({
    marginTop: open.value * typeTop,
    right: -open.value * typeRight,
    width: `${(1 + open.value / 2) * 100}%`
  }))

  const typeStyles = useMemo(
    () => [styles.type, typeAnimatedStyle],
    [typeAnimatedStyle]
  )

  // Arrow Animation
  const arrowBottom = height - typeTop
  const arrowAnimatedStyle = useAnimatedStyle(() => ({
    marginLeft: interpolate(open.value, [0, 1], [styles.arrow.marginLeft, 8], {
      extrapolateRight: Extrapolation.CLAMP
    }),
    bottom: open.value * arrowBottom
  }))

  const arrowStyles = useMemo(
    () => [styles.arrow, arrowAnimatedStyle],
    [arrowAnimatedStyle]
  )

  // Image Animation
  const imageAnimatedStyle = useAnimatedStyle(() => ({
    bottom: withTiming(open.value > 0.95 ? -height / 4 : 0, {
      duration: 250,
      easing: Easing.out(Easing.poly(5))
    })
  }))

  const imageStyles = useMemo(
    () => [styles.imageView, imageAnimatedStyle],
    [imageAnimatedStyle]
  )

  return (
    <Neumorphism>
      <Animated.View
        entering={SlideInLeft.duration(250)}
        exiting={SlideOutLeft.duration(250)}
        style={containerStyles}
      >
        <View style={styles.column}>
          <Animated.View style={typeStyles}>
            <ThemedText style={styles.title}>
              {pressed ? `${translations[id]} - ${potType}` : translations[id]}
            </ThemedText>
          </Animated.View>

          {!pressed ? (
            <View style={styles.type}>
              <ThemedText style={styles.potType}>{potType}</ThemedText>
            </View>
          ) : null}

          <Animated.View style={arrowStyles}>
            <ExpendButton
              onPress={handlePress}
              open={pressed}
              size={theme?.$textSizes?.h2}
            />
          </Animated.View>
        </View>

        <Animated.View style={imageStyles}>
          <CachedImage
            resizeMode="contain"
            source={imageSource}
            style={styles.image}
          />
        </Animated.View>
      </Animated.View>
    </Neumorphism>
  )
}

const styles = EStyleSheet.create({
  itemContainer: {
    marginTop: '$margins.large',
    marginLeft: '-1 * $margins.xlarge',
    marginRight: '$margins.xlarge',
    marginBottom: scaleSize(14),
    height: height / 5,
    borderRadius: '$borderRadii.xlarge',
    backgroundColor: '$colors.row',
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
    top: '$paddings.xsmall',
    marginRight: scaleSize(-26)
  },
  title: {
    width: '100%'
  },
  potType: {
    marginTop: '$margins.small',
    fontSize: '$textSizes.h3'
  },
  arrow: {
    marginLeft: '$margins.xlarge',
    paddingBottom: '$paddings.medium'
  },
  imageView: {
    flex: 1
  },
  image: {
    height: height / 4,
    width: height / 3.5
  }
})
