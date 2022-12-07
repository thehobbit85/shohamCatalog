import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { BACKGROUND_COLOR } from '../../utils/constants'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { scaleText } from '../../utils/utils'

interface AddToCartButtonProps {
  onSelected: (select: boolean) => void
  selected?: boolean
}

export const RemoveButton = ({
  onSelected,
  selected = false
}: AddToCartButtonProps): JSX.Element => {
  const [isSelected, setIsSelected] = useState(selected)

  return (
    <TouchableWithoutFeedback
      style={styles.button}
      onPress={() => {
        const newSelection = !isSelected
        setIsSelected(newSelection)
        if (onSelected != null) onSelected(newSelection)
      }}
    >
      <MaterialIcons name="delete" size={48} color="red" />
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: BACKGROUND_COLOR,
    borderRadius: scaleText(12),
    alignItems: 'center',
    width: '100%',
    marginLeft: scaleText(4),
    justifyContent: 'center'
  }
})
