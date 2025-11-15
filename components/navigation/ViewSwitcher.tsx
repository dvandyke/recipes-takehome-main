'use client'

import { useState, useEffect, useMemo } from 'react'
import { Heart, Clock, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'

type ViewMode = 'discover' | 'favorites' | 'history'

interface ViewSwitcherProps {
  currentView: ViewMode
  onViewChange: (view: ViewMode) => void
  favoritesCount: number
  historyCount: number
}

export function ViewSwitcher({
  currentView,
  onViewChange,
  favoritesCount,
  historyCount,
}: ViewSwitcherProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])
  
  const views = useMemo(() => [
    { id: 'discover' as const, label: 'Discover', icon: Search },
    { id: 'favorites' as const, label: 'Favorites', icon: Heart, count: mounted ? favoritesCount : 0 },
    { id: 'history' as const, label: 'History', icon: Clock, count: mounted ? historyCount : 0 },
  ], [mounted, favoritesCount, historyCount])

  return (
    <div className="flex gap-2 border-b pb-4">
      {views.map(({ id, label, icon: Icon, count }) => (
        <Button
          key={id}
          variant={currentView === id ? 'default' : 'outline'}
          onClick={() => onViewChange(id)}
          className="gap-2"
        >
          <Icon className="h-4 w-4" />
          {label}
          {mounted && count !== undefined && count > 0 && (
            <span className="ml-1 text-xs opacity-70">({count})</span>
          )}
        </Button>
      ))}
    </div>
  )
}
