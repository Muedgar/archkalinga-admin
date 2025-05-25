'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useParams, useRouter, useSearchParams } from 'next/navigation'

// UI
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

// Store
import { AppDispatch, RootState } from '@/store/store'
import { getShellQuantity, updateShellQuantity } from '@/store/thunks'

// Schema
import { ShellQuantityFormValues, shellQuantitySchema } from '../schemas/shellquantity.schema'
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from '@/components/ui/select'

const UpdateShellQuantityForm = () => {
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()
  const {id} = useParams()
  const searchParams = useSearchParams()
  const itemTaskToQuantity = searchParams.get('item')

  const {loading, currentShellQuantity} = useSelector((state: RootState) => state.shellQuantity)
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

  // Load existing shell quantity data
  useEffect(() => {
    if (id) {
      dispatch(getShellQuantity({ id: `${id}` }))
      .unwrap()
    }
  }, [dispatch, id])

  useEffect(() => {
    if (currentShellQuantity) {
        const foundItem = currentShellQuantity.itemTaskQuantity.find(item => item.id === itemTaskToQuantity)
      form.reset({
        amount: foundItem?.amount.toString() || '',
        unit: foundItem?.unit || '',
      })
      form.setValue('itemId', foundItem?.item?.id || '')
      form.setValue('taskId', foundItem?.task?.id || '')
    }
  }, [form, currentShellQuantity, id, itemTaskToQuantity])

  const onSubmit = async (data: ShellQuantityFormValues) => {
    if (!itemTaskToQuantity) return
    await dispatch(updateShellQuantity({ id: itemTaskToQuantity, params: { amount: Number(data.amount) } }))
      .unwrap()
      .then(() => {
        toast.success('Shell Quantity updated successfully')
        router.push('/admin/shell')
      })
      .catch((error) => {
        toast.error(error || 'Failed to update shell quantity')
      })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

        {/* Unit */}
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
                <Input type="number" placeholder="Enter new amount" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Shell Item Select with Autocomplete */}
        <FormField
          control={form.control}
          name="itemId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Shell Item</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select an item" />
                  </SelectTrigger>
                  <SelectContent>
                    {shellItems?.map((item) => (
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

        {/* Task Select with Autocomplete */}
        <FormField
          control={form.control}
          name="taskId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Task</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a task" />
                  </SelectTrigger>
                  <SelectContent>
                    {tasks?.map((task) => (
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
            {loading ? 'Updating...' : 'Update Shell Quantity'}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default UpdateShellQuantityForm