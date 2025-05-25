// app/dashboard/page.jsx
'use client'

import DataTable from '@/components/datatable/data-table'
import AdminPanelLayout from '@/components/layout/admin-panel-layout'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store/store'
import { useEffect, useState } from 'react'
import {
  activateUser,
  activateUser2FA,
  deActivateUser,
  deActivateUser2FA,
  getUsers,
} from '@/store/thunks'
import { Skeleton } from '@/components/ui/skeleton'
import { ColumnDef } from '@tanstack/react-table'
import { IUser } from '@/interfaces'
import ContentLayout from '@/components/layout/content-layout'
import { NavBar } from '@/components/navigation/navbar'
import { toast } from 'react-toastify'
import { ConfirmationDialog } from '@/components/alert-dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { MoreHorizontal, PlusIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { DialogConfig } from '@/types'
import Link from 'next/link'

const handleActivate = async (dispatch: AppDispatch, userId: string) => {
  await dispatch(activateUser({ id: userId }))
    .unwrap()
    .then(() => {
      toast.success('User has been activated successfully.')
      dispatch(
        getUsers({
          page: 1,
          limit: 10,
        })
      )
    })
}

const handleDeactivate = async (dispatch: AppDispatch, userId: string) => {
  await dispatch(deActivateUser({ id: userId }))
    .unwrap()
    .then(() => {
      toast.success('User has been deactivated successfully.')
      dispatch(
        getUsers({
          page: 1,
          limit: 10,
        })
      )
    })
}

const handleActivate2FA = async (dispatch: AppDispatch, userId: string) => {
  await dispatch(activateUser2FA({ id: userId }))
    .unwrap()
    .then(() => {
      toast.success('User has been activated 2FA successfully.')
      dispatch(
        getUsers({
          page: 1,
          limit: 10,
        })
      )
    })
}

const handleDeactivate2FA = async (dispatch: AppDispatch, userId: string) => {
  await dispatch(deActivateUser2FA({ id: userId }))
    .unwrap()
    .then(() => {
      toast.success('User has been deactivated 2FA successfully.')
      dispatch(
        getUsers({
          page: 1,
          limit: 10,
        })
      )
    })
}

export default function Users() {
  const router = useRouter()
  // fetch data
  const dispatch = useDispatch<AppDispatch>()
  const { loading, users, pages, page, limit } = useSelector(
    (state: RootState) => state.user
  )
  const [dialogConfig, setDialogConfig] = useState<DialogConfig>({
    isOpen: false,
    title: '',
    description: '',
    onConfirm: () => {},
  })

  useEffect(() => {
    dispatch(getUsers({ page, limit }))
  }, [dispatch, page, limit])

  const closeDialog = () => {
    setDialogConfig((prev) => ({ ...prev, isOpen: false }))
  }

  const showActivateDialog = (user: IUser) => {
    setDialogConfig({
      isOpen: true,
      title: 'Activate User',
      description: `Are you sure you want to activate ${user.firstName} ${user.lastName}?`,
      onConfirm: () => {
        handleActivate(dispatch, user.id)
        closeDialog()
      },
    })
  }

  const showDeactivateDialog = (user: IUser) => {
    setDialogConfig({
      isOpen: true,
      title: 'Deactivate User',
      description: `Are you sure you want to deactivate ${user.firstName} ${user.lastName}?`,
      onConfirm: () => {
        handleDeactivate(dispatch, user.id)
        closeDialog()
      },
    })
  }

  const showActivateDialog2FA = (user: IUser) => {
    setDialogConfig({
      isOpen: true,
      title: 'Activate User',
      description: `Are you sure you want to activate 2FA ${user.firstName} ${user.lastName}?`,
      onConfirm: () => {
        handleActivate2FA(dispatch, user.id)
        closeDialog()
      },
    })
  }

  const showDeactivateDialog2FA = (user: IUser) => {
    setDialogConfig({
      isOpen: true,
      title: 'Deactivate User',
      description: `Are you sure you want to deactivate 2FA ${user.firstName} ${user.lastName}?`,
      onConfirm: () => {
        handleDeactivate2FA(dispatch, user.id)
        closeDialog()
      },
    })
  }

  // columns
  const columns: ColumnDef<IUser>[] = [
    {
      accessorKey: 'firstName',
      header: 'First name',
      cell: ({ row }) => <div>{row.getValue('firstName') ?? '-'}</div>,
    },
    {
      accessorKey: 'lastName',
      header: 'Last name',
      cell: ({ row }) => <div>{row.getValue('lastName') ?? '-'}</div>,
    },
    {
      accessorKey: 'email',
      header: 'Email',
      cell: ({ row }) => <div>{row.getValue('email') ?? '-'}</div>,
    },
    {
      accessorKey: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        const user = row.original

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
              <Link prefetch={true} href={`users/view/${user.id}`}>
                <DropdownMenuItem>View</DropdownMenuItem>
              </Link>
              <Link prefetch={true} href={`users/update/${user.id}`}>
                <DropdownMenuItem>Edit</DropdownMenuItem>
              </Link>
              {user.status ? (
                <DropdownMenuItem onClick={() => showDeactivateDialog(user)}>
                  Deactivate
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem onClick={() => showActivateDialog(user)}>
                  Activate
                </DropdownMenuItem>
              )}
              {user.twoFactorAuthentication ? (
                <DropdownMenuItem onClick={() => showDeactivateDialog2FA(user)}>
                  Deactivate 2FA
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem onClick={() => showActivateDialog2FA(user)}>
                  Activate 2FA
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]
  const handlePageChange = (newPage: number) => {
    dispatch(
      getUsers({
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
            <NavBar title="Users">
              <Link prefetch={true} href={'/admin/users/new'}>
                <Button>
                  <PlusIcon />
                  Create User
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
                data={users || []}
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
