import { FavoritesCache } from '../@types/types'
import React from 'react'
import { useAsyncStorage } from '../hooks/useAsyncStorage'

export const Favorites = React.createContext<[FavoritesCache, Function]>([
  {},
  () => {}
])

export const FavoritesContextProvider = ({ children }: any): JSX.Element => {
  const [favorites, setFavorites] = useAsyncStorage<FavoritesCache>('favorites')

  return (
    <Favorites.Provider value={[favorites ?? {}, setFavorites]}>
      {children}
    </Favorites.Provider>
  )
}
