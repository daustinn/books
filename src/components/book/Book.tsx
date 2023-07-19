'use client'
import { useBookReading } from '@context'
import { IconXmark } from '@icons'
import { type Book as TypeBook } from '@types'
import { cn } from '@utils'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {
  book: TypeBook
}

/**
 * Componente Book representa un libro en la interfaz de usuario.
 * @param book - El objeto del libro a mostrar.
 */
function Book({ book }: Props) {
  const { addBook, books, removeBook } = useBookReading()
  const isActive = books.some((a) => a.ISBN === book.ISBN)

  const handleToggleBook = () => {
    isActive ? removeBook(book) : addBook(book)
  }

  return (
    <div
      key={book.ISBN}
      className="w-full p-2 border relative group cursor-pointer duration-300 transition-all border-neutral-700/60 overflow-hidden rounded-2xl"
    >
      <Link
        href={'/books/' + book.ISBN}
        className="absolute inset-0 z-10 w-full h-full block"
      >
        <span className="absolute block"></span>
      </Link>
      <header className="relative">
        <div
          className={cn(
            'duration-500 transition-all',
            !isActive && 'grayscale group-hover:grayscale-0'
          )}
        >
          <div className="h-[300px] rounded-xl overflow-hidden">
            <Image
              width={300}
              height={300}
              placeholder="empty"
              loading="lazy"
              src={book.cover}
              alt={book.title}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="h-[320px] absolute top-0 w-full blur-2xl -z-10 scale-105">
            <Image
              width={50}
              height={50}
              src={book.cover}
              alt={book.title}
              className="object-cover w-full h-full"
            />
          </div>
        </div>
        {isActive && (
          <div className="ml-auto text-white left-[50%] translate-x-[-50%] gap-2 px-3 absolute flex items-center text-sm bottom-3 bg-blue-700/90 backdrop-blur-xl p-2 rounded-full">
            <span>Leyendo</span>
            <div className="w-2 h-2 animate-pulse bg-white rounded-full" />
          </div>
        )}
      </header>
      <footer className="relative flex items-center pt-4 p-1">
        <div>
          <h1 className="font-semibold text-base">{book.title}</h1>
          <h2 className="opacity-70 text-sm font-light">
            <span>{book.author.name}</span> ·{' '}
            <span className="">{book.year}</span>
          </h2>
        </div>
      </footer>
      <button
        onClick={handleToggleBook}
        className={cn(
          'absolute z-20 transition-transform hidden max-[600px]:block group-hover:block h-9 w-9 bottom-3 right-3 rotate-45 bg-blue-700 rounded-full p-2',
          isActive && 'rotate-0'
        )}
      >
        {IconXmark}
      </button>
    </div>
  )
}

export default Book
