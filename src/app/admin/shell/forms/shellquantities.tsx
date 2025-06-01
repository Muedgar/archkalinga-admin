// app/dashboard/page.jsx
'use client'

import DataTable from '@/components/datatable/data-table'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store/store'
import { useEffect, useState } from 'react'
import { deleteShellQuantity, getShellQuantities } from '@/store/thunks'
import { Skeleton } from '@/components/ui/skeleton'
import { ColumnDef } from '@tanstack/react-table'
import { IItemTaskQuantity, IUser } from '@/interfaces'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { MoreHorizontal } from 'lucide-react'
import { toast } from 'react-toastify'
import { DialogConfig } from '@/types'
import { ConfirmationDialog } from '@/components/alert-dialog'
import Link from 'next/link'

const handleDelete = async (
  dispatch: AppDispatch,
  shellItemQuantityId: string
) => {
  await dispatch(deleteShellQuantity({ id: shellItemQuantityId }))
    .unwrap()
    .then(() => {
      toast.success('Shell item quantity has been deleted successfully.')
      dispatch(
        getShellQuantities({
          page: 1,
          limit: 10,
        })
      )
    })
    .catch(() => {
      toast.error('Something went wrong.')
    })
}

export default function ShellQuantities() {
  // fetch data
  const dispatch = useDispatch<AppDispatch>()
  const { loading, shellQuantities, pages, page, limit } = useSelector(
    (state: RootState) => state.shellQuantity
  )
  const [dialogConfig, setDialogConfig] = useState<DialogConfig>({
    isOpen: false,
    title: '',
    description: '',
    onConfirm: () => {},
  })
  const closeDialog = () => {
    setDialogConfig((prev: DialogConfig) => ({ ...prev, isOpen: false }))
  }
  const showDeleteDialog = (itemTask: IItemTaskQuantity) => {
    setDialogConfig({
      isOpen: true,
      title: 'Delete task',
      description: `Are you sure you want to delete?`,
      onConfirm: () => {
        handleDelete(dispatch, itemTask.id)
        closeDialog()
      },
    })
  }

  useEffect(() => {
    dispatch(getShellQuantities({ page, limit }))
  }, [dispatch, page, limit])

  // columns
  const columns: ColumnDef<{
    id: string
    createdBy: IUser
    itemTaskQuantity: IItemTaskQuantity
  }>[] = [
    {
      accessorFn: (row) => row?.itemTaskQuantity?.item?.description,
      id: 'item', // Required when using accessorFn
      header: 'Item description',
      cell: ({ getValue }) => {
        const value = getValue() as string | undefined
        return <div>{value || '-'}</div>
      },
    },
    {
      accessorFn: (row) => row?.itemTaskQuantity?.task?.name,
      id: 'task', // Required when using accessorFn
      header: 'Task name',
      cell: ({ getValue }) => {
        const value = getValue() as string | undefined
        return <div>{value || '-'}</div>
      },
    },
    {
      accessorFn: (row) => row?.itemTaskQuantity?.unit,
      id: 'unit', // Required when using accessorFn
      header: 'Unit',
      cell: ({ getValue }) => {
        const value = getValue() as string | undefined
        return <div>{value || '-'}</div>
      },
    },
    {
      accessorFn: (row) => row?.itemTaskQuantity?.amount,
      id: 'amount', // Required when using accessorFn
      header: 'Amount',
      cell: ({ getValue }) => {
        const value = getValue() as string | undefined
        return <div>{value || '-'}</div>
      },
    },
    {
      accessorKey: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        const shell = row.original

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-8 h-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <Link prefetch={true} href={`shell/view_quantity/${shell.id}`}>
                <DropdownMenuItem>View</DropdownMenuItem>
              </Link>
              <Link
                prefetch={true}
                href={`shell/update_quantity/${shell.id}?item=${shell.itemTaskQuantity.id}`}
              >
                <DropdownMenuItem>Update</DropdownMenuItem>
              </Link>
              <DropdownMenuItem
                onClick={() => showDeleteDialog(shell.itemTaskQuantity)}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]
  const handlePageChange = (newPage: number) => {
    dispatch(
      getShellQuantities({
        page: newPage,
        limit,
      })
    )
  }

  return (
    <div>
      {loading && <Skeleton />}
      <DataTable
        pageCount={pages}
        limit={limit}
        currentPage={page}
        onPageChange={handlePageChange}
        columns={columns}
        data={(shellQuantities || []).flatMap((shell) =>
          shell.itemTaskQuantity.map((qt) => ({
            id: shell.id,
            createdBy: shell.createdBy,
            itemTaskQuantity: qt,
          }))
        )}
      />
      <ConfirmationDialog
        isOpen={dialogConfig.isOpen}
        onClose={closeDialog}
        onConfirm={dialogConfig.onConfirm}
        title={dialogConfig.title}
        description={dialogConfig.description}
      />
    </div>
  )
}
