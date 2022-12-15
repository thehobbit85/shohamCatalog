import React, { useContext } from 'react'
import { View, StyleSheet } from 'react-native'
import { scaleText } from '../../utils/utils'
import { Neumorphism } from '../common/Neumorphism'
import { BACKGROUND_COLOR } from '../../utils/constants'
import { ThemedText } from '../common/ThemedText'
import { RemoveButton } from '../buttons/RemoveButton'
import { FavoritesContext } from '../../providers/Favorites'

interface FavoriteRowProps {
  name: string
  id: string
}

export const FavoriteRow = ({ name, id }: FavoriteRowProps): JSX.Element => {
  const [favorites, setFavorites] = useContext(FavoritesContext)
  const plantId = `${id}-${name}`

  return (
    <Neumorphism>
      <View style={styles.row}>
        <RemoveButton
          selected={true}
          onSelected={() => {
            const newFavorites = { ...favorites }
            // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
            delete newFavorites[plantId]
            setFavorites(newFavorites)
          }}
        />
        <View style={styles.nameRow}>
          <ThemedText style={styles.nameText}>{name}</ThemedText>
        </View>
      </View>
    </Neumorphism>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: scaleText(10),
    backgroundColor: BACKGROUND_COLOR,
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
