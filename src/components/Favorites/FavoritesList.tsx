import { FlatList, View } from 'react-native'
import React, { useMemo } from 'react'

import EStyleSheet from 'react-native-extended-stylesheet'
import { FavoriteRow } from './FavoriteRow'
import { PlantData } from '../../@types/types'
import { useHandler } from '../../hooks/useHandler'
import { useStore } from '../../state/useStore'

export const FavoritesList = (): JSX.Element => {
  const favorites = useStore(useHandler((state) => state.favorites))
  const data = useMemo(() => Object.values(favorites), [favorites])
  const keyExtractor = useHandler((_: any, index: number) => `${index}`)
  const renderItem = useHandler(({ item }: { item: PlantData }) => (
    <FavoriteRow id={item.id} name={item.name} />
  ))

  return (
    <View style={styles.list}>
      <FlatList
        data={data}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      />
    </View>
  )
}

const styles = EStyleSheet.create({
  list: {
    height: '100%',
    flexDirection: 'column',
    marginTop: '$margins.xsmall'
  }
})
