import create from 'zustand'
import { persist } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { fetchPlantTypes, fetchPlants, fetchTranslation } from './fetchState'
import {
  FavoritesCache,
  PlantsData,
  TypeData,
  Translations
} from '../@types/types'

interface State {
  favorites: FavoritesCache
  plants: PlantsData
  translations: Translations
  plantTypes: TypeData[]
  fetchData: () => Promise<void>
  setFavorites: (favorites: FavoritesCache) => void
}

export const useStore = create(
  persist<State>(
    (set) => ({
      translations: {},
      plantTypes: [],
      plants: {},
      fetchData: async () => {
        const translations = await fetchTranslation()
        const plantTypes = await fetchPlantTypes()
        const plants = await fetchPlants(plantTypes)
        set((state: State) => ({ ...state, translations, plantTypes, plants }))
      },
      favorites: {},
      setFavorites: (favorites: FavoritesCache) =>
        set((state: State) => ({ ...state, favorites }))
    }),
    {
      name: 'Shoham-Store',
      getStorage: () => AsyncStorage
    }
  )
)
