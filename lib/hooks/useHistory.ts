import { usePersistentState } from './usePersistentState'
import { HistoryEntry } from '@/types/recipe'

function isHistoryEntry(value: unknown): value is HistoryEntry {
    return (
        typeof value === 'object' &&
        value !== null &&
        'recipeId' in value &&
        'recipeName' in value &&
        'timestamp' in value &&
        typeof (value as any).recipeId === 'string' &&
        typeof (value as any).recipeName === 'string' &&
        typeof (value as any).timestamp === 'number'
    )
}

function isHistoryArray(value: unknown): value is HistoryEntry[] {
    return Array.isArray(value) && value.every(isHistoryEntry)
}

export function useHistory() {
    const [history, setHistory] = usePersistentState<HistoryEntry[]>(
        'recipeHistory',
        [],
        isHistoryArray
    )

    const addToHistory = (recipeId: string, recipeName: string) => {
        setHistory((prev) => {
            // Remove existing entry for this recipe
            const filtered = prev.filter((entry) => entry.recipeId !== recipeId)
            // Add new entry at the beginning
            const newEntry: HistoryEntry = {
                recipeId,
                recipeName,
                timestamp: Date.now(),
            }
            // Keep only last 50 entries
            return [newEntry, ...filtered].slice(0, 50)
        })
    }

    const clearHistory = () => {
        setHistory([])
    }

    return { history, addToHistory, clearHistory }
}
