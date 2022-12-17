import Animated, {
  Easing,
  Extrapolation,
  SlideInRight,
  SlideOutRight,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated'
import { Dimensions, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'

import { AntDesign } from '@expo/vector-icons'
import EStyleSheet from 'react-native-extended-stylesheet'
import { ExpendButton } from '../buttons/ExpendButton'
import { FavoritesFooter } from './FavoritesFooter'
import { FavoritesList } from './FavoritesList'
import { Neumorphism } from '../common/Neumorphism'
import { ThemedText } from '../common/ThemedText'
import { scaleSize } from '../../utils/utils'
import { useHandler } from '../../hooks/useHandler'
import { useStore } from '../../state/useStore'
import { useTheme } from '../../theme/theme'

const { width, height } = Dimensions.get('window')

export const FavoritesButton = ({
  onSelected
}: {
  onSelected?: Function
}): JSX.Element => {
  const [open, setOpen] = useState(false)

  const { theme } = useTheme()

  const openState = useSharedValue(0)
  const favorites = useStore(useHandler((state) => state.favorites))
  const iconColor = Object.keys(favorites).length > 0 ? 'red' : 'white'

  const handlePress = useHandler(() => {
    setOpen(!open)
    if (onSelected != null) onSelected(!open)
  })

  useEffect(() => {
    openState.value = withTiming(open ? 1 : 0, {
      duration: 250,
      easing: Easing.out(Easing.cubic)
    })
  }, [open, openState])
  /// /////////////////////////////////////////
  /// ///////////// Animations ////////////////
  /// /////////////////////////////////////////

  // Container Animation
  const containerAnimatedStyle = useAnimatedStyle(() => {
    const interpolateOpen = (start: number, end: number): number =>
      interpolate(openState.value, [0, 1], [start, end], {
        extrapolateRight: Extrapolation.CLAMP
      })

    return {
      marginRight: interpolateOpen(styles.itemContainer.marginRight, 0),
      marginTop: interpolateOpen(styles.itemContainer.marginTop, -58),
      paddingTop: interpolateOpen(0, 58),
      height: interpolateOpen(styles.itemContainer.height, height + 74),
      width: interpolateOpen(styles.itemContainer.width, width)
    }
  })

  const containerStyles = useMemo(
    () => [styles.itemContainer, containerAnimatedStyle],
    [containerAnimatedStyle]
  )

  const heartMargin = scaleSize(12)
  const heartAnimatedStyle = useAnimatedStyle(() => ({
    marginBottom: openState.value * heartMargin,
    paddingLeft: (1 - openState.value) * heartMargin
  }))

  const heartStyles = useMemo(
    () => [styles.titleRow, heartAnimatedStyle],
    [heartAnimatedStyle]
  )

  const titleMargin = scaleSize(12)
  const titleAnimatedStyle = useAnimatedStyle(() => ({
    marginRight: openState.value * titleMargin,
    marginLeft: (1 - openState.value) * titleMargin * 2
  }))

  const titleStyles = useMemo(
    () => [styles.title, titleAnimatedStyle],
    [titleAnimatedStyle]
  )

  return (
    <Neumorphism>
      <Animated.View
        style={containerStyles}
        entering={SlideInRight.delay(250).duration(250)}
        exiting={SlideOutRight.duration(250)}
      >
        <Animated.View style={heartStyles}>
          {open ? (
            <ExpendButton onPress={handlePress} open={true} initAngle={1} />
          ) : (
            <TouchableOpacity onPress={handlePress}>
              <AntDesign
                name="heart"
                size={theme?.$textSizes?.h2}
                color={iconColor}
              />
            </TouchableOpacity>
          )}

          <Animated.View style={titleStyles}>
            <ThemedText style={styles.titleText}>{'רשימת מועדפים'}</ThemedText>
          </Animated.View>
        </Animated.View>
        {open ? (
          <View>
            <FavoritesList />
            <FavoritesFooter />
          </View>
        ) : null}
      </Animated.View>
    </Neumorphism>
  )
}

const styles = EStyleSheet.create({
  itemContainer: {
    alignSelf: 'flex-end',
    marginRight: '-1 * $margins.xxlarge',
    marginTop: '$margins.small',
    marginBottom: '$margins.medium',
    borderRadius: '$borderRadii.large',
    backgroundColor: '$colors.button',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: scaleSize(56) * 2,
    height: scaleSize(56)
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: scaleSize(12),
    height: scaleSize(56)
  },
  title: {
    marginRight: '$margins.medium',
    paddingTop: '$paddings.xsmall'
  },
  titleText: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  }
})
