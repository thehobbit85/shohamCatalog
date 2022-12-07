import React, { useState } from 'react'
import { SafeAreaView, StyleSheet, View, Dimensions } from 'react-native'
import { BACKGROUND_COLOR } from './utils/constants'
import { Favorites } from './components/Favorites/Favorites'
import { LinearGradient } from 'expo-linear-gradient'
import { PlantList } from './components/Plants/PlantList'
import { Title } from './components/Title'
import { TypeList } from './components/Types/TypeList'

const { height } = Dimensions.get('window')

export const Application = (): JSX.Element => {
  const [type, setType] = useState<string>()

  return (
    <LinearGradient colors={[BACKGROUND_COLOR, BACKGROUND_COLOR]}>
      <SafeAreaView>
        {type == null || type === 'Favorites' ? <Favorites /> : null}

        {type != null && type !== 'Favorites' ? (
          <View style={styles.plantList}>
            <PlantList type={type} />
          </View>
        ) : null}

        {type == null ? <Title /> : null}
        <TypeList onSelected={setType} />
      </SafeAreaView>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
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
