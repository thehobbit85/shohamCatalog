import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, Dimensions, View, TouchableOpacity } from 'react-native'
import { scaleText } from '../../utils/utils'

import { BACKGROUND_COLOR } from '../../utils/constants'
import Animated, {
  SlideInRight,
  SlideOutRight,
  useSharedValue,
  Easing,
  withTiming,
  useAnimatedStyle,
  interpolate,
  Extrapolation
} from 'react-native-reanimated'
import { Neumorphism } from '../Neumorphism'
import { AntDesign } from '@expo/vector-icons'
import { useHandler } from '../../hooks/useHandler'
import { FavoritesList } from './FavoritesList'
import { ThemedText } from '../ThemedText'
import { ExpendIcon } from '../Types/ExpendIcon'
import { FavoritesFooter } from './FavoritesFooter'
import { FavoritesContext } from '../../context'

const { width, height } = Dimensions.get('window')

export const Favorites = ({
  onSelected
}: {
  onSelected?: Function
}): JSX.Element => {
  const [open, setOpen] = useState(false)
  const openState = useSharedValue(0)
  const [favorites] = useContext(FavoritesContext)
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

  const heartMargin = scaleText(12)
  const heartAnimatedStyle = useAnimatedStyle(() => ({
    marginBottom: openState.value * heartMargin,
    paddingLeft: (1 - openState.value) * heartMargin
  }))

  const titleMargin = scaleText(12)
  const titleAnimatedStyle = useAnimatedStyle(() => ({
    marginRight: openState.value * titleMargin,
    marginLeft: (1 - openState.value) * titleMargin * 2
  }))

  return (
    <Neumorphism>
      <Animated.View
        style={[styles.itemContainer, containerAnimatedStyle]}
        entering={SlideInRight.delay(250).duration(250)}
        exiting={SlideOutRight.duration(250)}
      >
        <Animated.View style={[styles.titleRow, heartAnimatedStyle]}>
          {open ? (
            <ExpendIcon onPress={handlePress} open={true} initAngle={1} />
          ) : (
            <TouchableOpacity onPress={handlePress}>
              <AntDesign name="heart" size={scaleText(36)} color={iconColor} />
            </TouchableOpacity>
          )}

          <Animated.View style={[styles.title, titleAnimatedStyle]}>
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

const styles = StyleSheet.create({
  itemContainer: {
    alignSelf: 'flex-end',
    marginRight: scaleText(-56),
    marginTop: scaleText(8),
    marginBottom: scaleText(16),
    borderRadius: 16,
    backgroundColor: BACKGROUND_COLOR,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: scaleText(56 * 2),
    height: scaleText(56)
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: scaleText(12),
    height: scaleText(56)
  },
  title: {
    marginRight: scaleText(16),
    paddingTop: scaleText(4)
  },
  titleText: {
    width: '100%',
    height: '100%',
    textAlign: 'right',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  }
})
