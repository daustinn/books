'use client'
import { BookList } from '@components'
import { useBookReading } from '@context'
import React from 'react'

function PageContent() {
  const { books } = useBookReading()
  return <BookList initialBooks={books} />
}

export default PageContent
