// app/dashboard/page.jsx
'use client'

import DataTable from '@/components/datatable/data-table'
import AdminPanelLayout from '@/components/layout/admin-panel-layout'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store/store'
import { useEffect, useState } from 'react'
import {
  activateRole,
  deActivateRole,
  deleteRole,
  getRoles,
} from '@/store/thunks'
import { Skeleton } from '@/components/ui/skeleton'
import { ColumnDef } from '@tanstack/react-table'
import { IRole } from '@/interfaces'
import { toast } from 'react-toastify'
import { DialogConfig } from '@/types'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { MoreHorizontal, PlusIcon } from 'lucide-react'
import { ConfirmationDialog } from '@/components/alert-dialog'
import ContentLayout from '@/components/layout/content-layout'
import { NavBar } from '@/components/navigation/navbar'
import Link from 'next/link'

const handleActivate = async (dispatch: AppDispatch, roleId: string) => {
  await dispatch(activateRole({ id: roleId }))
    .unwrap()
    .then(() => {
      toast.success('Role has been activated successfully.')
      dispatch(
        getRoles({
          page: 1,
          limit: 10,
        })
      )
    })
    .catch((error) => {
      toast.error(error)
    })
}

const handleDeactivate = async (dispatch: AppDispatch, roleId: string) => {
  await dispatch(deActivateRole({ id: roleId }))
    .unwrap()
    .then(() => {
      toast.success('Role has been deactivated successfully.')
      dispatch(
        getRoles({
          page: 1,
          limit: 10,
        })
      )
    })
    .catch((error) => {
      toast.error(error)
    })
}

const handleDelete = async (dispatch: AppDispatch, roleId: string) => {
  await dispatch(deleteRole({ id: roleId }))
    .unwrap()
    .then(() => {
      toast.success('Role has been deleted successfully.')
      dispatch(
        getRoles({
          page: 1,
          limit: 10,
        })
      )
    })
    .catch(() => {
      toast.error('Cannot delete this role because it is assigned to a user.')
    })
}

export default function Roles() {
  // fetch data
  const dispatch = useDispatch<AppDispatch>()
  const { loading, roles, pages, page, limit } = useSelector(
    (state: RootState) => state.role
  )

  const [dialogConfig, setDialogConfig] = useState<DialogConfig>({
    isOpen: false,
    title: '',
    description: '',
    onConfirm: () => {},
  })

  useEffect(() => {
    dispatch(getRoles({ page, limit }))
  }, [dispatch, page, limit])

  const closeDialog = () => {
    setDialogConfig((prev) => ({ ...prev, isOpen: false }))
  }

  const showActivateDialog = (role: IRole) => {
    setDialogConfig({
      isOpen: true,
      title: 'Activate role',
      description: `Are you sure you want to activate ${role.name}?`,
      onConfirm: () => {
        handleActivate(dispatch, role.id)
        closeDialog()
      },
    })
  }

  const showDeactivateDialog = (role: IRole) => {
    setDialogConfig({
      isOpen: true,
      title: 'Deactivate role',
      description: `Are you sure you want to deactivate ${role.name}?`,
      onConfirm: () => {
        handleDeactivate(dispatch, role.id)
        closeDialog()
      },
    })
  }

  const showDeleteDialog = (role: IRole) => {
    setDialogConfig({
      isOpen: true,
      title: 'Delete role',
      description: `Are you sure you want to delete ${role.name}?`,
      onConfirm: () => {
        handleDelete(dispatch, role.id)
        closeDialog()
      },
    })
  }

  // columns
  const columns: ColumnDef<IRole>[] = [
    {
      accessorKey: 'name',
      header: 'Name',
      cell: ({ row }) => <div>{row.getValue('name')}</div>,
    },
    {
      accessorKey: 'slug',
      header: 'Slug',
      cell: ({ row }) => <div>{row.getValue('slug')}</div>,
    },
    {
      accessorKey: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        const role = row.original

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
              <Link prefetch={true} href={`roles/view/${role.id}`}>
                <DropdownMenuItem>View</DropdownMenuItem>
              </Link>
              <Link prefetch={true} href={`roles/update/${role.id}`}>
                <DropdownMenuItem>Edit</DropdownMenuItem>
              </Link>
              {role.status ? (
                <DropdownMenuItem onClick={() => showDeactivateDialog(role)}>
                  Deactivate
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem onClick={() => showActivateDialog(role)}>
                  Activate
                </DropdownMenuItem>
              )}
              <DropdownMenuItem onClick={() => showDeleteDialog(role)}>
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
      getRoles({
        page: newPage,
        limit,
      })
    )
  }

  return (
    <AdminPanelLayout>
      <ContentLayout>
        {{
          navbar: (
            <NavBar title="Roles">
              <Link prefetch={true} href={'/admin/roles/new'}>
                <Button>
                  <PlusIcon />
                  Create Role
                </Button>
              </Link>
            </NavBar>
          ),
          content: (
            <div>
              {loading && <Skeleton />}
              <DataTable
                pageCount={pages}
                limit={limit}
                currentPage={page}
                onPageChange={handlePageChange}
                columns={columns}
                data={roles || []}
              />
              <ConfirmationDialog
                isOpen={dialogConfig.isOpen}
                onClose={closeDialog}
                onConfirm={dialogConfig.onConfirm}
                title={dialogConfig.title}
                description={dialogConfig.description}
              />
            </div>
          ),
        }}
      </ContentLayout>
    </AdminPanelLayout>
  )
}
