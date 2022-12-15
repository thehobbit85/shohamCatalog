import { FavoritesCache } from '../utils/types'
import React from 'react'
import { useAsyncStorage } from '../hooks/useAsyncStorage'

export const FavoritesContext = React.createContext<[FavoritesCache, Function]>(
  [{}, () => {}]
)
export const FavoritesContextProvider = ({ children }: any): JSX.Element => {
  const [favorites, setFavorites] = useAsyncStorage<FavoritesCache>('favorites')

  return (
    <FavoritesContext.Provider value={[favorites ?? {}, setFavorites]}>
      {children}
    </FavoritesContext.Provider>
  )
}
