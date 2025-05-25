'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

// UI components
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

// Store
import { AppDispatch, RootState } from '@/store/store'
import { getTasks, getShellItems, createShellQuantity } from '@/store/thunks'

// Types
import { IShellItem, ITask } from '@/interfaces'
import { ShellQuantityFormValues, shellQuantitySchema } from '../schemas/shellquantity.schema'

const NewShellQuantityForm = () => {
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()

  const loading = useSelector((state: RootState) => state.shellQuantity.loading)
  const { shellItems } = useSelector((state: RootState) => state.shellItem)
  const { tasks } = useSelector((state: RootState) => state.task)

  const form = useForm<ShellQuantityFormValues>({
    resolver: zodResolver(shellQuantitySchema),
    defaultValues: {
      unit: '',
      amount: '',
      itemId: '',
      taskId: '',
    },
  })

  useEffect(() => {
  dispatch(getShellItems({ page: 1, limit: 200 }))
  dispatch(getTasks({ page: 1, limit: 200 }))
}, [dispatch])

// Watch itemId and update unit when itemId changes
useEffect(() => {
  const subscription = form.watch((value, { name }) => {
    if (name === 'itemId') {
      const selectedItem = shellItems?.find(item => item.id === value.itemId)
      if (selectedItem) {
        form.setValue('unit', selectedItem.unit, { shouldValidate: true })
      }
    }
  })

  return () => subscription.unsubscribe()
}, [form, shellItems])


  const onSubmit = async (data: ShellQuantityFormValues) => {
    await dispatch(createShellQuantity({ ...data, amount: Number(data.amount) }))
      .unwrap()
      .then(() => {
        toast.success('Shell Quantity created successfully')
        router.push('/admin/shell')
      })
      .catch((error) => {
        toast.error(error || 'Something went wrong while creating shell quantity')
      })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

       <FormField
  control={form.control}
  name="unit"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Unit</FormLabel>
      <FormControl>
        <Input disabled placeholder="Auto-filled from item" {...field} readOnly />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>


        {/* Amount */}
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Enter quantity amount" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Item Selection */}
        <FormField
          control={form.control}
          name="itemId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Shell Item</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an item" />
                  </SelectTrigger>
                  <SelectContent>
                    {shellItems?.map((item: IShellItem) => (
                      <SelectItem key={item.id} value={item.id}>
                        {item.description}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Task Selection */}
        <FormField
          control={form.control}
          name="taskId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Task</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a task" />
                  </SelectTrigger>
                  <SelectContent>
                    {tasks?.map((task: ITask) => (
                      <SelectItem key={task.id} value={task.id}>
                        {task.name}
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
        <div className="flex space-x-4">
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-500 hover:bg-yellow-600 flex items-center justify-center"
          >
            {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            {loading ? 'Creating...' : 'Create Shell Quantity'}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default NewShellQuantityForm
