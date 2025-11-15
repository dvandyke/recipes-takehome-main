import { useEffect, useState } from 'react'

export function usePersistentState<T>(
  key: string,
  initialValue: T,
  validate?: (value: unknown) => value is T
): [T, (value: T | ((prev: T) => T)) => void] {
  const [state, setState] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue
    }

    try {
      const stored = localStorage.getItem(key)
      if (stored) {
        const parsed = JSON.parse(stored)
        if (validate ? validate(parsed) : true) {
          return parsed
        }
      }
    } catch (error) {
      console.error(`Failed to load ${key} from localStorage:`, error)
    }
    return initialValue
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state))
    } catch (error) {
      console.error(`Failed to save ${key} to localStorage:`, error)
    }
  }, [key, state])

  return [state, setState]
}
