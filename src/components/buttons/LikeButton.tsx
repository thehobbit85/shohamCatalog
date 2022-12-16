import React, { useRef, useState } from 'react'
import Rive, { Alignment, Fit, RiveRef } from 'rive-react-native'

import EStyleSheet from 'react-native-extended-stylesheet'
import { TouchableOpacity } from 'react-native'
import { scaleText } from '../../utils/utils'
import { useAssets } from 'expo-asset'
import { useHandler } from '../../hooks/useHandler'

interface LikeButtonProps {
  onSelected: (isSelected: boolean) => void
  selected?: boolean
}

export const LikeButton = ({
  onSelected,
  selected = false
}: LikeButtonProps): JSX.Element => {
  const [isSelected, setIsSelected] = useState(selected)
  const riveRef = useRef<RiveRef>(null)
  const [assets] = useAssets([
    require('../../../assets/animations/likeButton.riv')
  ])
  const animationUrl = assets?.[0].localUri

  const handlePress = useHandler(() => {
    riveRef?.current?.play()
    const newSelection = !isSelected
    setIsSelected(newSelection)
    if (onSelected != null) onSelected(newSelection)
  })

  return (
    <TouchableOpacity style={styles.button} onPress={handlePress}>
      {animationUrl != null ? (
        <Rive
          url={animationUrl}
          fit={Fit.Contain}
          ref={riveRef}
          stateMachineName={'State Machine 1'}
          animationName={isSelected ? 'On' : 'Off'}
          alignment={Alignment.Center}
          style={styles.animation}
        />
      ) : null}
    </TouchableOpacity>
  )
}

const styles = EStyleSheet.create({
  button: {
    zIndex: 3,

    alignItems: 'center',
    paddingVertical: 8,
    width: '100%',
    overflow: 'visible',
    height: scaleText(48),
    justifyContent: 'center'
  },
  animation: {
    zIndex: 2,

    marginTop: scaleText(10),
    width: scaleText(64),
    height: scaleText(64)
  }
})
