// app/components/RequireAuth.tsx
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'

const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  const token = useSelector((state: RootState) => state.auth.token)

  useEffect(() => {
    if (!token && typeof window !== 'undefined') {
      const savedToken = localStorage.getItem('token')
      if (!savedToken) {
        router.replace('/auth/login')
      }
    }
  }, [token, router])

  if (!token && typeof window !== 'undefined' && !localStorage.getItem('token')) {
    return null // Optionally show a loading spinner
  }

  return <>{children}</>
}

export default RequireAuth
