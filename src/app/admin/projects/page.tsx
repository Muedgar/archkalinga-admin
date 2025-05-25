// app/dashboard/page.jsx
'use client'

import DataTable from '@/components/datatable/data-table'
import AdminPanelLayout from '@/components/layout/admin-panel-layout'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store/store'
import { useEffect } from 'react'
import { getProjects } from '@/store/thunks'
import { Skeleton } from '@/components/ui/skeleton'
import { ColumnDef } from '@tanstack/react-table'
import { IProject } from '@/interfaces'
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
import Link from 'next/link'

export default function Projects() {
  const router = useRouter()
  // fetch data
  const dispatch = useDispatch<AppDispatch>()
  const { loading, projects, pages, page, limit } = useSelector(
    (state: RootState) => state.project
  )

  useEffect(() => {
    dispatch(getProjects({ page, limit }))
  }, [dispatch, page, limit])

  // columns
  const columns: ColumnDef<IProject>[] = [
    {
      accessorKey: 'name',
      header: 'Name',
      cell: ({ row }) => <div>{row.getValue('name') ?? '-'}</div>,
    },
    {
      accessorKey: 'createdBy',
      header: 'Created By',
      cell: ({ row }) => {
        const createdBy = row.getValue('createdBy') as {
          userName?: string
          firstName?: string
          lastName?: string
        } | null

        return (
          <div>
            {createdBy?.userName ??
              (`${createdBy?.firstName ?? ''} ${createdBy?.lastName ?? ''}`.trim() ||
                '-')}
          </div>
        )
      },
    },
    {
      accessorKey: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        const project = row.original

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
              <Link prefetch={true} href={`projects/view/${project.id}`}>
                <DropdownMenuItem>View</DropdownMenuItem>
              </Link>
              <Link prefetch={true} href={`projects/update/${project.id}`}>
                <DropdownMenuItem>Update</DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]
  const handlePageChange = (newPage: number) => {
    dispatch(
      getProjects({
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
            <NavBar title="Projects">
              <Link prefetch={true} href={'/admin/projects/new'}>
                <Button>
                  <PlusIcon />
                  Create Project
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
                data={projects || []}
              />
            </div>
          ),
        }}
      </ContentLayout>
    </AdminPanelLayout>
  )
}
