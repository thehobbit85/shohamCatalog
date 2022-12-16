import React, { useState } from 'react'

import { AntDesign } from '@expo/vector-icons'
import EStyleSheet from 'react-native-extended-stylesheet'
import { Neumorphism } from '../common/Neumorphism'
import { TouchableOpacity } from 'react-native'
import { useHandler } from '../../hooks/useHandler'
import { useTheme } from '../../theme/theme'

interface HeartButtonProps {
  onSelected: (isSelected: boolean) => void
  selected?: boolean
}

export const HeartButton = ({
  onSelected,
  selected = false
}: HeartButtonProps): JSX.Element => {
  const [isSelected, setIsSelected] = useState(selected)
  const { theme } = useTheme()
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
          size={theme?.$textSizes?.h2}
          color={isSelected ? 'red' : 'white'}
        />
      </TouchableOpacity>
    </Neumorphism>
  )
}

const styles = EStyleSheet.create({
  button: {
    backgroundColor: '$colors.button',
    borderRadius: '$borderRadii.medium',
    alignItems: 'center',
    paddingVertical: '$paddings.small',
    width: '100%',
    justifyContent: 'center'
  }
})
