'use client'

import { useState, useRef, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { EyeIcon, EyeOffIcon, Loader2 } from 'lucide-react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store/store'
import { login, validateOtp } from '@/store/thunks'
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
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { LoginFormValues, loginSchema } from '../schemas'

const LoginForm = () => {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const loading = useSelector((state: RootState) => state.auth.loading)
  const [showPassword, setShowPassword] = useState(false)
  const [showOtpModal, setShowOtpModal] = useState(false)
  const [emailForOtp, setEmailForOtp] = useState('')
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''))
  const inputRefs = useRef<Array<HTMLInputElement | null>>([])

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  useEffect(() => {
    if (showOtpModal && inputRefs.current[0]) {
      inputRefs.current[0]?.focus()
    }
  }, [showOtpModal])

  const handleOtpChange = (index: number, value: string) => {
    if (/^\d*$/.test(value) && value.length <= 1) {
      const newOtp = [...otp]
      newOtp[index] = value
      setOtp(newOtp)

      // Auto focus to next input
      if (value && index < 5 && inputRefs.current[index + 1]) {
        inputRefs.current[index + 1]?.focus()
      }
    }
  }

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      // Move focus to previous input on backspace
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pasteData = e.clipboardData.getData('text/plain').slice(0, 6)
    if (/^\d+$/.test(pasteData)) {
      const newOtp = [...otp]
      for (let i = 0; i < pasteData.length; i++) {
        if (i < 6) {
          newOtp[i] = pasteData[i]
        }
      }
      setOtp(newOtp)
      // Focus the last input with pasted data
      const lastInputIndex = Math.min(pasteData.length - 1, 5)
      if (inputRefs.current[lastInputIndex]) {
        inputRefs.current[lastInputIndex]?.focus()
      }
    }
  }

  const handleOtpSubmit = async () => {
    const otpString = otp.join('')
    if (otpString.length !== 6) {
      toast.error('Please enter a 6-digit OTP')
      return
    }

    try {
      await dispatch(
        validateOtp({ email: emailForOtp, otp: otpString })
      ).unwrap()
      toast.success('Login successful.')
      setShowOtpModal(false)
      router.push('/admin/projects')
    } catch (error) {
      toast.error(String(error))
    }
  }

  const onSubmit = async (data: LoginFormValues) => {
    await dispatch(login({ ...data }))
      .unwrap()
      .then((d) => {
        if (d?.requiresOtp) {
          setEmailForOtp(data.email)
          setOtp(Array(6).fill('')) // Reset OTP fields
          setShowOtpModal(true)
        } else {
          toast.success('Login successful')
          router.push('/admin/projects')
        }
      })
      .catch((error) => {
        toast.error(error)
      })
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <h1 className="text-xl font-bold mb-2 text-start">Login</h1>

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

          <Button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 flex items-center justify-center"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Logging in...
              </>
            ) : (
              'Login'
            )}
          </Button>
        </form>
      </Form>

      {/* OTP Modal */}
      <AlertDialog open={showOtpModal} onOpenChange={setShowOtpModal}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Enter OTP</AlertDialogTitle>
          </AlertDialogHeader>

          <div className="space-y-4">
            <p className="text-muted-foreground text-sm text-center">
              Please enter the 6-digit verification code sent to your email.
            </p>

            <div className="flex justify-center gap-2">
              {Array.from({ length: 6 }).map((_, index) => (
                <Input
                  key={index}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={otp[index]}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  ref={(el) => {
                    inputRefs.current[index] = el
                  }}
                  className="w-12 h-14 text-center text-xl font-semibold focus-visible:ring-2 focus-visible:ring-primary"
                  autoFocus={index === 0}
                />
              ))}
            </div>
          </div>

          <AlertDialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setShowOtpModal(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleOtpSubmit}
              disabled={otp.join('').length !== 6 || loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Validating...
                </>
              ) : (
                'Verify'
              )}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default LoginForm
