import React, { useMemo, useState } from 'react'
import Rive, { Alignment, Fit } from 'rive-react-native'
import { TouchableOpacity, View } from 'react-native'

import EStyleSheet from 'react-native-extended-stylesheet'
import { scaleSize } from '../../utils/utils'
import { useAssets } from 'expo-asset'
import { useHandler } from '../../hooks/useHandler'

interface LikeButtonProps {
  size?: number
  onSelected: (isSelected: boolean) => void
  selected?: boolean
}

export const LikeButton = ({
  onSelected,
  selected = false,
  size = 70
}: LikeButtonProps): JSX.Element => {
  const [isSelected, setIsSelected] = useState(selected)
  const [animation, setAnimation] = useState(selected ? 'On' : 'Off')
  const animationStyle = useMemo(
    () => ({
      marginTop: scaleSize(size / 7),
      width: scaleSize(size),
      height: scaleSize(size)
    }),
    [size]
  )

  const [assets] = useAssets([
    require('../../../assets/animations/likeButton.riv')
  ])
  const animationUrl = assets?.[0].localUri

  const handlePress = useHandler(() => {
    const newSelection = !isSelected

    setAnimation(newSelection ? 'Like' : 'Dislike')
    setIsSelected(newSelection)
    if (onSelected != null) onSelected(newSelection)
  })

  return (
    <View style={styles.button}>
      <TouchableOpacity style={styles.touchable} onPress={handlePress} />
      {animationUrl != null ? (
        <Rive
          url={animationUrl}
          fit={Fit.Contain}
          animationName={animation}
          alignment={Alignment.Center}
          style={animationStyle}
        />
      ) : null}
    </View>
  )
}

const styles = EStyleSheet.create({
  button: {
    alignItems: 'center',
    paddingVertical: 8,
    overflow: 'visible',
    height: scaleSize(48),
    justifyContent: 'center',
    width: scaleSize(52)
  },
  touchable: {
    zIndex: 2,
    position: 'absolute',
    height: scaleSize(52),
    width: scaleSize(52)
  }
})
