'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { Loader2 } from 'lucide-react'

const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  const token = useSelector((state: RootState) => state.auth.token)
  const [checkingAuth, setCheckingAuth] = useState(true)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedToken = localStorage.getItem('token')
      if (!token && !savedToken) {
        router.replace('/auth/login')
      } else {
        setCheckingAuth(false)
      }
    }
  }, [token, router])

  if (checkingAuth) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-gray-600">
        <Loader2 className="w-6 h-6 animate-spin mb-4 text-yellow-500" />
        {/* <p className="text-sm font-medium">Redirecting to login...</p> */}
      </div>
    )
  }

  return <>{children}</>
}

export default RequireAuth
