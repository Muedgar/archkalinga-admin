'use client'

import { ArrowLeft } from 'lucide-react'
import { SidebarTrigger } from '../ui/sidebar'
import { useSidebarStore, useStore } from '@/hooks'
import { useIsMobile } from '@/hooks/use-mobile'
import Link from 'next/link'

interface NavBarProps {
  title: string;
  backUrl?: string;
  children?: React.ReactNode
}

export function NavBar({title, backUrl, children}: NavBarProps) {
  const isMobile = useIsMobile()
  const sidebar = useStore(useSidebarStore, (x) => x)
  if (!sidebar) return null
  const { openSidebar } = sidebar
  return (
    <nav className="sticky top-0 w-full h-[74px] bg-amber-200 glassy flex flex-row justify-between px-4 sm:pl-10 sm:pr-10">
      <div className="flex h-full w-fit justify-center items-center">
        {isMobile && (
          <SidebarTrigger
            className="hover:bg-transparent cursor-pointer"
            onClick={() => openSidebar(false)}
          />
        )}
        {backUrl && <Link href={backUrl}><ArrowLeft className="cursor-pointer" /></Link>}
        <p>{title}</p>
      </div>
      <div className="flex h-full w-fit justify-center items-center">
        {children}
      </div>
    </nav>
  )
}
