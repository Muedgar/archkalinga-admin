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
  createGetTotalItemUsageAccrossTasks,
  getProjects,
  getShellItems,
} from '@/store/thunks'
import {
  ArrowRight,
  ChevronDown,
  DrillIcon,
  Loader2,
  PlusCircleIcon,
  Scale3D,
  WrenchIcon,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import {
  GetTotalItemUsageAccrossTasksFormValues,
  getTotalItemUsageAccrossTasksSchema,
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
import { IProject, IShellItem } from '@/interfaces'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'

export const GetTotalItemUsageAccrossTasks = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [isCollapse, setIsCollapse] = useState(true)
  const { projects } = useSelector((state: RootState) => state.project)
  const { shellItems } = useSelector((state: RootState) => state.shellItem)
  const { loading, currentCreateGetTotalItemUsageAccrossTasks } = useSelector(
    (state: RootState) => state.createGetTotalItemUsageAccrossTasks
  )

  const form = useForm<GetTotalItemUsageAccrossTasksFormValues>({
    resolver: zodResolver(getTotalItemUsageAccrossTasksSchema),
    defaultValues: {
      itemId: '',
      projectId: '',
    },
  })

  useEffect(() => {
    dispatch(getShellItems({ page: 1, limit: 400 }))
    dispatch(getProjects({ page: 1, limit: 400 }))
  }, [dispatch])

  const onSubmit = async (data: GetTotalItemUsageAccrossTasksFormValues) => {
    await dispatch(
      createGetTotalItemUsageAccrossTasks({
        ...data,
      })
    )
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

                  {/* Shell Item */}
                  <FormField
                    control={form.control}
                    name="itemId"
                    render={({ field }) => (
                      <FormItem className="w-full md:w-1/3">
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
                              {shellItems?.map((item: IShellItem) => (
                                <SelectItem key={item.id} value={item.id}>
                                  <p className="flex">
                                    {
                                      item.shellSubCategory.shellCategory
                                        .shellPhase.name
                                    }{' '}
                                    <ArrowRight />{' '}
                                    {item.shellSubCategory.shellCategory.name}{' '}
                                    <ArrowRight /> {item.shellSubCategory.name}{' '}
                                    <ArrowRight /> {item.description}
                                  </p>
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
      <Card className="mt-4">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <DrillIcon className="w-5 h-5 text-primary" /> Get total item usage
            accross tasks
          </CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
          <InfoRowLink
            icon={<WrenchIcon className="w-4 h-4" />}
            label="Item"
            value={currentCreateGetTotalItemUsageAccrossTasks?.item}
            href={`admin/shell/view/${currentCreateGetTotalItemUsageAccrossTasks?.itemId}`}
          />
          <InfoRow
            icon={<Scale3D className="w-4 h-4" />}
            label="Unit"
            value={currentCreateGetTotalItemUsageAccrossTasks?.unit}
          />
          <InfoRow
            icon={<PlusCircleIcon className="w-4 h-4" />}
            label="Total"
            value={currentCreateGetTotalItemUsageAccrossTasks?.total}
          />
        </CardContent>
      </Card>
    </div>
  )
}

function InfoRow({
  label,
  value,
  icon,
}: {
  label: string
  value: React.ReactNode
  icon?: React.ReactNode
}) {
  return (
    <div className="space-y-1">
      <p className="text-sm text-muted-foreground flex items-center gap-1">
        {icon} {label}
      </p>
      {value || '—'}
    </div>
  )
}

function InfoRowLink({
  label,
  value,
  icon,
  href,
}: {
  label: string
  value: React.ReactNode
  icon?: React.ReactNode
  href: string
}) {
  return (
    <Link href={href} className="space-y-1">
      <p className="text-sm text-muted-foreground flex items-center gap-1 underline">
        {icon} {label}
      </p>
      {value || '—'}
    </Link>
  )
}
