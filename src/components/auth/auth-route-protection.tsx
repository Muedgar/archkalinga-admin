'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { Loader2 } from 'lucide-react'

const RedirectIfAuthenticated = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const router = useRouter()
  const token = useSelector((state: RootState) => state.auth.token)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    const savedToken =
      token || (typeof window !== 'undefined' && localStorage.getItem('token'))
    if (savedToken) {
      router.replace('/admin')
    } else {
      setChecking(false)
    }
  }, [token, router])

  if (checking) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-gray-600">
        <Loader2 className="w-6 h-6 animate-spin mb-4 text-yellow-500" />
        {/* <p className="text-sm font-medium">Redirecting to dashboard...</p> */}
      </div>
    )
  }

  return <>{children}</>
}

export default RedirectIfAuthenticated
