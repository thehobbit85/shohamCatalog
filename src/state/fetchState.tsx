import {
  PlantData,
  PlantsData,
  RemotePlantData,
  RemoteTranslation,
  Translations,
  TypeData
} from '../@types/types'
import { TRANSLATION_TAB_NAME, TYPES_TAB_NAME } from '../theme/constants'

import { fetchSheetTab } from '../utils/fetchers'

export const fetchPlantTypes = async (): Promise<TypeData[]> =>
  await fetchSheetTab(TYPES_TAB_NAME).then((types: TypeData[]) =>
    types.map((type) => ({
      ...type,
      data: []
    }))
  )

export const fetchPlantsForType = async (type: string): Promise<PlantData[]> =>
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

export const fetchPlants = async (types: TypeData[]): Promise<PlantsData> =>
  await Promise.all(
    types.map(
      async ({ id }) =>
        await fetchPlantsForType(id).then((data) => ({
          [id]: data
        }))
    )
  ).then((response) =>
    response.reduce((res, data) => ({ ...res, ...data }), {})
  )

export const fetchTranslation = async (): Promise<Translations> =>
  await fetchSheetTab(TRANSLATION_TAB_NAME).then(
    (translations: RemoteTranslation[]) =>
      translations.reduce(
        (res, { english, hebrew }) => ({
          ...res,
          [english]: hebrew
        }),
        {}
      )
  )
