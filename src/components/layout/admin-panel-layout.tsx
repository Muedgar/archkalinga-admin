'use client'

import { useSidebarStore } from '@/hooks/use-sidebar'
import { useStore } from '@/hooks/use-store'
import { cn } from '@/lib/utils'
import { setupInterceptors, useIsMobile } from '@/hooks'
import { useEffect } from 'react'
import SideBar from '../navigation/sidebar-two'
import { SidebarProvider } from '../ui/sidebar'
import RequireAuth from '../auth/admin-route-protection'

export default function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    setupInterceptors()
  }, [])

  const isMobile = useIsMobile()

  const sidebar = useStore(useSidebarStore, (x) => x)
  if (!sidebar) return null
  const { getOpenState } = sidebar
  return (
    <RequireAuth>
      <SidebarProvider>
        <SideBar />
        {/* put main content here */}
        {!isMobile ? (
          <section
            className={cn(
              'fixed top-0 bg-white h-screen overflow-y-auto transition-all ease-in duration-300',
              getOpenState() ? 'left-[90px] right-0' : 'left-72 right-0'
            )}
          >
            {children}
          </section>
        ) : (
          <section className="fixed top-0 left-0 right-0 bg-white h-screen overflow-y-auto transition-all ease-in duration-300">
            {children}
          </section>
        )}
      </SidebarProvider>
    </RequireAuth>
  )
}
