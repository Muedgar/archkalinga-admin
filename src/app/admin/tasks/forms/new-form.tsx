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
import { createTask, getProjects } from '@/store/thunks'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { TaskFormValues, taskSchema } from '../schemas'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { IProject } from '@/interfaces'

const NewTaskForm = () => {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const loading = useSelector((state: RootState) => state.task.loading)
  const { projects } = useSelector((state: RootState) => state.project)
  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      name: '',
      projectId: ''
    },
  })
  useEffect(() => {
    dispatch(getProjects({ page: 1, limit: 400 }))
  }, [dispatch])
  const onSubmit = async (data: TaskFormValues) => {
    await dispatch(
      createTask({
        ...data,
      })
    )
      .unwrap()
      .then(() => {
        toast.success('Task created successfully')
        router.push('/admin/tasks')
      })
      .catch(() => {
        toast.error('Something went wrong.')
      })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <>
          
{/* name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Task name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter task name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

                    <FormField
            control={form.control}
            name="projectId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a project" />
                    </SelectTrigger>
                    <SelectContent>
                      {projects?.map((project: IProject) => (
                        <SelectItem key={project.id} value={project.id}>
                          {project.name}
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

export default NewTaskForm
