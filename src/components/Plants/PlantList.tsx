import React, { useContext } from 'react'
import { FlatList, StyleSheet } from 'react-native'

import { scaleText } from '../../utils/utils'

import { PlantRow } from './PlantRow'
import Animated, { SlideInDown } from 'react-native-reanimated'
import { PlantsData } from '../../types'
import { PlantsContext } from '../../providers/Plants'

interface PlantListProps {
  type: string
}

export const PlantList = ({ type }: PlantListProps): JSX.Element => {
  const plants = useContext<PlantsData>(PlantsContext)
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

const styles = StyleSheet.create({
  row: {
    width: '100%',
    paddingTop: scaleText(4)
  }
})
