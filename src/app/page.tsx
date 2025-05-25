'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'

export default function Home() {
  const router = useRouter()
  const [redirecting, setRedirecting] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      router.replace('/auth/register')
      setRedirecting(false)
    }, 400) // Short delay just for visual feedback
  }, [router])

  if (redirecting) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-gray-600">
        <Loader2 className="w-6 h-6 animate-spin mb-4 text-yellow-500" />
      </div>
    )
  }

  return null
}
