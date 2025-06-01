'use client'

import { Button } from '@/components/ui/button'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { cn } from '@/lib'
import { AppDispatch, RootState } from '@/store/store'
import {
  getProjects,
  jsonShellSchedule,
} from '@/store/thunks'
import {
  ChevronDown,
  Loader2,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import {
  ProjectShellScheduleFormValues,
  projectShellScheduleSchema,
} from '../schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { IProject } from '@/interfaces'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { D3Tree } from './shell_schedule_tree'


export const ProjectShellSchedule = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [isCollapse, setIsCollapse] = useState(true)
  const { projects } = useSelector((state: RootState) => state.project)
  const { loading, projectShellSchedule } = useSelector(
    (state: RootState) => state.getShellScheduleTree
  )

  const form = useForm<ProjectShellScheduleFormValues>({
    resolver: zodResolver(projectShellScheduleSchema),
    defaultValues: {
      projectId: '',
    },
  })

  useEffect(() => {
    dispatch(getProjects({ page: 1, limit: 400 }))
  }, [dispatch])

  const onSubmit = async (data: ProjectShellScheduleFormValues) => {
    await dispatch(
      jsonShellSchedule({
        ...data,
      })
    ).unwrap()
    .then(() => {
      console.log('data:  ',projectShellSchedule)
    })
    .catch(() => {});
  }

  return (
    <div>
      {/* Collapsible and search */}
      <Collapsible className="mt-4">
        <CollapsibleTrigger
          className="[&[data-state=open]>div>div>svg]:rotate-180 mb-1"
          asChild
        >
          <Button
            onClick={() => setIsCollapse(!isCollapse)}
            className="w-full flex justify-between cursor-pointer bg-gray-100 text-black hover:bg-gray-300 hover:text-black"
          >
            <div className="flex justify-center items-center">
              <p className="ml-4">Filter And Search</p>
            </div>
            <div
              className={cn(
                'whitespace-nowrap',
                !isCollapse ? 'rotate-180' : 'rotate-0'
              )}
            >
              <ChevronDown
                size={18}
                className="transition-transform duration-200"
              />
            </div>
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
          <div className="w-full h-fit flex">
            <div className="w-full h-fit border p-5 flex flex-col rounded-lg">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="w-full flex flex-col md:flex-row md:items-end md:space-x-4 space-y-4 md:space-y-0"
                >
                  {/* Project */}
                  <FormField
                    control={form.control}
                    name="projectId"
                    render={({ field }) => (
                      <FormItem className="w-full md:w-1/3">
                        <FormLabel>Project</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
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


                  {/* Submit */}
                  <div className="w-full md:w-auto">
                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-yellow-500 hover:bg-yellow-600 flex items-center justify-center"
                    >
                      {loading && (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      )}
                      {loading ? 'Searching...' : 'Search'}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

{projectShellSchedule && (
  <Card className="mt-10">
    <CardHeader>
      <CardTitle>Shell Schedule Tree</CardTitle>
    </CardHeader>
    <CardContent className="overflow-auto">
      <div className="w-full flex justify-center">
        <D3Tree data={projectShellSchedule} width={1200} height={800} />
      </div>
    </CardContent>
  </Card>
)}

    </div>
  )
}

