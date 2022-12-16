import React, { useMemo } from 'react'

import Animated from 'react-native-reanimated'
// @ts-expect-error
import CachedImage from 'react-native-expo-cached-image'
import EStyleSheet from 'react-native-extended-stylesheet'
import { LikeButton } from '../buttons/LikeButton'
import { Neumorphism } from '../common/Neumorphism'
import { PlantData } from '../../@types/types'
import { ThemedText } from '../common/ThemedText'
import { View } from 'react-native'
import shallow from 'zustand/shallow'
import { useHandler } from '../../hooks/useHandler'
import { useParallax } from '../../hooks/useParallax'
import { useStore } from '../../state/useStore'

interface PlantRowProps {
  data: PlantData
}

const TextRow = ({
  dynamicText,
  fixedText
}: {
  dynamicText: any
  fixedText: string
}): JSX.Element => (
  <View style={styles.textRow}>
    <ThemedText style={styles.dynamicText}>{dynamicText}</ThemedText>
    <ThemedText style={styles.fixedText}>{`${fixedText}: `}</ThemedText>
  </View>
)

export const PlantRow = ({ data }: PlantRowProps): JSX.Element => {
  const { id, name, price, colors, imageUri, amount } = data
  const { animStyle } = useParallax({
    horizontal: 0.2,
    vertical: 0
  })

  const { translations, favorites, setFavorites } = useStore(
    useHandler((state) => ({
      translations: state.translations,
      favorites: state.favorites,
      setFavorites: state.setFavorites
    })),
    shallow
  )

  const plantId = `${id}-${name}`
  const priceText = `₪${price.toFixed(2)}`
  const colorsText = colors?.join(', ')
  const imageSource = useMemo(() => ({ uri: imageUri }), [imageUri])

  const handleSelected = useHandler((isSelected: boolean) => {
    if (isSelected) {
      const newFavorites = { ...favorites, [plantId]: data }
      setFavorites(newFavorites)
    }
    if (!isSelected) {
      const { [plantId]: _, ...rest } = favorites
      setFavorites(rest)
    }
  })

  return (
    <Neumorphism>
      <Animated.View style={[styles.row, animStyle]}>
        <View style={styles.leftPart}>
          <CachedImage
            resizeMode="stretch"
            source={imageSource}
            style={styles.image}
          />
        </View>
        <View style={styles.data}>
          <View style={styles.nameRow}>
            <ThemedText style={styles.nameText}>{name}</ThemedText>
            <LikeButton
              selected={favorites[plantId] != null}
              onSelected={handleSelected}
            />
          </View>
          <TextRow dynamicText={id} fixedText={translations?.id} />
          <TextRow dynamicText={priceText} fixedText={translations?.price} />
          <TextRow dynamicText={amount} fixedText={translations?.amount} />
          <TextRow dynamicText={colorsText} fixedText={translations?.colors} />
        </View>
      </Animated.View>
    </Neumorphism>
  )
}

const styles = EStyleSheet.create({
  row: {
    flexDirection: 'row',
    borderRadius: '$borderRadii.xlarge',
    backgroundColor: '$colors.row',
    marginHorizontal: '$margins.medium',
    paddingVertical: '$paddings.small',
    marginTop: '$margins.medium',
    marginBottom: '$margins.small'
  },
  data: {
    flex: 2,
    flexDirection: 'column'
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
    paddingHorizontal: '$paddings.small'
  },
  nameText: {
    flex: 0,
    width: '100%',
    textAlign: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: '$paddings.medium',
    fontSize: '$textSizes.h3'
  },
  textRow: {
    marginRight: '$margins.medium',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  fixedText: {
    width: '25%',
    fontSize: '$textSizes.h4'
  },
  dynamicText: {
    flex: 0,
    fontSize: '$textSizes.h4'
  },
  leftPart: {
    flex: 1,
    paddingLeft: '$paddings.medium',
    flexDirection: 'column',
    justifyContent: 'flex-end'
  },
  image: {
    backgroundColor: '$colors.button',
    borderRadius: '$borderRadii.small',
    height: '4 * $textSizes.h3',
    marginBottom: '$margins.xsmall'
  }
})
