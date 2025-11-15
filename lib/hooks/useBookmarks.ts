import { usePersistentState } from './usePersistentState'

export function useBookmarks() {
    const [bookmarkedIds, setBookmarkedIds] = usePersistentState<string[]>(
        'bookmarkedRecipes',
        [],
        (value): value is string[] => Array.isArray(value) && value.every((id) => typeof id === 'string')
    )

    const toggleBookmark = (recipeId: string) => {
        setBookmarkedIds((prev) => {
            if (prev.includes(recipeId)) {
                return prev.filter((id) => id !== recipeId)
            }
            return [...prev, recipeId]
        })
    }

    const isBookmarked = (recipeId: string) => bookmarkedIds.includes(recipeId)

    return { bookmarkedIds, toggleBookmark, isBookmarked }
}
