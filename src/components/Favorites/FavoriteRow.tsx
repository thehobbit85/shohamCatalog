import EStyleSheet from 'react-native-extended-stylesheet'
import { Neumorphism } from '../common/Neumorphism'
import React from 'react'
import { ThemedText } from '../common/ThemedText'
import { TrashButton } from '../buttons/TrashButton'
import { View } from 'react-native'
import { scaleText } from '../../utils/utils'
import shallow from 'zustand/shallow'
import { useHandler } from '../../hooks/useHandler'
import { useStore } from '../../state/useStore'

interface FavoriteRowProps {
  name: string
  id: string
}

export const FavoriteRow = ({ name, id }: FavoriteRowProps): JSX.Element => {
  const { favorites, setFavorites } = useStore(
    (state) => ({
      favorites: state.favorites,
      setFavorites: state.setFavorites
    }),
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
      <View style={styles.row}>
        <TrashButton selected={true} onSelected={handlePress} />
        <View style={styles.nameRow}>
          <ThemedText style={styles.nameText}>{name}</ThemedText>
        </View>
      </View>
    </Neumorphism>
  )
}

const styles = EStyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: scaleText(10),
    backgroundColor: '$backgroundColor',
    marginHorizontal: scaleText(16),
    paddingVertical: scaleText(8),
    marginBottom: scaleText(8),
    marginTop: scaleText(16),
    paddingLeft: scaleText(8)
  },
  nameRow: {
    marginHorizontal: scaleText(8)
  },
  nameText: {
    width: '100%',
    textAlign: 'right',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    fontSize: scaleText(24)
  }
})
