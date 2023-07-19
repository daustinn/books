import React from 'react'
import { FilterItem } from './FilterItem'
import FilterRange from './FilterRange'

type FilterNavProps = {
  genres: string[]
}

/**
 * FilterNav component represents a navigation bar for filters.
 * @param genres - An array of genres for filter options.
 */
export function FilterNav({ genres }: FilterNavProps) {
  return (
    <ul className="flex gap-1 max-[500px]:pt-0 max-[500px]:justify-center pt-10 items-center flex-wrap">
      <FilterItem value="" text="All" />
      {genres.map((genre, index) => (
        <FilterItem key={index} value={genre} text={genre} />
      ))}
      <FilterRange />
    </ul>
  )
}
