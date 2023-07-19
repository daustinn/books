'use client'
import React from 'react'
import PageContent from './components/PageContent'

function ReadingPage() {
  return (
    <main className="">
      <div className="w-full relative top-14 max-[600px]:top-0 p-5 max-w-[1250px] mx-auto">
        <header className="py-10">
          <h1 className="text-5xl text-center font-semibold tracking-tight">
            Libros en modo Lectura{' '}
          </h1>
        </header>
        <PageContent />
      </div>
    </main>
  )
}

export default ReadingPage
