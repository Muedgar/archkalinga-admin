// src/components/ThemeProvider.tsx
'use client'

import { Theme } from '@radix-ui/themes'
import { ReactNode } from 'react'
import { ToastContainer } from 'react-toastify'

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <Theme>
      <ToastContainer />
      {children}
    </Theme>
  )
}
