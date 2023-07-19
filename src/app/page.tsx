import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="relative">
      <section className="pb-3 h-screen grid place-content-center">
        <h1 className="text-8xl max-[600px]:text-6xl tracking-tighter text-center max-w-max mx-auto font-extrabold text-transparent bg-gradient-to-l from-rose-500 to-orange-500 bg-clip-text">
          Tu biblioteca
        </h1>
        <h2 className="text-center text-3xl text-neutral-400 tracking-tight py-2 font-semibold">
          Development by{' '}
          <Link
            href="https://github.com/daustinn"
            className="hover:text-white hover:underline"
            target="_blank"
          >
            Daustinn
          </Link>
        </h2>
        <div className="flex items-center justify-center gap-2">
          <Link
            target="_blank"
            href="https://github.com/midudev/pruebas-tecnicas"
            className="font-semibold hover:underline text-blue-400"
          >
            <span>Technical test</span>
          </Link>
          By
          <Link
            href="https://github.com/midudev"
            className="border-2 bg-neutral-600/30 border-neutral-600 flex items-center p-[2px] rounded-full"
            target="_blank"
          >
            <Image
              src="https://avatars.githubusercontent.com/u/1561955?v=4"
              alt="Miudu dev Profile"
              width={25}
              height={25}
              className="rounded-full"
            />
            <span className="px-1">MiduDev</span>
          </Link>
        </div>
      </section>
    </main>
  )
}
