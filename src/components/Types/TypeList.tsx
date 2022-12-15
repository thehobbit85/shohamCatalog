import React, { useState, useContext } from 'react'
import { StyleSheet, FlatList } from 'react-native'

import { TypeRow } from '../Types/TypeRow'

import { useHandler } from '../../hooks/useHandler'
import { TypeData } from '../../types'
import { TypesContext } from '../../providers/Plants'

export interface TypeListProps {
  onSelected: (type: string | undefined) => void
}

export const TypeList = ({ onSelected }: TypeListProps): JSX.Element => {
  const [typeSelected, setTypeSelected] = useState<string>()
  const plantTypes = useContext<TypeData[]>(TypesContext as any)
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
      renderItem={({ item }) => {
        if (typeSelected == null)
          return <TypeRow onOpened={handleOpen} {...item} />

        if (item.id === typeSelected)
          return <TypeRow onClosed={handleClose} {...item} />

        return null
      }}
    />
  )
}

const styles = StyleSheet.create({
  list: {
    overflow: 'visible',
    height: '100%'
  }
})
