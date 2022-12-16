import React, { useState } from 'react'
import { TouchableOpacity, View } from 'react-native'

import EStyleSheet from 'react-native-extended-stylesheet'
import { MaterialIcons } from '@expo/vector-icons'
import { scaleText } from '../../utils/utils'
import { useHandler } from '../../hooks/useHandler'

interface TrashButtonProps {
  onSelected: (select: boolean) => void
  selected?: boolean
}

export const TrashButton = ({
  onSelected,
  selected = false
}: TrashButtonProps): JSX.Element => {
  const [isSelected, setIsSelected] = useState(selected)

  const handlePress = useHandler(() => {
    const newSelection = !isSelected
    setIsSelected(newSelection)
    if (onSelected != null) onSelected(newSelection)
  })

  return (
    <View style={styles.button}>
      <TouchableOpacity onPress={handlePress}>
        <MaterialIcons name="delete" size={48} color="red" />
      </TouchableOpacity>
    </View>
  )
}

const styles = EStyleSheet.create({
  button: {
    backgroundColor: '$backgroundColor',
    borderRadius: scaleText(12),
    alignItems: 'center',
    marginLeft: scaleText(4),
    justifyContent: 'center'
  }
})
