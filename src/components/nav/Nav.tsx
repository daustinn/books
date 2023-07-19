'use client'
import { useBookReading } from '@context'
import { IconGithub } from '@icons'
import Link from 'next/link'
import React from 'react'
import ItemNav from './ItemNav'
import Search from './Search'

/**
 * Nav component represents the navigation bar.
 */
export function Nav() {
  const { books } = useBookReading()

  return (
    <nav className="h-full relative bg-neutral-950/80  border border-neutral-500/40 p-1 rounded-full overflow-hidden">
      <div className="inset-0 select-none pointer-events-none absolute bg-transparent backdrop-blur-md"></div>
      <ul className="flex gap-1 items-center text-neutral-200">
        <ItemNav href="/" title="Home" />
        <ItemNav href="/books" title="Books" />
        {books.length > 0 && (
          <ItemNav
            href="/reading"
            title={
              <div className="flex items-center gap-1">
                <div className="flex">
                  {books.slice(0, 4).map((book) => (
                    <div
                      className="w-8 h-8 ml-[-10px] border-2 border-neutral-950 overflow-hidden rounded-full"
                      key={book.ISBN + 'canvas'}
                    >
                      <img src={book.cover} alt="" />
                    </div>
                  ))}
                  {books.length - 4 > 0 && (
                    <div className="w-8 min-w-[32px] h-8 ml-[-10px] grid place-content-center bg-neutral-700 overflow-hidden rounded-full">
                      <span className="block text-xs">+{books.length - 4}</span>
                    </div>
                  )}
                </div>
              </div>
            }
          />
        )}
        <li className="max-[500px]:hidden min-w-[200px] relative">
          <Search />
        </li>
        <li className="ml-1 relative">
          <Link
            target="_blank"
            className="flex gap-2 pr-1 hover:text-white text-neutral-300 text-sm rounded-full items-center"
            href="https://github.com/daustinn/books"
          >
            <span className="w-7 block">{IconGithub}</span>
          </Link>
        </li>
      </ul>
    </nav>
  )
}
