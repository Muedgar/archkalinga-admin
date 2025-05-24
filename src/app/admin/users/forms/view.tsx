'use client'

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "next/navigation"
import { AppDispatch, RootState } from "@/store/store"
import { getUser } from "@/store/thunks"
import { Loader2Icon, ShieldCheck, Mail, User, Lock, Building, KeyRound } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export default function ViewUserForm() {
  const { id } = useParams()
  const dispatch = useDispatch<AppDispatch>()
  const { loading, currentUser } = useSelector((state: RootState) => state.user)

  useEffect(() => {
    if (id) {
      dispatch(getUser({ id: `${id}` }))
    }
  }, [dispatch, id])

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center mt-32">
        <p className="flex items-center gap-2 text-muted-foreground">
          Fetching User Details <Loader2Icon className="animate-spin w-5 h-5" />
        </p>
      </div>
    )
  }

  if (!currentUser) {
    return (
      <div className="w-full flex justify-center items-center mt-32">
        <p className="text-destructive">No User Details Found</p>
      </div>
    )
  }

  const {
    firstName,
    lastName,
    userName,
    email,
    title,
    organization,
    status,
    isDefaultPassword,
    userType,
    twoFactorAuthentication,
    role,
  } = currentUser

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <User className="w-5 h-5 text-primary" /> {firstName} {lastName}
          </CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
          <InfoRow icon={<Mail className="w-4 h-4" />} label="Email" value={email} />
          <InfoRow icon={<User className="w-4 h-4" />} label="Username" value={userName} />
          <InfoRow icon={<KeyRound className="w-4 h-4" />} label="Role" value={role?.name || "N/A"} />
          <InfoRow icon={<Building className="w-4 h-4" />} label="Organization" value={organization?.organizationName || "N/A"} />
          <InfoRow icon={<ShieldCheck className="w-4 h-4" />} label="2FA Enabled" value={twoFactorAuthentication ? "Yes" : "No"} />
          <InfoRow icon={<Lock className="w-4 h-4" />} label="Default Password" value={isDefaultPassword ? "Yes" : "No"} />
          <InfoRow label="User Type" value={userType} />
          <InfoRow label="Status" value={
            <Badge variant={status ? "active" : "inactive"}>
              {status ? "Active" : "Inactive"}
            </Badge>
          } />
          <InfoRow label="Title" value={title} />
        </CardContent>
      </Card>
    </div>
  )
}

function InfoRow({ label, value, icon }: { label: string, value: React.ReactNode, icon?: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <p className="text-sm text-muted-foreground flex items-center gap-1">
        {icon} {label}
      </p>
      {value || "—"}
    </div>
  )
}
