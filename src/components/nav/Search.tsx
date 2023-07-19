'use client'
import { useCustomSearchParams } from '@hooks'
import React, { type ChangeEvent, useEffect, useState } from 'react'

function Search() {
  const searchParams = useCustomSearchParams()
  const [query, setQuery] = useState<string | null>(
    searchParams.getSearchParams('query')
  )

  /**
   * Handles the change event when the search input value is changed.
   * @param e - The change event of the search input.
   */
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  useEffect(() => {
    if (!query) {
      searchParams.deleteSearchParams('query')
    } else {
      searchParams.setSearchParams({ query })
    }
  }, [query])

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
      }}
      className="h-9"
    >
      <input
        onChange={handleChange}
        value={query ?? ''}
        type="text"
        className="h-full rounded-full w-full text-center px-3 text-sm border border-neutral-700 bg-neutral-700/40"
        placeholder="Title, synopsis, author"
      />
    </form>
  )
}

export default Search
