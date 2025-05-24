'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { RegisterFormValues, registerSchema } from '../schemas/register-schema'
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store/store'
import { register } from '@/store/thunks'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

const RegisterForm = () => {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [showPassword, setShowPassword] = useState(false)
  const dispatch = useDispatch<AppDispatch>()
  const loading = useSelector((state: RootState) => state.auth.loading)
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      userName: '',
      firstName: '',
      lastName: '',
      title: 'Mr',
      email: '',
      password: '',
      organizationName: '',
      organizationAddress: '',
      organizationCity: '',
      organizationCountry: '',
    },
  })

  const onSubmit = async (data: RegisterFormValues) => {
    await dispatch(register({ ...data }))
      .unwrap()
      .then(() => {
        toast.success('Register Successfull')
        router.push('/auth/login')
      })
      .catch(() => {
        toast.error('Something went wrong.')
      })
  }

  const handleNext = async () => {
    const isValid = await form.trigger([
      'userName',
      'firstName',
      'lastName',
      'title',
      'email',
      'password',
    ])

    if (isValid) {
      setStep(2)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Heading */}
        <h1 className="text-xl font-bold mb-2 text-start">Register</h1>
        {step === 1 && (
          <>
            {/* --- Step 1: User Info --- */}

            {/* Username */}
            <FormField
              control={form.control}
              name="userName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* First Name */}
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your first name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Last Name */}
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your last name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Title as Radix RadioGroup */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="flex flex-row space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Mr" id="mr" />
                        <FormLabel
                          htmlFor="mr"
                          className="font-normal cursor-pointer"
                        >
                          Mr
                        </FormLabel>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Mrs" id="mrs" />
                        <FormLabel
                          htmlFor="mrs"
                          className="font-normal cursor-pointer"
                        >
                          Mrs
                        </FormLabel>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Ms" id="ms" />
                        <FormLabel
                          htmlFor="ms"
                          className="font-normal cursor-pointer"
                        >
                          Ms
                        </FormLabel>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Dr" id="dr" />
                        <FormLabel
                          htmlFor="dr"
                          className="font-normal cursor-pointer"
                        >
                          Dr
                        </FormLabel>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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

            {/* Next Button */}
            <Button
              type="button"
              onClick={handleNext}
              disabled={loading}
              className="w-full bg-yellow-500 hover:bg-yellow-600"
            >
              Next
            </Button>
          </>
        )}

        {step === 2 && (
          <>
            {/* --- Step 2: Organization Info --- */}

            {/* Organization Name */}
            <FormField
              control={form.control}
              name="organizationName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Organization Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter organization name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Organization Address */}
            <FormField
              control={form.control}
              name="organizationAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Organization Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter organization address"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Organization City */}
            <FormField
              control={form.control}
              name="organizationCity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Organization City</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter organization city" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Organization Country */}
            <FormField
              control={form.control}
              name="organizationCountry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Organization Country</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter organization country"
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
                type="button"
                onClick={() => setStep(1)}
                disabled={loading}
                className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800"
              >
                Back
              </Button>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-yellow-500 hover:bg-yellow-600 flex items-center justify-center"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : null}
                {loading ? 'Registering...' : 'Register'}
              </Button>
            </div>
          </>
        )}
      </form>
    </Form>
  )
}

export default RegisterForm
