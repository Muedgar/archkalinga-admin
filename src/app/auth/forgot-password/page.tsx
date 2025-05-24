'use client'

import { AuthLayout } from '@/components/layout/auth-layout'
import React from 'react'
import ForgotPasswordForm from './forms/forgot-password'

export default function ForgotPasword() {
  return (
    <AuthLayout>
      <ForgotPasswordForm />
    </AuthLayout>
  )
}
