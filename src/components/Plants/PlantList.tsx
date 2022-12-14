import Animated, { SlideInDown } from 'react-native-reanimated'

import EStyleSheet from 'react-native-extended-stylesheet'
import { FlatList } from 'react-native'
import { PlantData } from '../../@types/types'
import { PlantRow } from './PlantRow'
import React from 'react'
import { useHandler } from '../../hooks/useHandler'
import { useStore } from '../../state/useStore'

interface PlantListProps {
  type: string
}

export const PlantList = ({ type }: PlantListProps): JSX.Element => {
  const plants = useStore(useHandler((state) => state.plants))
  const data = (plants ?? [])[type]
  const keyExtractor = useHandler((_: any, index: number) => `${index}`)
  const renderItem = useHandler(({ item }: { item: PlantData }) => (
    <PlantRow data={{ ...item }} />
  ))

  return (
    <Animated.View
      style={styles.row}
      entering={SlideInDown.delay(250).duration(250)}
    >
      <FlatList
        data={data}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      />
    </Animated.View>
  )
}

const styles = EStyleSheet.create({
  row: {
    width: '100%',
    paddingTop: '$paddings.xsmall'
  }
})
