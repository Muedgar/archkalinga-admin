'use client'

import { AuthLayout } from '@/components/layout/auth-layout'
import React from 'react'
import RegisterForm from './forms/register-form'

export default function Register() {
  return (
    <AuthLayout>
      <RegisterForm />
    </AuthLayout>
  )
}
