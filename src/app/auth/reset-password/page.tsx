'use client'

import { AuthLayout } from '@/components/layout/auth-layout'
import React from 'react'
import ResetPasswordForm from './forms/reset-password'

export default function ResetPassword() {
  return (
    <AuthLayout>
      <ResetPasswordForm />
    </AuthLayout>
  )
}
