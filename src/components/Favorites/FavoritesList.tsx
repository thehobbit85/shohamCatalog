import { FlatList, View } from 'react-native'
import React, { useContext } from 'react'

import EStyleSheet from 'react-native-extended-stylesheet'
import { FavoriteRow } from './FavoriteRow'
import { FavoritesContext } from '../../providers/Favorites'
import { scaleText } from '../../utils/utils'

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

const styles = EStyleSheet.create({
  list: {
    height: '100%',
    flexDirection: 'column',
    marginTop: scaleText(4)
  }
})
