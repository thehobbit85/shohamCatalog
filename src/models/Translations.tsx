import React from 'react'
import { TRANSLATION_TAB_NAME } from '../theme/constants'
import { Translations } from '../@types/types'
import { fetchSheetTab } from '../utils/fetchers'
import { useCachedQuery } from '../hooks/useCachedQuery'

interface RemoteTranslation {
  english: string
  hebrew: string
}

const fetchTranslation = async (): Promise<Translations> =>
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

export const Translation = React.createContext<Translations>({})

export const TranslationContextProvider = ({ children }: any): JSX.Element => {
  const translations = useCachedQuery<Translations>(
    'translations',
    fetchTranslation
  )

  return (
    <Translation.Provider value={translations ?? {}}>
      {children}
    </Translation.Provider>
  )
}
