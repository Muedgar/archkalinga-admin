import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

type SidebarState = {
  isOpen: boolean
  toggleOpen: () => void
  getOpenState: () => boolean
  openSidebar: (value: boolean) => void
}

export const useSidebarStore = create(
  persist<SidebarState>(
    (set, get) => ({
      isOpen: true,
      toggleOpen: () => {
        set({ isOpen: !get().isOpen })
      },
      getOpenState: () => {
        return get().isOpen
      },
      openSidebar: (value: boolean) => {
        set({
          isOpen: value,
        })
      },
    }),
    {
      name: 'sidebar-store',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
