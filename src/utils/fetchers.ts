import {
  OPENSHEET_URI,
  SPREADSHEET_ID,
  TYPES_TAB_NAME,
  TRANSLATION_TAB_NAME
} from './constants'

import {
  RemoteTypeData,
  RemotePlantData,
  RemoteTranslation,
  TypeData,
  PlantsData,
  PlantData,
  Translations
} from '../types'

export const fetchJson = async (uri: string): Promise<any> =>
  await fetch(uri)
    .then(async (res) => await res.json())
    .catch((e) => console.log(e))

export const fetchSheetTab = async (tabName: string): Promise<any> =>
  await fetchJson(`${OPENSHEET_URI}/${SPREADSHEET_ID}/${tabName}`)

export const fetchTranslation = async (): Promise<Translations> =>
  await fetchSheetTab(TRANSLATION_TAB_NAME).then(
    (translations: RemoteTranslation[]) =>
      translations.reduce(
        (res, { English, Hebrew }) => ({
          ...res,
          [English]: Hebrew
        }),
        {}
      )
  )

export const fetchPlantTypes = async (): Promise<TypeData[]> =>
  await fetchSheetTab(TYPES_TAB_NAME).then((types: RemoteTypeData[]) =>
    types.map(({ SheetName, ImageId }) => ({
      type: SheetName,
      imageId: ImageId,
      data: []
    }))
  )

export const fetchPlantsData = async (type: string): Promise<PlantData[]> =>
  await fetchSheetTab(type).then((sheet: RemotePlantData[]) =>
    sheet.map((plant) => ({
      id: plant.Id,
      name: plant.Name,
      potter: plant.Potter,
      price: parseFloat(plant.Price),
      amount: parseInt(plant.Amount, 10),
      colors: Array.isArray(plant.Colors)
        ? plant.Colors
        : plant.Colors !== null && plant.Colors !== ''
        ? [plant.Colors]
        : [],
      imageId: plant.ImageId
    }))
  )

export const fetchAllPlantsData = async (
  types: TypeData[]
): Promise<PlantsData> => {
  const requests = []
  const allData = {}

  for (const { type } of types) {
    const typeData = fetchPlantsData(type).then((data) => ({
      [type]: data
    }))
    requests.push(typeData)
  }

  const responses = await Promise.all(requests)

  for (const res of responses) {
    Object.assign(allData, { ...res })
  }

  return allData
}
