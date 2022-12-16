import Animated, {
  Easing,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated'
import { Line, Svg } from 'react-native-svg'
import React, { useEffect, useState } from 'react'

import { TouchableOpacity } from 'react-native'
import { scaleSize } from '../../utils/utils'
import { useHandler } from '../../hooks/useHandler'

const AnimatedLine = Animated.createAnimatedComponent(Line)

interface ExpendButtonProps {
  color?: string
  size?: number
  strokeWidth?: string
  open?: boolean
  onPress?: (isOpen: boolean) => void
  initAngle?: number
}

export const ExpendButton = ({
  size = scaleSize(36),
  onPress,
  color = 'white',
  strokeWidth = `${size / 3.5}`,
  open,
  initAngle = 0.1
}: ExpendButtonProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false)
  const angle = useSharedValue(initAngle)

  const handleToggleDropdown = useHandler(() => {
    if (onPress != null) onPress(!isOpen)
    setIsOpen(!isOpen)
  })

  useEffect(() => {
    angle.value = withTiming(open ?? isOpen ? 1 : 0, {
      duration: 500,
      easing: Easing.inOut(Easing.circle)
    })
  }, [angle, isOpen, open])

  const svgSize = scaleSize(size)
  const svgMiddle = svgSize / 2

  const viewBox = `${0} ${-svgSize / 3} ${svgSize} ${svgSize * 1.5}`

  const animatedLineProps1 = useAnimatedProps(() => ({
    x1: svgMiddle * (angle.value - 1),
    x2: svgMiddle * (angle.value + 1),
    y1: svgMiddle * 0.75 * (1 - angle.value)
  }))

  const animatedLineProps2 = useAnimatedProps(() => ({
    x1: svgMiddle * (1 - angle.value),
    x2: svgMiddle * (3 - angle.value),
    y2: svgMiddle * 0.75 * (1 - angle.value)
  }))

  const degreeFactor = 20

  const animatedStyles1 = useAnimatedStyle(() => ({
    transform: [
      { translateX: svgMiddle * (angle.value + 1) },
      { translateY: svgSize },
      {
        rotateZ: `${degreeFactor}deg`
      },
      {
        rotateZ: `-${angle.value * degreeFactor}deg`
      },
      { translateX: -svgMiddle * (angle.value + 1) },
      { translateY: -svgSize }
    ]
  }))

  const animatedStyles2 = useAnimatedStyle(() => ({
    transform: [
      { translateX: svgMiddle * (1 - angle.value) },
      { translateY: svgSize },
      {
        rotateZ: `-${degreeFactor}deg`
      },
      {
        rotateZ: `${angle.value * degreeFactor}deg`
      },
      { translateX: -svgMiddle * (1 - angle.value) },
      { translateY: -svgSize }
    ]
  }))

  return (
    <TouchableOpacity onPress={handleToggleDropdown}>
      <Svg height={svgSize} width={svgSize * 2} viewBox={viewBox}>
        <AnimatedLine
          animatedProps={animatedLineProps1}
          style={animatedStyles1}
          y1={0}
          y2={svgSize}
          strokeLinecap="round"
          stroke={color}
          strokeWidth={strokeWidth}
        />
        <AnimatedLine
          animatedProps={animatedLineProps2}
          style={animatedStyles2}
          y1={svgSize}
          y2={0}
          strokeLinecap="round"
          stroke={color}
          strokeWidth={strokeWidth}
        />
      </Svg>
    </TouchableOpacity>
  )
}
