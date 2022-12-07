import React from 'react'
import { useAsyncStorage } from './hooks/useAsyncStorage'
import { useCachedQuery } from './hooks/useCachedQuery'
import { FavoritesCache, Translations, TypeData, PlantsData } from './types'
import {
  fetchTranslation,
  fetchPlantTypes,
  fetchAllPlantsData
} from './utils/fetchers'

export const TranslationContext = React.createContext<Translations>({})
export const TypesContext = React.createContext<TypeData[]>([])
export const PlantsContext = React.createContext<PlantsData>({})
export const FavoritesContext = React.createContext<[FavoritesCache, Function]>(
  [{}, () => {}]
)

export const Context = ({ children }: any): JSX.Element => {
  const [favorites, setFavorites] = useAsyncStorage<FavoritesCache>('favorites')

  const translations = useCachedQuery<Translations>(
    'translations',
    fetchTranslation
  )
  const types = useCachedQuery<TypeData[]>('types', fetchPlantTypes)
  const plants = useCachedQuery<PlantsData>(
    'plants',
    async () => await fetchAllPlantsData(types ?? []),
    types != null
  )

  return (
    <FavoritesContext.Provider value={[favorites ?? {}, setFavorites]}>
      <TranslationContext.Provider value={translations ?? {}}>
        <TypesContext.Provider value={(types ?? []) as any}>
          <PlantsContext.Provider value={plants ?? {}}>
            {children}
          </PlantsContext.Provider>
        </TypesContext.Provider>
      </TranslationContext.Provider>
    </FavoritesContext.Provider>
  )
}
