import { BookList, FilterNav } from '@components'
import Search from '@components/nav/Search'
import { getGenresList } from '@services'
import React from 'react'

export default function BooksPages() {
  const genres = getGenresList()
  return (
    <main className="max-w-[1300px] mx-auto relative max-[500px]:top-0 top-10 p-3">
      <div className="max-[500px]:block hidden w-full">
        <Search />
      </div>
      <header className="py-5 pt-3 flex justify-center">
        <FilterNav genres={genres} />
      </header>
      <BookList />
    </main>
  )
}
