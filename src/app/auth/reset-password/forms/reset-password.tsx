'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { EyeIcon, EyeOffIcon, Loader2 } from 'lucide-react'

// Import the form components
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store/store'
import { resetPassword } from '@/store/thunks'
import { toast } from 'react-toastify'
import { useRouter, useSearchParams } from 'next/navigation'
import { ResetPasswordFormValues, resetPasswordSchema } from '../schemas'
import { useState } from 'react'

const ResetPasswordForm = () => {
   const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const loading = useSelector((state: RootState) => state.auth.loading)
  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: ''
    },
  })

  const onSubmit = async (data: ResetPasswordFormValues) => {
    if (!token) {
      toast.error('no token')
      return
    }
    await dispatch(
      resetPassword({
        token: `${token}`,
        params: {
          password: data.password,
          confirmPassword: data.confirmPassword,
        },
      })
    )
      .unwrap()
      .then(() => {
        toast.success('Reset password link sent to your email.')
        router.push('/auth/login')
      })
      .catch((error) => {
        console.log(error)
        toast.error('Something went wrong.')
      })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Heading */}
        <h1 className="text-xl font-bold mb-2 text-start">Reset Password</h1>
        <>
         {/* Password with mask toggle */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter your password"
                        {...field}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOffIcon className="h-4 w-4" />
                        ) : (
                          <EyeIcon className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Password with mask toggle */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Enter confirm password"
                        {...field}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? (
                          <EyeOffIcon className="h-4 w-4" />
                        ) : (
                          <EyeIcon className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

          {/* Submit Button */}
          {/* Back and Submit Buttons */}
          <div className="flex space-x-4">
            <Button
              type="submit"
              // disabled={loading}
              className="w-full bg-yellow-500 hover:bg-yellow-600 flex items-center justify-center"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : null}
              {loading ? 'Sending reset link...' : 'Send Reset Password Email.'}
            </Button>
          </div>
        </>
      </form>
    </Form>
  )
}

export default ResetPasswordForm
