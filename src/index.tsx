import React, { useContext, useState } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  View,
  Dimensions,
  Platform,
  StatusBar
} from 'react-native'
import { BACKGROUND_COLOR } from './utils/constants'
import { Favorites } from './components/Favorites/Favorites'
import { PlantList } from './components/Plants/PlantList'
import { Title } from './components/Title'
import { TypeList } from './components/Types/TypeList'
import { TranslationContext } from './providers/Translations'

const { height } = Dimensions.get('window')

export const Application = (): JSX.Element => {
  const [type, setType] = useState<string>()
  const translations = useContext(TranslationContext)

  return (
    <SafeAreaView>
      <View style={styles.background} />
      {type == null || type === 'Favorites' ? (
        <Favorites
          onSelected={(open: boolean) =>
            setType(open ? 'Favorites' : undefined)
          }
        />
      ) : null}

      {type != null && type !== 'Favorites' ? (
        <View style={styles.plantList}>
          <PlantList type={type} />
        </View>
      ) : null}

      {type == null ? <Title title={translations.brandName} /> : null}
      <TypeList onSelected={setType} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  background: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: BACKGROUND_COLOR,
    borderRightColor: 'black',
    borderLeftColor: 'black',
    borderLeftWidth: 8,
    borderRightWidth: 8,
    zIndex: -1,
    height: '100%',
    width: '100%',
    position: 'absolute'
  },

  plantList: {
    flexDirection: 'row',
    justifyContent: 'center',
    zIndex: 1,
    position: 'absolute',
    marginTop: height / 7,
    height: (6 * height) / 7,
    width: '100%'
  }
})
