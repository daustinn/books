'use client'

import { useEffect } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

/**
 * Custom hook for managing search parameters in the URL.
 * Provides functions to set, get, and delete search parameters.
 */
export const useCustomSearchParams = (): {
  // eslint-disable-next-line
  setSearchParams: (params: { [name: string]: string }) => void
  // eslint-disable-next-line
  getSearchParams: (name: string) => string | null
  // eslint-disable-next-line
  deleteSearchParams: (name: string) => void
} => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  /**
   * Set search parameters in the URL.
   * @param params - Object containing search parameter key-value pairs.
   */
  const setSearchParams = (params: Record<string, string>): void => {
    if (params !== null) {
      const current = new URLSearchParams(Array.from(searchParams.entries()))
      Object.entries(params).forEach(([name, value]) => {
        if (name !== null) {
          current.set(name, value)
        }
      })
      const search = current.toString()
      const query = search !== null ? `?${search}` : ''
      router.push(`${pathname}${query}`)
    }
  }

  /**
   * Get the value of a specific search parameter.
   * @param name - Name of the search parameter.
   * @returns The value of the search parameter, or null if it doesn't exist.
   */
  const getSearchParams = (name: string): string | null => {
    if (name !== null) {
      // eslint-disable-next-line
      return searchParams.get(name) || null
    }
    return null
  }

  /**
   * Delete a specific search parameter from the URL.
   * @param name - Name of the search parameter to delete.
   */
  const deleteSearchParams = (name: string): void => {
    if (name !== null) {
      const current = new URLSearchParams(Array.from(searchParams.entries()))
      current.delete(name)
      const search = current.toString()
      const query = search !== null ? `?${search}` : ''
      router.push(`${pathname}${query}`)
    }
  }

  useEffect(() => {
    // Cleanup function (if needed)
    return () => {
      // Perform any cleanup actions here (if needed)
    }
  }, [])

  return { setSearchParams, getSearchParams, deleteSearchParams }
}
