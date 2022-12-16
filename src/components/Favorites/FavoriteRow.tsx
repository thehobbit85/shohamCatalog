import Animated, { SlideOutRight } from 'react-native-reanimated'

import EStyleSheet from 'react-native-extended-stylesheet'
import { Neumorphism } from '../common/Neumorphism'
import React from 'react'
import { ThemedText } from '../common/ThemedText'
import { TrashButton } from '../buttons/TrashButton'
import { View } from 'react-native'
import shallow from 'zustand/shallow'
import { useHandler } from '../../hooks/useHandler'
import { useStore } from '../../state/useStore'

interface FavoriteRowProps {
  name: string
  id: string
}

export const FavoriteRow = ({ name, id }: FavoriteRowProps): JSX.Element => {
  const { favorites, setFavorites } = useStore(
    useHandler((state) => ({
      favorites: state.favorites,
      setFavorites: state.setFavorites
    })),
    shallow
  )
  const plantId = `${id}-${name}`

  const handlePress = useHandler(() => {
    const newFavorites = { ...favorites }
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete newFavorites[plantId]
    setFavorites(newFavorites)
  })

  return (
    <Neumorphism>
      <Animated.View exiting={SlideOutRight.duration(250)} style={styles.row}>
        <TrashButton selected={true} onSelected={handlePress} />
        <View style={styles.nameRow}>
          <ThemedText style={styles.nameText}>{name}</ThemedText>
        </View>
      </Animated.View>
    </Neumorphism>
  )
}

const styles = EStyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: '$borderRadii.small',
    backgroundColor: '$colors.background',
    marginHorizontal: '$margins.medium',
    marginBottom: '$margins.small',
    marginTop: '$margins.medium',
    paddingVertical: '$paddings.small',
    paddingLeft: '$paddings.small'
  },
  nameRow: {
    marginHorizontal: '$margins.small'
  },
  nameText: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    fontSize: '$textSizes.h3'
  }
})
