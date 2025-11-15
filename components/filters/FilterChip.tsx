'use client'

import { memo } from 'react'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface FilterChipProps {
  label: string
  active: boolean
  onClick: () => void
}

export const FilterChip = memo(function FilterChip({ label, active, onClick }: FilterChipProps) {
  return (
    <Badge
      variant={active ? 'default' : 'outline'}
      className="cursor-pointer hover:opacity-80 transition-opacity px-3 py-1.5"
      onClick={onClick}
    >
      {label}
      {active && <X className="ml-1 h-3 w-3" />}
    </Badge>
  )
})
