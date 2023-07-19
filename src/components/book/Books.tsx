'use client'

import { useBooks } from '@hooks'
import React from 'react'
import Book from './Book'
import { type Book as BookType } from '@types'
import { IconHateEmoji } from '@icons'

type Props = {
  initialBooks?: BookType[]
}

/**
 * Componente BookList muestra una lista de libros.
 * @param initialBooks - Los libros iniciales a mostrar (opcional).
 */
export function BookList({ initialBooks }: Props) {
  const booksList = initialBooks ?? useBooks()

  return (
    <div className="w-full">
      <div className="list-books relative gap-5">
        {booksList?.map((book) => (
          <Book book={book} key={'item-' + book.ISBN} />
        ))}
      </div>
      {booksList && booksList.length < 1 && (
        <div className="w-full p-10 text-center grid place-content-center">
          <div className="gap-2">
            <span className="w-20 mx-auto block">{IconHateEmoji}</span>
            <h4 className="text-2xl pt-5">
              Lo siento, no hay nada que mostrar.
            </h4>
          </div>
        </div>
      )}
    </div>
  )
}
