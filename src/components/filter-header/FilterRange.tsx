'use client'

import React from 'react'
import { useCustomSearchParams } from '@hooks'
import { IconXmark } from '@icons'

function FilterRange() {
  const searchParams = useCustomSearchParams()

  /**
   * Handles the change event when the range input value is changed.
   * @param value - The new value of the range input.
   */
  const handleChange = (value: string) => {
    searchParams.setSearchParams({ pages: value })
  }

  return (
    <li className="inline-flex">
      <div className="border h-9 flex px-1 items-center border-neutral-600 rounded-full">
        <span className="block pl-2 min-w-max">
          Pages {'>'} {searchParams.getSearchParams('pages') ?? ''}
        </span>
        <input
          onChange={(e) => {
            handleChange(e.target.value)
          }}
          // value={searchParams.getSearchParams('pages') ?? ''}
          id="default-range"
          type="range"
          min={100}
          max={1000}
          className="w-full text-neutral-50 px-2 h-full  appearance-none cursor-pointer bg-transparent"
        />
        <button
          onClick={() => {
            searchParams.deleteSearchParams('pages')
          }}
          className="w-7 min-w-[28px] p-1 h-7 bg-neutral-700 rounded-full"
        >
          {IconXmark}
        </button>
      </div>
    </li>
  )
}

export default FilterRange
