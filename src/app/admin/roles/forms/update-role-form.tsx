'use client'

import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CheckIcon, Loader2 } from 'lucide-react'

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
import { getPermissions, getRole, updateRole } from '@/store/thunks'
import { toast } from 'react-toastify'
import { useParams, useRouter } from 'next/navigation'
import { RoleFormValues, roleSchema } from '../schemas'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib'
import { IPermission } from '@/interfaces'
import { Checkbox } from '@/components/ui/checkbox'

const UpdateRoleForm = () => {
  const router = useRouter()
  const { id } = useParams()
  const dispatch = useDispatch<AppDispatch>()
  const { currentRole, loading } = useSelector((state: RootState) => state.role)
  const { permissions } = useSelector((state: RootState) => state.permission)
  const form = useForm<RoleFormValues>({
    resolver: zodResolver(roleSchema),
    defaultValues: {
      name: '',
      permissions: [],
    },
  })

  useEffect(() => {
    dispatch(getPermissions({ page: 1, limit: 400 }))
  }, [dispatch])

  useEffect(() => {
    if (id) {
      dispatch(getRole({ id: `${id}` }))
    }
  }, [dispatch, id])

  useEffect(() => {
    if (currentRole) {
      form.setValue('name', currentRole.name)
      form.setValue(
        'permissions',
        currentRole.permissions?.map((p) => p.id)
      )
    }
  }, [form, currentRole])

  const onSubmit = async (data: RoleFormValues) => {
    await dispatch(updateRole({ id: `${id}`, params: { ...data } }))
      .unwrap()
      .then(() => {
        toast.success('Updated Role Successfully')
        router.push('/admin/roles')
      })
      .catch((error) => {
        toast.error(error)
      })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Role Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter role name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Permissions Multi-Select */}
        <FormField
          control={form.control}
          name="permissions"
          render={({}) => (
            <FormItem>
              <FormLabel>Permissions</FormLabel>
              <Controller
                control={form.control}
                name="permissions"
                render={({ field }) => {
                  return (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            'w-full justify-between',
                            !field.value.length && 'text-muted-foreground'
                          )}
                        >
                          {field.value.length > 0
                            ? `${field.value.length} selected`
                            : 'Select permissions'}
                          <CheckIcon className="ml-2 h-4 w-4 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full max-h-60 overflow-y-auto">
                        {permissions?.map((permission: IPermission) => (
                          <div
                            key={permission.id}
                            className="flex items-center space-x-2 py-1"
                          >
                            <Checkbox
                              id={permission.id}
                              checked={field.value.includes(permission.id)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  field.onChange([
                                    ...field.value,
                                    permission.id,
                                  ])
                                } else {
                                  field.onChange(
                                    field.value.filter(
                                      (v: string) => v !== permission.id
                                    )
                                  )
                                }
                              }}
                            />
                            <label
                              htmlFor={permission.id}
                              className="text-sm font-medium leading-none"
                            >
                              {permission.name}
                            </label>
                          </div>
                        ))}
                      </PopoverContent>
                    </Popover>
                  )
                }}
              />
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
            {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
            {loading ? 'Updating...' : 'Update'}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default UpdateRoleForm
