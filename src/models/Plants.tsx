import { PlantData, PlantsData, TypeData } from '../@types/types'

import React from 'react'
import { TYPES_TAB_NAME } from '../theme/constants'
import { fetchSheetTab } from '../utils/fetchers'
import { useCachedQuery } from '../hooks/useCachedQuery'

interface RemotePlantData {
  id: string
  name: string
  potter: string
  price: string
  amount: string
  colors: string
  imageUri: string
}

const fetchPlantTypes = async (): Promise<TypeData[]> =>
  await fetchSheetTab(TYPES_TAB_NAME).then((types: TypeData[]) =>
    types.map((type) => ({
      ...type,
      data: []
    }))
  )

const fetchPlantsData = async (type: string): Promise<PlantData[]> =>
  await fetchSheetTab(type).then((sheet: RemotePlantData[]) =>
    sheet.map(({ price, amount, colors, ...rest }) => ({
      ...rest,
      price: parseFloat(price),
      amount: parseInt(amount, 10),
      colors: Array.isArray(colors)
        ? colors
        : colors !== null && colors !== ''
        ? [colors]
        : []
    }))
  )

const fetchAllPlantsData = async (types: TypeData[]): Promise<PlantsData> =>
  await Promise.all(
    types.map(
      async ({ id }) =>
        await fetchPlantsData(id).then((data) => ({
          [id]: data
        }))
    )
  ).then((response) =>
    response.reduce((res, data) => ({ ...res, ...data }), {})
  )

export const Types = React.createContext<TypeData[]>([])
export const Plants = React.createContext<PlantsData>({})

export const PlantsContextProvider = ({ children }: any): JSX.Element => {
  const types = useCachedQuery<TypeData[]>('types', fetchPlantTypes)
  const plants = useCachedQuery<PlantsData>(
    'plants',
    async () => await fetchAllPlantsData(types ?? []),
    types != null
  )
  return (
    <Types.Provider value={types ?? []}>
      <Plants.Provider value={plants ?? {}}>{children}</Plants.Provider>
    </Types.Provider>
  )
}
