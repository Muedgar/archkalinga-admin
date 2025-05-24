'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'

const RedirectIfAuthenticated = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  const token = useSelector((state: RootState) => state.auth.token)

  useEffect(() => {
    // Try Redux first, fallback to localStorage
    const savedToken = token || (typeof window !== 'undefined' && localStorage.getItem('token'))
    if (savedToken) {
      router.replace('/admin') // or wherever you want to redirect
    }
  }, [token, router])

  const isAuthenticated = typeof window !== 'undefined' && (token || localStorage.getItem('token'))

  if (isAuthenticated) {
    return null // or <LoadingSpinner />
  }

  return <>{children}</>
}

export default RedirectIfAuthenticated
