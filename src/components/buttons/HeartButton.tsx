import React, { useState } from 'react'

import { AntDesign } from '@expo/vector-icons'
import EStyleSheet from 'react-native-extended-stylesheet'
import { Neumorphism } from '../common/Neumorphism'
import { TouchableOpacity } from 'react-native'
import { scaleSize } from '../../utils/utils'
import { useHandler } from '../../hooks/useHandler'

interface HeartButtonProps {
  onSelected: (isSelected: boolean) => void
  selected?: boolean
}

export const HeartButton = ({
  onSelected,
  selected = false
}: HeartButtonProps): JSX.Element => {
  const [isSelected, setIsSelected] = useState(selected)

  const handlePress = useHandler(() => {
    const newSelection = !isSelected
    setIsSelected(newSelection)
    if (onSelected != null) onSelected(newSelection)
  })

  return (
    <Neumorphism revert={isSelected}>
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <AntDesign
          name="heart"
          size={32}
          color={isSelected ? 'red' : 'white'}
        />
      </TouchableOpacity>
    </Neumorphism>
  )
}

const styles = EStyleSheet.create({
  button: {
    backgroundColor: '$backgroundColor',
    borderRadius: scaleSize(12),
    alignItems: 'center',
    paddingVertical: 8,
    width: '100%',
    justifyContent: 'center'
  }
})
