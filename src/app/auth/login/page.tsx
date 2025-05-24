'use client'

import { AuthLayout } from '@/components/layout/auth-layout'
import React from 'react'
import LoginForm from './forms/login-form'

export default function Login() {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  )
}
