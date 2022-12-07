import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const useAsyncStorage = <T>(
  key: string,
  initialValue?: T
): [storedValue: T | undefined, setValue: Function] => {
  const [storedValue, setStoredValue] = useState<T | undefined>()

  useEffect(() => {
    AsyncStorage.getItem(key)
      .then((item) => {
        const value = item != null ? JSON.parse(item) : initialValue
        setStoredValue(value)
      })
      .catch((error) => console.log(error))
  }, [key, initialValue])

  const setValue = async (value: T): Promise<void> => {
    setStoredValue(value)
    AsyncStorage.setItem(key, JSON.stringify(value)).catch((error) =>
      console.log(error)
    )
  }

  return [storedValue, setValue]
}
