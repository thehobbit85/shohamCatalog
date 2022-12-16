import Animated, { SlideInDown } from 'react-native-reanimated'

import EStyleSheet from 'react-native-extended-stylesheet'
import { FlatList } from 'react-native'
import { PlantRow } from './PlantRow'
import React from 'react'
import { scaleText } from '../../utils/utils'
import { useStore } from '../../state/useStore'

interface PlantListProps {
  type: string
}

export const PlantList = ({ type }: PlantListProps): JSX.Element => {
  const plants = useStore((state) => state.plants)
  const data = (plants ?? [])[type]

  return (
    <Animated.View
      style={styles.row}
      entering={SlideInDown.delay(250).duration(250)}
    >
      <FlatList
        data={data}
        keyExtractor={(_, index) => `${index}`}
        renderItem={({ item }) => <PlantRow data={{ ...item }} />}
      />
    </Animated.View>
  )
}

const styles = EStyleSheet.create({
  row: {
    width: '100%',
    paddingTop: scaleText(4)
  }
})
