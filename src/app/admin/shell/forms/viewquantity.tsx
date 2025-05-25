'use client'

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "next/navigation"
import { AppDispatch, RootState } from "@/store/store"
import { getShellQuantity } from "@/store/thunks"
import {
  Loader2Icon,
  UserIcon,
  DrillIcon,
  TextIcon,
  HashIcon,
  TimerIcon,
  CurlyBracesIcon
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { IShellQuantity } from "@/interfaces"
import Link from "next/link"

export default function ViewShellQuantity() {
  const { id } = useParams()
  const dispatch = useDispatch<AppDispatch>()
  const { loading, currentShellQuantity } = useSelector((state: RootState) => state.shellQuantity)

  useEffect(() => {
    if (id) {
      dispatch(getShellQuantity({ id: `${id}` }))
    }
  }, [dispatch, id])

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center mt-32">
        <p className="flex items-center gap-2 text-muted-foreground">
          Fetching Shell Quantity Details <Loader2Icon className="animate-spin w-5 h-5" />
        </p>
      </div>
    )
  }

  if (!currentShellQuantity) {
    return (
      <div className="w-full flex justify-center items-center mt-32">
        <p className="text-destructive">No Shell Quantity Details Found</p>
      </div>
    )
  }

  const { createdBy, itemTaskQuantity }: IShellQuantity = currentShellQuantity

  return (
    <div className="max-w-5xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <DrillIcon className="w-5 h-5 text-primary" /> Shell Quantity Details
          </CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="space-y-6 pt-6">
          <div>
            <InfoRow icon={<UserIcon className="w-4 h-4" />} label="Created By" value={`${createdBy?.firstName} ${createdBy?.lastName}`} />
          </div>
          {itemTaskQuantity?.length ? (
            itemTaskQuantity.map((entry) => (
              <Card key={entry.id} className="p-4 bg-muted/20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InfoRowLink icon={<TextIcon className="w-4 h-4" />} label="Item Description" value={entry.item?.description} url={`/admin/shell/view/${entry.item?.id}`} />
                  <InfoRow icon={<CurlyBracesIcon className="w-4 h-4" />} label="Unit" value={entry.unit} />
                  <InfoRow icon={<HashIcon className="w-4 h-4" />} label="Amount" value={entry.amount} />
                  <InfoRowLink icon={<TimerIcon className="w-4 h-4" />} label="Task Name" value={entry.task?.name} url={`/admin/tasks/view/${entry.item?.id}`} />
                </div>
              </Card>
            ))
          ) : (
            <p className="text-muted-foreground italic">No item-task quantities available.</p>
          )}
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

function InfoRowLink({ label, value, icon, url }: { label: string, value: React.ReactNode, icon?: React.ReactNode, url: string }) {
  return (
    <Link prefetch={true} href={url} className="space-y-1">
      <p className="text-sm text-muted-foreground flex items-center gap-1 underline">
        {icon} {label}
      </p>
      {value || "—"}
    </Link>
  )
}
