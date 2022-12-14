import React, { useState } from 'react'

import EStyleSheet from 'react-native-extended-stylesheet'
import { FlatList } from 'react-native'
import { TypeRow } from '../Types/TypeRow'
import { useHandler } from '../../hooks/useHandler'
import { useStore } from '../../state/useStore'
import { TypeData } from '../../@types/types'

export interface TypeListProps {
  onSelected: (type: string | undefined) => void
}

export const TypeList = ({ onSelected }: TypeListProps): JSX.Element => {
  const [typeSelected, setTypeSelected] = useState<string>()
  const plantTypes = useStore(useHandler((state) => state.plantTypes))
  const renderItem = useHandler(({ item }: { item: TypeData }) => {
    if (typeSelected == null) return <TypeRow onOpened={handleOpen} {...item} />

    if (item.id === typeSelected)
      return <TypeRow onClosed={handleClose} {...item} />

    return null
  })

  const handleOpen = useHandler((type: string) => {
    setTypeSelected(type)
    if (onSelected != null) onSelected(type)
  })
  const handleClose = useHandler(() => {
    setTypeSelected(undefined)
    if (onSelected != null) onSelected(undefined)
  })

  return (
    <FlatList
      scrollEnabled={typeSelected == null}
      style={styles.list}
      data={plantTypes}
      renderItem={renderItem}
    />
  )
}

const styles = EStyleSheet.create({
  list: {
    overflow: 'visible',
    height: '100%'
  }
})
