'use client'

import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CheckIcon, Loader2 } from 'lucide-react'

// Import the form components
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store/store'
import { assignUsersTask, getTask, getUsers } from '@/store/thunks'
import { toast } from 'react-toastify'
import { useParams, useRouter } from 'next/navigation'
import { IUser } from '@/interfaces'
import { AssignUsersTaskFormValues, assignUsersTaskSchema } from '../schemas'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib'
import { Checkbox } from '@/components/ui/checkbox'

const AssignUsersTaskForm = () => {
  const router = useRouter()
  const { id } = useParams()
  const dispatch = useDispatch<AppDispatch>()
  const { loading, currentTask } = useSelector((state: RootState) => state.task)
  const { users } = useSelector((state: RootState) => state.user)

  const form = useForm<AssignUsersTaskFormValues>({
    resolver: zodResolver(assignUsersTaskSchema),
    defaultValues: {
      usersId: [],
    },
  })

  useEffect(() => {
    dispatch(getUsers({ page: 1, limit: 400 }))
  }, [dispatch])

  useEffect(() => {
    if (id) {
      dispatch(getTask({ id: `${id}` }))
    }
  }, [dispatch, id])

  useEffect(() => {
    if (currentTask) {
      form.setValue(
        'usersId',
        currentTask.assignedUsers?.map((user) => user.id)
      )
    }
  }, [form, currentTask])

  const onSubmit = async (data: AssignUsersTaskFormValues) => {
    await dispatch(assignUsersTask({ id: `${id}`, params: { ...data } }))
      .unwrap()
      .then(() => {
        toast.success('Assigned Users To Task Successfully')
        router.push('/admin/tasks')
      })
      .catch((error) => {
        toast.error(error)
      })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Users Multi-Select */}
        <FormField
          control={form.control}
          name="usersId"
          render={({}) => (
            <FormItem>
              <FormLabel>Users</FormLabel>
              <Controller
                control={form.control}
                name="usersId"
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
                            : 'Select users'}
                          <CheckIcon className="ml-2 h-4 w-4 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full max-h-60 overflow-y-auto">
                        {users?.map((user: IUser) => (
                          <div
                            key={user.id}
                            className="flex items-center space-x-2 py-1"
                          >
                            <Checkbox
                              id={user.id}
                              checked={field.value.includes(user.id)}
                              onCheckedChange={(checked: boolean) => {
                                if (checked) {
                                  field.onChange([...field.value, user.id])
                                } else {
                                  field.onChange(
                                    field.value.filter(
                                      (v: string) => v !== user.id
                                    )
                                  )
                                }
                              }}
                            />
                            <label
                              htmlFor={user.id}
                              className="text-sm font-medium leading-none"
                            >
                              {user.firstName} {user.lastName}
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
            {loading ? 'Assigning Users...' : 'Assign Users'}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default AssignUsersTaskForm
