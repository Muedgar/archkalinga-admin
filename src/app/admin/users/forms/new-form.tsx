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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store/store'
import { createUser, getRoles } from '@/store/thunks'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { UserFormValues, userSchema } from '../schemas'
import { UserType } from '@/types'
import { useEffect } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { IRole } from '@/interfaces'

const NewUserForm = () => {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const loading = useSelector((state: RootState) => state.user.loading)
  const { roles } = useSelector((state: RootState) => state.role)
  const form = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      userName: '',
      firstName: '',
      lastName: '',
      title: 'Mr',
      email: '',
      role: '',
      userType: UserType.SITE_AGENT,
    },
  })
  useEffect(() => {
    dispatch(getRoles({ page: 1, limit: 400 }))
  }, [dispatch])
  const onSubmit = async (data: UserFormValues) => {
    await dispatch(
      createUser({
        ...data,
        userType: data.userType as UserType, // Ensure correct enum type
      })
    )
      .unwrap()
      .then(() => {
        toast.success('User created successfully')
        router.push('/admin/users')
      })
      .catch(() => {
        toast.error('Something went wrong.')
      })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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

          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      {roles?.map((role: IRole) => (
                        <SelectItem key={role.id} value={role.id}>
                          {role.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="userType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>User Type</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a user type" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.values(UserType).map((type) => (
                        <SelectItem key={type} value={type}>
                          {type
                            .replace('_', ' ')
                            .toLowerCase()
                            .replace(/^\w/, (c) => c.toUpperCase())}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
              disabled={loading}
              className="w-full bg-yellow-500 hover:bg-yellow-600 flex items-center justify-center"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : null}
              {loading ? 'Creating...' : 'Create'}
            </Button>
          </div>
        </>
      </form>
    </Form>
  )
}

export default NewUserForm
