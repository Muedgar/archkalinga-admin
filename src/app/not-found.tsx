// app/not-found.tsx
'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeftIcon } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <div className="max-w-md">
        <h1 className="text-6xl font-bold text-yellow-500 mb-4">404</h1>
        <p className="text-xl font-semibold mb-2">Page not found</p>
        <p className="text-muted-foreground mb-6">
          The page you are looking for does not exist or has been moved.
        </p>
        <Button asChild variant="outline" className="flex items-center gap-2">
          <Link prefetch={true} href="/admin/projects">
            <ArrowLeftIcon className="w-4 h-4" />
            Go back to Admin Dashboard
          </Link>
        </Button>
      </div>
    </div>
  )
}
