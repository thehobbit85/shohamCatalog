import { OPENSHEET_URI, SPREADSHEET_ID } from './constants'

export const fetchJson = async (uri: string): Promise<any> =>
  await fetch(uri)
    .then(async (res) => await res.json())
    .catch((e) => console.log(e))

export const fetchSheetTab = async (tabName: string): Promise<any> =>
  await fetchJson(`${OPENSHEET_URI}/${SPREADSHEET_ID}/${tabName}`)
