import {
  Dimensions,
  Platform,
  SafeAreaView,
  StatusBar,
  View
} from 'react-native'
import React, { useContext, useState } from 'react'

import EStyleSheet from 'react-native-extended-stylesheet'
import { Favorites } from './components/Favorites/Favorites'
import { PlantList } from './components/Plants/PlantList'
import { Title } from './components/Title'
import { TranslationContext } from './providers/Translations'
import { TypeList } from './components/Types/TypeList'

const { height } = Dimensions.get('window')

export const Application = (): JSX.Element => {
  const [type, setType] = useState<string>()
  const translations = useContext(TranslationContext)

  return (
    <SafeAreaView>
      <View style={[styles.background]} />

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

const styles = EStyleSheet.create({
  background: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: '$backgroundColor',
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
    position: 'absolute',
    height: (height * 5) / 6,
    width: '100%',
    zIndex: 1,
    marginTop: height / 6
  }
})
