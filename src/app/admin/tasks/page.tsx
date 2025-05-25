// app/dashboard/page.jsx
'use client'

import DataTable from '@/components/datatable/data-table'
import AdminPanelLayout from '@/components/layout/admin-panel-layout'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store/store'
import { useEffect, useState } from 'react'
import {
  deleteTask,
  getTasks,
} from '@/store/thunks'
import { Skeleton } from '@/components/ui/skeleton'
import { ColumnDef } from '@tanstack/react-table'
import { ITask } from '@/interfaces'
import ContentLayout from '@/components/layout/content-layout'
import { NavBar } from '@/components/navigation/navbar'
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
import { toast } from 'react-toastify'
import { DialogConfig } from '@/types'
import { ConfirmationDialog } from '@/components/alert-dialog'
import Link from 'next/link'


const handleDelete = async (dispatch: AppDispatch, taskId: string) => {
  await dispatch(deleteTask({ id: taskId }))
    .unwrap()
    .then(() => {
      toast.success('Task has been deleted successfully.')
      dispatch(
        getTasks({
          page: 1,
          limit: 10,
        })
      )
    }).catch(() => {
      toast.error('Cannot delete this task because it is assigned to a user or item.')
    })
}

export default function Tasks() {
  const router = useRouter()
  // fetch data
  const dispatch = useDispatch<AppDispatch>()
  const { loading, tasks, pages, page, limit } = useSelector(
    (state: RootState) => state.task
  )

    const [dialogConfig, setDialogConfig] = useState<DialogConfig>({
      isOpen: false,
      title: '',
      description: '',
      onConfirm: () => {},
    })
      const closeDialog = () => {
    setDialogConfig((prev) => ({ ...prev, isOpen: false }))
  }
    const showDeleteDialog = (task: ITask) => {
      setDialogConfig({
        isOpen: true,
        title: 'Delete task',
        description: `Are you sure you want to delete ${task.name}?`,
        onConfirm: () => {
          handleDelete(dispatch, task.id)
          closeDialog()
        },
      })
    }
  useEffect(() => {
    dispatch(getTasks({ page, limit }))
  }, [dispatch, page, limit])




  // columns
  const columns: ColumnDef<ITask>[] = [
    {
      accessorKey: 'name',
      header: 'Task name',
      cell: ({ row }) => <div>{row.getValue('name') ?? '-'}</div>,
    },
    {
    accessorKey: 'project',
    header: 'Project name',
    cell: ({ row }) => {
      const project = row.getValue('project') as {
        id?: string;
        name?: string;
      } | null;
      
      return (
        <div>
          {project?.name || '-'}
        </div>
      );
    },
  },
    {
      accessorKey: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        const task = row.original

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
              <Link prefetch={true} href={`tasks/view/${task.id}`}>
                <DropdownMenuItem
              >
                View
              </DropdownMenuItem>
              </Link>
              <Link prefetch={true} href={`tasks/update/${task.id}`}>
              <DropdownMenuItem
              >
                Update
              </DropdownMenuItem>
              </Link>
              <Link prefetch={true} href={`tasks/assignusers/${task.id}`}>
              <DropdownMenuItem
              >
                Assign Users
              </DropdownMenuItem>
              </Link>
              <Link prefetch={true} href={`tasks/unassignusers/${task.id}`}>
              <DropdownMenuItem
              >
                Unassign Users
              </DropdownMenuItem>
              </Link>
              <DropdownMenuItem onClick={() => showDeleteDialog(task)}>
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
      getTasks({
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
            <NavBar title='Tasks'>
              <Link prefetch={true} href={'/admin/tasks/new'}>
              <Button>
                <PlusIcon />
                Create Task
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
                data={tasks || []}
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
