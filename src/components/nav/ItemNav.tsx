import { cn } from '@utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

type Props = {
  href: string
  title: React.ReactNode
  badge?: number | null
}

/**
 * ItemNav component represents a navigation item.
 * @param href - The URL to navigate to.
 * @param title - The title of the navigation item.
 * @param badge - The badge number (optional).
 */
function ItemNav({ href, title, badge }: Props) {
  const pathname = usePathname()
  const isActive = href !== null && pathname.endsWith(href)

  return (
    <li className="justify-center flex">
      <Link
        href={href}
        className={cn(
          'relative text-sm px-5 h-9 flex items-center py-1 rounded-3xl text-white',
          isActive && 'bg-neutral-500/20'
        )}
      >
        {isActive && (
          <div className="inset-0 bg-neutral-200/30 absolute blur-xl" />
        )}
        <span className="relative">{title}</span>
        {badge && (
          <div className="w-5 h-5 ml-1 text-white flex items-center justify-center rounded-full bg-blue-700 text-xs">
            <span>{badge}</span>
          </div>
        )}
      </Link>
    </li>
  )
}

export default ItemNav
