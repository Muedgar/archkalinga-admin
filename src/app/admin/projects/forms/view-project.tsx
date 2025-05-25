'use client'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'next/navigation'
import { AppDispatch, RootState } from '@/store/store'
import { getProject } from '@/store/thunks'
import { Loader2Icon, Mail, DrillIcon, ListChecks } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { IProject } from '@/interfaces'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

export default function ViewProjectForm() {
  const { id } = useParams()
  const dispatch = useDispatch<AppDispatch>()
  const { loading, currentProject } = useSelector(
    (state: RootState) => state.project
  )

  useEffect(() => {
    if (id) {
      dispatch(getProject({ id: `${id}` }))
    }
  }, [dispatch, id])

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center mt-32">
        <p className="flex items-center gap-2 text-muted-foreground">
          Fetching Project Details{' '}
          <Loader2Icon className="animate-spin w-5 h-5" />
        </p>
      </div>
    )
  }

  if (!currentProject) {
    return (
      <div className="w-full flex justify-center items-center mt-32">
        <p className="text-destructive">No Project Details Found</p>
      </div>
    )
  }

  const { name, createdBy, tasks }: IProject = currentProject

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <DrillIcon className="w-5 h-5 text-primary" /> {name}
          </CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
          <InfoRow
            icon={<Mail className="w-4 h-4" />}
            label="Created By"
            value={createdBy.userName}
          />
          <div className="md:col-span-2">
            <InfoRow
              label="Tasks"
              icon={<ListChecks className="w-4 h-4" />}
              value={
                <div className="flex flex-wrap gap-2 mt-1">
                  {tasks && tasks.length > 0 ? (
                    tasks.map((task: { id: string; name: string }) => (
                      <Link
                        prefetch={true}
                        key={task.id}
                        href={`/admin/tasks/view/${task.id}`}
                        className="underline"
                      >
                        <Badge
                          variant="secondary"
                          className="text-xs underline hover:font-extrabold"
                        >
                          {task.name}
                        </Badge>
                      </Link>
                    ))
                  ) : (
                    <span className="text-muted-foreground">
                      No tasks found
                    </span>
                  )}
                </div>
              }
            />
          </div>
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
