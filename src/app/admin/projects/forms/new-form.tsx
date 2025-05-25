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
import { createProject, getRoles } from '@/store/thunks'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { ProjectFormValues, projectSchema } from '../schemas'

const NewProjectForm = () => {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const loading = useSelector((state: RootState) => state.project.loading)
  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: '',
    },
  })
  useEffect(() => {
    dispatch(getRoles({ page: 1, limit: 400 }))
  }, [dispatch])
  const onSubmit = async (data: ProjectFormValues) => {
    await dispatch(
      createProject({
        ...data,
      })
    )
      .unwrap()
      .then(() => {
        toast.success('Project created successfully')
        router.push('/admin/projects')
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
                <FormLabel>Project name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter project name" {...field} />
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

export default NewProjectForm
