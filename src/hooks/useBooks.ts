import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

import { type Book } from '@types'
import { getAllBooks, getBooksByFilter } from '@services/book'

/**
 * Custom hook for managing a list of books.
 * @returns An array of books or null if the data is not yet loaded.
 */
export const useBooks = (initialState?: Book[]): Book[] | null => {
  const [books, setBooks] = useState<Book[] | null>(initialState ?? null)
  const searchParams = useSearchParams()

  const setAllBooks = () => {
    const allBooks = getAllBooks()
    setBooks(allBooks)
  }

  useEffect(() => {
    setAllBooks()
  }, [])

  useEffect(() => {
    const fetchFilteredBooks = () => {
      const genre = searchParams.get('genre') ?? undefined
      const pages = searchParams.get('pages') ?? undefined
      const query = searchParams.get('query') ?? undefined
      if (genre === undefined && pages === undefined && query === undefined) {
        setAllBooks()
        return
      }
      const filtered = getBooksByFilter(
        genre,
        pages ? parseInt(pages) : undefined,
        query
      )
      setBooks(filtered)
    }

    fetchFilteredBooks()
  }, [searchParams])

  return books
}
