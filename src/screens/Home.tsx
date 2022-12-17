import {
  Dimensions,
  Platform,
  SafeAreaView,
  StatusBar,
  View
} from 'react-native'
import React, { useState } from 'react'

import Animated from 'react-native-reanimated'
import EStyleSheet from 'react-native-extended-stylesheet'
import { FavoritesButton } from '../components/Favorites/FavoritesButton'
import { PlantList } from '../components/Plants/PlantList'
import { Title } from '../components/Title'
import { TypeList } from '../components/Types/TypeList'
import { useHandler } from '../hooks/useHandler'
import { useParallax } from '../hooks/useParallax'
import { useStore } from '../state/useStore'

const { height } = Dimensions.get('window')

export const Home = (): JSX.Element => {
  const [type, setType] = useState<string>()
  const translations = useStore(useHandler((state) => state.translations))
  const handleSelected = useHandler((open: boolean) =>
    setType(open ? 'Favorites' : undefined)
  )

  const { parallaxAnimateStyle } = useParallax({
    sensitivity: 0.1
  })

  return (
    <SafeAreaView style={styles.background}>
      {type == null || type === 'Favorites' ? (
        <FavoritesButton onSelected={handleSelected} />
      ) : null}

      {type != null && type !== 'Favorites' ? (
        <View style={styles.plantList}>
          <PlantList type={type} />
        </View>
      ) : null}

      <Animated.View style={parallaxAnimateStyle}>
        {type == null ? <Title title={translations.brandName} /> : null}
      </Animated.View>
      <TypeList onSelected={setType} />
    </SafeAreaView>
  )
}

const styles = EStyleSheet.create({
  background: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: '$colors.background'
  },
  plantList: {
    position: 'absolute',
    height: (height * 5) / 6,
    width: '100%',
    zIndex: 1,
    marginTop: height / 6
  }
})
