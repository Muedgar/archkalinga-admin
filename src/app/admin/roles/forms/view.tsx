'use client'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'next/navigation'
import { AppDispatch, RootState } from '@/store/store'
import { getRole } from '@/store/thunks'
import { Loader2Icon, KeyIcon, ListChecks } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

export default function ViewRoleForm() {
  const { id } = useParams()
  const dispatch = useDispatch<AppDispatch>()
  const { loading, currentRole } = useSelector((state: RootState) => state.role)

  useEffect(() => {
    if (id) {
      dispatch(getRole({ id: `${id}` }))
    }
  }, [dispatch, id])

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center mt-32">
        <p className="flex items-center gap-2 text-muted-foreground">
          Fetching Role Details <Loader2Icon className="animate-spin w-5 h-5" />
        </p>
      </div>
    )
  }

  if (!currentRole) {
    return (
      <div className="w-full flex justify-center items-center mt-32">
        <p className="text-destructive">No Role Details Found</p>
      </div>
    )
  }

  const { name, permissions, status } = currentRole

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <KeyIcon className="w-5 h-5 text-primary" /> {name}
          </CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
          <InfoRow
            label="Status"
            value={
              <Badge variant={status ? 'active' : 'inactive'}>
                {status ? 'Active' : 'Inactive'}
              </Badge>
            }
          />
          <div className="md:col-span-2">
            <InfoRow
              label="Permissions"
              icon={<ListChecks className="w-4 h-4" />}
              value={
                <div className="flex flex-wrap gap-2 mt-1">
                  {permissions && permissions.length > 0 ? (
                    permissions.map((permission: { name: string }) => (
                      <Badge
                        key={permission.name}
                        variant="secondary"
                        className="text-xs"
                      >
                        {permission.name}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-muted-foreground">
                      No permissions assigned
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
