import React, { useContext } from 'react'
import { View, StyleSheet } from 'react-native'
import { PlantData } from '../../types'
// @ts-expect-error
import CachedImage from 'react-native-expo-cached-image'
import { scaleText } from '../../utils/utils'
import { Neumorphism } from '../Neumorphism'
import { BACKGROUND_COLOR, GOOGLE_DRIVE_URI } from '../../utils/constants'
import { ThemedText } from '../ThemedText'
import { AddButton } from './AddButton'
import { TranslationContext, FavoritesContext } from '../../context'

interface PlantRowProps {
  data: PlantData
}

export const PlantRow = ({ data }: PlantRowProps): JSX.Element => {
  const { id, name, potter, price, colors, imageId, amount } = data
  const translations = useContext(TranslationContext)
  const [favorites, setFavorites] = useContext(FavoritesContext)
  const plantId = `${id}-${name}`

  return (
    <Neumorphism>
      <View style={styles.row}>
        <View style={styles.leftPart}>
          <CachedImage
            resizeMode="center"
            source={{ uri: `${GOOGLE_DRIVE_URI}${imageId ?? ''}` }}
            style={styles.image}
          />
          <AddButton
            selected={favorites[plantId] != null}
            onSelected={() => {
              const newFavorites = { ...favorites }
              Object.assign(newFavorites, { [plantId]: data })
              setFavorites(newFavorites)
            }}
          />
        </View>
        <View style={styles.data}>
          <View style={styles.nameRow}>
            <ThemedText style={styles.nameText}>{name}</ThemedText>
          </View>
          <View style={styles.textRow}>
            <ThemedText style={styles.dynamicText}>{id}</ThemedText>
            <ThemedText
              style={styles.fixedText}
            >{`${translations?.id} - `}</ThemedText>
          </View>
          <View style={styles.textRow}>
            <ThemedText style={styles.dynamicText}>{potter}</ThemedText>
            <ThemedText
              style={styles.fixedText}
            >{`${translations?.potter} - `}</ThemedText>
          </View>
          <View style={styles.textRow}>
            <ThemedText style={styles.dynamicText}>{`₪${price.toFixed(
              2
            )}`}</ThemedText>
            <ThemedText
              style={styles.fixedText}
            >{`${translations?.price} - `}</ThemedText>
          </View>
          <View style={styles.textRow}>
            <ThemedText style={styles.dynamicText}>{amount}</ThemedText>
            <ThemedText
              style={styles.fixedText}
            >{`${translations?.amount} - `}</ThemedText>
          </View>
          <View style={styles.textRow}>
            <ThemedText style={styles.dynamicText}>
              {colors?.join(', ')}
            </ThemedText>
            <ThemedText
              style={styles.fixedText}
            >{`${translations?.colors} - `}</ThemedText>
          </View>
        </View>
      </View>
    </Neumorphism>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    borderRadius: scaleText(10),
    backgroundColor: BACKGROUND_COLOR,
    marginHorizontal: scaleText(16),
    paddingVertical: scaleText(8),
    marginTop: scaleText(16),
    marginBottom: scaleText(8),
    paddingLeft: scaleText(8)
  },
  data: {
    flex: 2,
    flexDirection: 'column'
  },
  nameRow: {
    width: '100%',
    paddingHorizontal: scaleText(4)
  },
  nameText: {
    width: '100%',
    textAlign: 'right',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: scaleText(4),
    fontSize: scaleText(24)
  },
  textRow: {
    marginTop: scaleText(4),
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  fixedText: {
    flex: 1,
    width: 'auto',
    fontSize: scaleText(16)
  },
  dynamicText: {
    flex: 2,
    textAlign: 'right',
    fontSize: scaleText(16)
  },
  leftPart: {
    flex: 1,
    paddingLeft: scaleText(8),
    paddingVertical: scaleText(4),
    flexDirection: 'column',
    justifyContent: 'space-evenly'
  },
  image: {
    backgroundColor: BACKGROUND_COLOR,
    borderRadius: scaleText(10),
    height: scaleText(24) * 4,
    marginBottom: scaleText(8)
  }
})
