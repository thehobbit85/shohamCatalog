export interface RemoteTypeData {
  SheetName: string
  ImageId: string
}

export interface RemotePlantData {
  Id: string
  Name: string
  Potter: string
  Price: string
  Amount: string
  Colors: string
  ImageId: string
}

export interface RemoteTranslation {
  English: string
  Hebrew: string
}

export interface TypeData {
  type: string
  imageId: string
}

export interface PlantData {
  id: string
  name: string
  potter: string
  price: number
  amount: number
  colors?: string[]
  imageId?: string
}

export interface PlantsData {
  [type: string]: PlantData[]
}

export interface Translations {
  [key: string]: string
}

export interface FavoritesCache {
  [key: string]: PlantData
}
