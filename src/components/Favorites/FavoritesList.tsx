import { FlatList, View } from 'react-native'

import EStyleSheet from 'react-native-extended-stylesheet'
import { FavoriteRow } from './FavoriteRow'
import React from 'react'
import { scaleText } from '../../utils/utils'
import { useStore } from '../../state/useStore'

export const FavoritesList = (): JSX.Element => {
  const favorites = useStore((state) => state.favorites)

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
