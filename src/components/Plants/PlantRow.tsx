import React, { useMemo } from 'react'

// @ts-expect-error
import CachedImage from 'react-native-expo-cached-image'
import EStyleSheet from 'react-native-extended-stylesheet'
import { LikeButton } from '../buttons/LikeButton'
import { Neumorphism } from '../common/Neumorphism'
import { PlantData } from '../../@types/types'
import { ThemedText } from '../common/ThemedText'
import { View } from 'react-native'
import { scaleSize } from '../../utils/utils'
import shallow from 'zustand/shallow'
import { useHandler } from '../../hooks/useHandler'
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
      <View style={styles.row}>
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
      </View>
    </Neumorphism>
  )
}

const styles = EStyleSheet.create({
  row: {
    flexDirection: 'row',
    borderRadius: scaleSize(10),
    backgroundColor: '$backgroundColor',
    marginHorizontal: scaleSize(16),
    paddingVertical: scaleSize(8),
    marginTop: scaleSize(16),
    marginBottom: scaleSize(8)
  },
  data: {
    flex: 2,
    flexDirection: 'column'
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
    paddingHorizontal: scaleSize(8)
  },
  nameText: {
    flex: 0,
    width: '100%',
    textAlign: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: scaleSize(16),
    fontSize: scaleSize(24)
  },
  textRow: {
    marginRight: scaleSize(24),
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  fixedText: {
    width: '25%',
    fontSize: scaleSize(16)
  },
  dynamicText: {
    flex: 0,
    textAlign: 'right',
    fontSize: scaleSize(16)
  },
  leftPart: {
    flex: 1,
    paddingLeft: scaleSize(16),
    flexDirection: 'column',
    justifyContent: 'flex-end'
  },
  image: {
    backgroundColor: '$backgroundColor',
    borderRadius: scaleSize(10),
    height: scaleSize(24) * 4,
    marginBottom: scaleSize(4)
  }
})
