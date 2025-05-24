// components/NavigationListener.tsx
'use client'

import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation'
import { RootState } from '@/store/store'
import { clearRedirect } from '@/store/slices/navigationSlice'

export const NavigationListener = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const redirectPath = useSelector(
    (state: RootState) => state.navigation.redirectPath
  )

  useEffect(() => {
    if (redirectPath) {
      router.push(redirectPath)
      dispatch(clearRedirect())
    }
  }, [redirectPath, router, dispatch])

  return null
}
