'use client'

import { memo, useCallback } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getAreas } from '@/lib/api'
import { FilterChip } from './FilterChip'

interface AreaFiltersProps {
  selectedArea: string | null
  onAreaChange: (area: string | null) => void
}

export const AreaFilters = memo(function AreaFilters({ selectedArea, onAreaChange }: AreaFiltersProps) {
  const handleAllClick = useCallback(() => {
    onAreaChange(null)
  }, [onAreaChange])

  const handleAreaClick = useCallback((area: string) => {
    return () => {
      onAreaChange(selectedArea === area ? null : area)
    }
  }, [selectedArea, onAreaChange])
  const { data: areas, isLoading } = useQuery({
    queryKey: ['areas'],
    queryFn: getAreas,
  })

  if (isLoading) {
    return (
      <div className="flex gap-2 overflow-x-auto pb-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-8 w-24 bg-muted animate-pulse rounded-full" />
        ))}
      </div>
    )
  }

  if (!areas || areas.length === 0) {
    return null
  }

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      <FilterChip
        key="all-areas"
        label="All Areas"
        active={selectedArea === null}
        onClick={handleAllClick}
      />
      {areas.map((area) => (
        <FilterChip
          key={area.strArea}
          label={area.strArea}
          active={selectedArea === area.strArea}
          onClick={handleAreaClick(area.strArea)}
        />
      ))}
    </div>
  )
})
