import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { Neumorphism } from '../Neumorphism'
import { BACKGROUND_COLOR } from '../../utils/constants'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { scaleText } from '../../utils/utils'

interface AddToCartButtonProps {
  onSelected: (select: boolean) => void
  selected?: boolean
}

export const AddToCartButton = ({
  onSelected,
  selected = false
}: AddToCartButtonProps): JSX.Element => {
  const [isSelected, setIsSelected] = useState(selected)

  return (
    <Neumorphism revert={isSelected}>
      <TouchableWithoutFeedback
        style={styles.button}
        onPress={() => {
          const newSelection = !isSelected
          setIsSelected(newSelection)
          if (onSelected != null) onSelected(newSelection)
        }}
      >
        <AntDesign
          name="heart"
          size={32}
          color={isSelected ? 'red' : 'white'}
        />
      </TouchableWithoutFeedback>
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
