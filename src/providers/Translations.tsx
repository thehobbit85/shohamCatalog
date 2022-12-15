import React from 'react'

import { useCachedQuery } from '../hooks/useCachedQuery'
import { Translations } from '../types'
import { TRANSLATION_TAB_NAME } from '../utils/constants'
import { fetchSheetTab } from '../utils/fetchers'

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

export const TranslationContext = React.createContext<Translations>({})

export const TranslationContextProvider = ({ children }: any): JSX.Element => {
  const translations = useCachedQuery<Translations>(
    'translations',
    fetchTranslation
  )

  return (
    <TranslationContext.Provider value={translations ?? {}}>
      {children}
    </TranslationContext.Provider>
  )
}
