'use client'

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "next/navigation"
import { AppDispatch, RootState } from "@/store/store"
import { getShellItem } from "@/store/thunks"
import { Loader2Icon, DrillIcon, TextIcon, CurlyBracesIcon, TimerIcon, AxeIcon, BanIcon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { IShellItem } from "@/interfaces"


export default function ViewShellItemForm() {
  const { id } = useParams()
  const dispatch = useDispatch<AppDispatch>()
  const { loading, currentShellItem } = useSelector((state: RootState) => state.shellItem)

  useEffect(() => {
    if (id) {
      dispatch(getShellItem({ id: `${id}` }))
    }
  }, [dispatch, id])

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center mt-32">
        <p className="flex items-center gap-2 text-muted-foreground">
          Fetching Shell Item Details <Loader2Icon className="animate-spin w-5 h-5" />
        </p>
      </div>
    )
  }

  if (!currentShellItem) {
    return (
      <div className="w-full flex justify-center items-center mt-32">
        <p className="text-destructive">No Shell Item Details Found</p>
      </div>
    )
  }

  const {
    description,
    unit,
    shellSubCategory,
  }: IShellItem = currentShellItem

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <DrillIcon className="w-5 h-5 text-primary" /> Shell Item Details
          </CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
          <InfoRow icon={<TextIcon className="w-4 h-4" />} label="Description" value={description} />
          <InfoRow icon={<CurlyBracesIcon className="w-4 h-4" />} label="Unit" value={unit} />
          <InfoRow icon={<TimerIcon className="w-4 h-4" />} label="Sub category" value={shellSubCategory?.name} />
          <InfoRow icon={<AxeIcon className="w-4 h-4" />} label="Category" value={shellSubCategory?.shellCategory?.name} />
          <InfoRow icon={<BanIcon className="w-4 h-4" />} label="Phase" value={shellSubCategory?.shellCategory?.shellPhase?.name} />
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
