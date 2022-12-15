import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { BACKGROUND_COLOR } from '../../utils/constants'
import { scaleText } from '../../utils/utils'

interface TrashButtonProps {
  onSelected: (select: boolean) => void
  selected?: boolean
}

export const TrashButton = ({
  onSelected,
  selected = false
}: TrashButtonProps): JSX.Element => {
  const [isSelected, setIsSelected] = useState(selected)

  return (
    <View style={styles.button}>
      <TouchableOpacity
        onPress={() => {
          const newSelection = !isSelected
          setIsSelected(newSelection)
          if (onSelected != null) onSelected(newSelection)
        }}
      >
        <MaterialIcons name="delete" size={48} color="red" />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: BACKGROUND_COLOR,
    borderRadius: scaleText(12),
    alignItems: 'center',
    marginLeft: scaleText(4),
    justifyContent: 'center'
  }
})
