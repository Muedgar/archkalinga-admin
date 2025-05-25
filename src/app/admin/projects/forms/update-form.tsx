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
import { getProject, updateProject } from '@/store/thunks'
import { toast } from 'react-toastify'
import { useParams, useRouter } from 'next/navigation'
import { ProjectFormValues, projectSchema } from '../schemas'

const UpdateProjectForm = () => {
  const router = useRouter()
  const { id } = useParams()
  const dispatch = useDispatch<AppDispatch>()
  const { currentProject, loading } = useSelector((state: RootState) => state.project)

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: '',
    },
  })

  useEffect(() => {
    if (id) {
      dispatch(getProject({ id: `${id}` }))
    }
  }, [dispatch, id])

  useEffect(() => {
    if (currentProject) {
      form.setValue('name', currentProject.name)
    }
  }, [form, currentProject])

  const onSubmit = async (data: ProjectFormValues) => {
    await dispatch(updateProject({ id: `${id}`, params: { ...data } }))
      .unwrap()
      .then(() => {
        toast.success('Updated Project Successfully')
        router.push('/admin/projects')
      })
      .catch((error) => {
        toast.error(error)
      })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Project Name */}
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

export default UpdateProjectForm
