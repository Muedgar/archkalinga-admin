'use client'

import { useEffect } from 'react'
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
import { getProjects, getTask, updateTask } from '@/store/thunks'
import { toast } from 'react-toastify'
import { useParams, useRouter } from 'next/navigation'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { IProject } from '@/interfaces'
import { TaskFormValues, taskSchema } from '../schemas'

const UpdateTaskForm = () => {
  const router = useRouter()
  const { id } = useParams()
  const dispatch = useDispatch<AppDispatch>()
  const { currentTask, loading } = useSelector((state: RootState) => state.task)
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

  useEffect(() => {
    if (id) {
      dispatch(getTask({ id: `${id}` }))
    }
  }, [dispatch, id])
  

  useEffect(() => {
    if (currentTask) {
      form.setValue('name', currentTask.name)
      if (currentTask.project) {
        form.setValue('projectId', currentTask.project.id)
      }
    }
  }, [form, currentTask])

  const onSubmit = async (data: TaskFormValues) => {
    await dispatch(updateTask({ id: `${id}`, params: { ...data } }))
      .unwrap()
      .then(() => {
        toast.success('Updated Task Successfully')
        router.push('/admin/tasks')
      })
      .catch((error) => {
        toast.error(error)
      })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Task Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter project name" {...field} />
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
            {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
            {loading ? 'Updating...' : 'Update'}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default UpdateTaskForm
