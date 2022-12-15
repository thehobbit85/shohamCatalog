import React, { useContext } from 'react'
import { View, FlatList, StyleSheet } from 'react-native'
import { scaleText } from '../../utils/utils'
import { FavoriteRow } from './FavoriteRow'
import { FavoritesContext } from '../../providers/Favorites'

export const FavoritesList = (): JSX.Element => {
  const [favorites] = useContext(FavoritesContext)
  const data = Object.values(favorites)

  return (
    <View style={styles.list}>
      <FlatList
        data={data}
        keyExtractor={(_, index) => `${index}`}
        renderItem={({ item }) => <FavoriteRow id={item.id} name={item.name} />}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  list: {
    height: '100%',
    flexDirection: 'column',
    marginTop: scaleText(4)
  }
})
