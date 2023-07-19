import { type Book, type BookApi } from '@types'
import booksJson from '../data/books.json'

/**
 * Extracts the books from a BookApi object.
 * @param books - The BookApi object containing the library.
 * @returns An array of books extracted from the BookApi object.
 */
const getOutBooks = (books: BookApi): Book[] => {
  const { library } = books
  return library?.map((x) => x.book) ?? []
}

/**
 * Retrieves all books from the library.
 * @returns An array of all books.
 */
export const getAllBooks = (): Book[] => {
  const returnData = booksJson as BookApi
  const books = getOutBooks(returnData)
  return books
}

/**
 * Retrieves books filtered by genre.
 * @param genre - The genre to filter the books by.
 * @returns An array of books filtered by the specified genre.
 */
export const getFilterByGenre = (genre: string): Book[] => {
  const filteredBooks: BookApi = {
    library:
      booksJson.library?.filter(
        (libraryEntity) => libraryEntity.book.genre === genre
      ) ?? null
  }
  const books = getOutBooks(filteredBooks)
  return books
}

/**
 * Retrieves books filtered by genre, number of pages, and query.
 * @param genre - The genre to filter the books by. (Optional)
 * @param numPages - The maximum number of pages allowed for the books. (Optional)
 * @param query - The search query to filter the books by title or filter. (Optional)
 * @returns An array of books filtered by the specified genre, number of pages, and query.
 */
export const getBooksByFilter = (
  genre?: string,
  numPages?: number,
  query?: string
): Book[] => {
  const filteredBooks: BookApi = {
    library:
      booksJson.library?.filter((libraryEntity) => {
        const { book } = libraryEntity
        const isGenreMatch = genre !== undefined ? book.genre === genre : true
        const isNumPagesMatch = numPages ? book.pages > numPages : true
        const isQueryMatch =
          query !== undefined
            ? book.title.toLowerCase().includes(query.toLowerCase()) ||
              book.synopsis.toLowerCase().includes(query.toLowerCase()) ||
              book.author.name.toLowerCase().includes(query.toLowerCase())
            : true
        return isGenreMatch && isNumPagesMatch && isQueryMatch
      }) ?? null
  }

  const books = getOutBooks(filteredBooks)
  return books
}

/**
 * Retrieves the list of genres available in the library.
 * @returns An array of unique genres.
 */
export const getGenresList = (): string[] => {
  const genresSet = new Set<string>(
    booksJson.library?.map((libraryEntity) => libraryEntity.book.genre)
  )
  const genresList = Array.from(genresSet)
  return genresList
}

/**
 * Retrieves a book by its ISBN.
 * @param isbn - The ISBN of the book to retrieve.
 * @returns The book with the specified ISBN, or null if not found.
 */
export const getBookByISBN = (isbn: string): Book | null => {
  const foundLibraryEntity = booksJson.library?.find(
    (libraryEntity) => libraryEntity.book.ISBN === isbn
  )

  if (foundLibraryEntity != null) {
    return foundLibraryEntity.book
  }

  return null
}
