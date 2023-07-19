'use client'

import { type Book } from '@types'
import React, { createContext, useState, useEffect, useContext } from 'react'

interface BookContextValue {
  books: Book[]
  addBook: (book: Book) => void
  removeBook: (book: Book) => void
}

interface BookProviderProps {
  children: React.ReactNode
}

const BookContext = createContext<BookContextValue | undefined>(undefined)

/**
 * BookProvider es un componente de React que actúa como proveedor de contexto para la lista de libros.
 * Proporciona una lista de libros, así como funciones para agregar y eliminar libros.
 */
export const BookReadingProvider: React.FC<BookProviderProps> = ({
  children
}) => {
  /**
   * El estado `books` almacena la lista de libros.
   */
  const [books, setBooks] = useState<Book[]>([])

  /**
   * Este efecto se ejecuta al montar el componente y carga los libros almacenados en el localStorage, si los hay.
   */
  useEffect(() => {
    const storedBooks = localStorage.getItem('bookList')

    if (storedBooks !== null) {
      setBooks(JSON.parse(storedBooks))
    }
  }, [])

  /**
   * Este efecto se suscribe al evento de almacenamiento (`storage`) y escucha los cambios en la clave 'bookList'.
   * Cuando se produce un cambio en esa clave, actualiza los libros en el estado del componente.
   * Se utiliza una bandera de bloqueo (`bookListLock`) para evitar actualizaciones en cadena.
   */
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'bookList') {
        const isLocked = localStorage.getItem('bookListLock') === 'true'

        if (!isLocked) {
          localStorage.setItem('bookListLock', 'true')

          // eslint-disable-next-line
          const updatedBooks = event.newValue ? JSON.parse(event.newValue) : []
          setBooks(updatedBooks)

          localStorage.setItem('bookListLock', 'false')
        }
      }
    }

    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  /**
   * Este efecto se ejecuta cada vez que cambia el estado de los libros y actualiza el localStorage con la lista actualizada de libros.
   */
  useEffect(() => {
    localStorage.setItem('bookList', JSON.stringify(books))
  }, [books])

  /**
   * La función `addBook` agrega un libro a la lista de libros.
   * Si el libro ya existe en la lista, no se agrega nuevamente.
   * @param book El libro que se va a agregar.
   */
  const addBook = (book: Book) => {
    const existingBook = books.find((b) => b.ISBN === book.ISBN)

    if (existingBook == null) {
      setBooks((prevBooks) => [...prevBooks, book])
    }
  }

  /**
   * La función `removeBook` elimina un libro de la lista de libros.
   * @param book El libro que se va a eliminar.
   */
  const removeBook = (book: Book) => {
    setBooks((prevBooks) => prevBooks.filter((b) => b.ISBN !== book.ISBN))
  }

  /**
   * El valor del contexto del libro, que se proporciona a través de `BookContext.Provider`.
   * Incluye la lista de libros y las funciones `addBook` y `removeBook`.
   */
  const bookContextValue: BookContextValue = {
    books,
    addBook,
    removeBook
  }

  return (
    <BookContext.Provider value={bookContextValue}>
      {children}
    </BookContext.Provider>
  )
}

/**
 * El hook `useBookList` se utiliza para acceder al contexto del libro (`BookContext`) y obtener la lista de libros y las funciones asociadas.
 * Debe ser utilizado dentro de un componente envuelto con `BookProvider`.
 * @returns El valor del contexto del libro (`BookContextValue`).
 */
export const useBookReading = (): BookContextValue => {
  const context = useContext(BookContext)

  if (context == null) {
    throw new Error('useBookList must be used within a BookProvider')
  }

  return context
}
