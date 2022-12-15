import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { Neumorphism } from '../common/Neumorphism'
import { BACKGROUND_COLOR } from '../../utils/constants'
import { scaleText } from '../../utils/utils'

interface AddButtonProps {
  onSelected: (isSelected: boolean) => void
  selected?: boolean
}

export const AddButton = ({
  onSelected,
  selected = false
}: AddButtonProps): JSX.Element => {
  const [isSelected, setIsSelected] = useState(selected)

  return (
    <Neumorphism revert={isSelected}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setIsSelected(!isSelected)
          if (onSelected != null) onSelected(!isSelected)
        }}
      >
        <AntDesign
          name="heart"
          size={32}
          color={isSelected ? 'red' : 'white'}
        />
      </TouchableOpacity>
    </Neumorphism>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: BACKGROUND_COLOR,
    borderRadius: scaleText(12),
    alignItems: 'center',
    paddingVertical: 8,
    width: '100%',
    justifyContent: 'center'
  }
})
