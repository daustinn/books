'use client'
import { useCustomSearchParams } from '@hooks'
import { cn } from '@utils'
import React from 'react'

type Props = {
  value: string
  text: string
}

/**
 * FilterItem component represents a filter item.
 * @param value - The value of the filter item.
 * @param text - The text of the filter item.
 */
export function FilterItem({ value, text }: Props) {
  const searchParams = useCustomSearchParams()
  const genre = searchParams.getSearchParams('genre')
  const isActive = (genre === null && value === '') || genre === value

  /**
   * Handles the change event when the filter item is clicked.
   */
  const handleChange = () => {
    searchParams.setSearchParams({ genre: value })
    if (value === '') searchParams.deleteSearchParams('genre')
  }

  return (
    <li className="inline-flex">
      <button
        onClick={handleChange}
        className={cn(
          'w-full h-9 flex items-center font-semibold px-3 transition-colors border relative border-neutral-700 hover:border-neutral-500 rounded-full',
          isActive && ' bg-neutral-400/20'
        )}
      >
        {isActive && (
          <div className="absolute inset-2 -z-10 bg-neutral-500 opacity-70 blur-xl" />
        )}
        {text}
      </button>
    </li>
  )
}
