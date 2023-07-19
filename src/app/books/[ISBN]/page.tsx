import { getBookByISBN } from '@services'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {
  params: {
    ISBN: string
  }
}

function BookPreview({ params }: Props) {
  const book = getBookByISBN(params.ISBN)
  return (
    <main className="max-w-[1000px] px-10 max-[600px]:px-0 max-[600px]:top-5 mx-auto relative top-28">
      <div className="flex gap-4 max-[600px]:flex-col px-5 rounded-3xl">
        <div className="relative w-[300px] rounded-xl overflow-hidden min-w-[300px] ">
          <Image
            src={book?.cover ?? ''}
            alt={book?.synopsis ?? ''}
            loading="lazy"
            placeholder="empty"
            width={300}
            className="object-cover scale-105 w-full aspect-auto h-full"
            height={300}
          />
        </div>
        <div className="absolute inset-0 -z-10 overflow-hidden blur-[100px] opacity-10">
          <Image
            src={book?.cover ?? ''}
            alt={book?.synopsis ?? ''}
            loading="lazy"
            placeholder="empty"
            width={50}
            className="object-cover w-full h-full"
            height={50}
          ></Image>
        </div>
        <div className="w-full relative p-5">
          <h1 className="text-3xl tracking-tight font-semibold">
            {book?.title}
          </h1>
          <div className="flex gap-1">
            <Link href="#" className="text-lg text-blue-500 font-normal">
              {book?.author.name}
            </Link>
            <span>·</span>
            <h2 className="text-lg font-normal opacity-50">{book?.genre}</h2>
          </div>
          <p className="pt-3">{book?.synopsis}</p>
          <ul className="flex flex-col pt-2 gap-1">
            <li>
              <div className="flex gap-2">
                <span className="opacity-70">Año:</span>
                <span>{book?.year}</span>
              </div>
            </li>
            <li>
              <div className="flex gap-2">
                <span className="opacity-70">Paginas:</span>
                <span>{book?.pages}</span>
              </div>
            </li>
            <li>
              <div className="flex gap-2">
                <span className="opacity-70">ISBN:</span>
                <span>{book?.ISBN}</span>
              </div>
            </li>
          </ul>
          <footer className="">
            <span className="opacity-70">Otros libros:</span>
            <div className="flex flex-wrap gap-2 pt-1">
              {book?.author.otherBooks?.map((item, index) => {
                return (
                  <Link
                    key={index}
                    className="p-1 rounded-full px-3 border border-neutral-500"
                    href="#"
                  >
                    <span>{item}</span>
                  </Link>
                )
              })}
            </div>
          </footer>
        </div>
      </div>
    </main>
  )
}

export default BookPreview
