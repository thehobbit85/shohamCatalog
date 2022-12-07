import { useEffect, useState } from 'react'
import { useAsyncStorage } from './useAsyncStorage'
import { useQuery } from '@tanstack/react-query'

export const useCachedQuery = <T>(
  key: string,
  queryFn: (...args: any) => Promise<T>,
  enabled: boolean = true
): T | undefined => {
  const [data, setData] = useState<T>()
  const [cachedData, setCachedData] = useAsyncStorage<T>(key)
  const newData = useQuery({
    queryKey: [key],
    queryFn,
    enabled
  })

  useEffect(() => {
    if (cachedData != null && data == null) {
      setData(cachedData)
    }
  }, [cachedData, data])

  useEffect(() => {
    if (newData.data != null) {
      setCachedData(newData.data)
      setData(newData.data)
    }
  }, [newData, setCachedData])

  return data
}
