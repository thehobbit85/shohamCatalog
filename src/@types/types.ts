export interface TypeData {
  id: string
  potType: string
  imageUri: string
}

export interface RemotePlantData {
  id: string
  name: string
  potter: string
  price: string
  amount: string
  colors: string
  imageUri: string
}

export interface PlantData {
  id: string
  name: string
  potter: string
  price: number
  amount: number
  colors?: string[]
  imageUri?: string
}

export interface PlantsData {
  [type: string]: PlantData[]
}

export interface RemoteTranslation {
  english: string
  hebrew: string
}

export interface Translations {
  [key: string]: string
}

export interface FavoritesCache {
  [key: string]: PlantData
}

export interface Theme {
  [key: string]: any
}
