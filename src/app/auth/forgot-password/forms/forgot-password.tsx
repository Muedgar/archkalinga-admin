'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'

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
import { forgotPassword } from '@/store/thunks'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { ForgotPasswordFormValues, forgotPasswordSchema } from '../schemas'

const ForgotPasswordForm = () => {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const loading = useSelector((state: RootState) => state.auth.loading)
  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    await dispatch(forgotPassword({ ...data }))
      .unwrap()
      .then(() => {
        toast.success('Reset password link sent to your email.')
        router.push('/auth/login')
      })
      .catch(() => {
        toast.error('Something went wrong.')
      })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Heading */}
        <h1 className="text-xl font-bold mb-2 text-start">Forgot Password</h1>
        <>
          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    {...field}
                  />
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

export default ForgotPasswordForm
