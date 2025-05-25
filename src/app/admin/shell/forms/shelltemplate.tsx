// app/dashboard/page.jsx
'use client'

import DataTable from '@/components/datatable/data-table'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store/store'
import { useEffect } from 'react'
import {
  getRoles,
  getShellItems,
} from '@/store/thunks'
import { Skeleton } from '@/components/ui/skeleton'
import { ColumnDef } from '@tanstack/react-table'
import { IShellItem } from '@/interfaces'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { MoreHorizontal } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function ShellTemplate() {
  const router = useRouter()
  // fetch data
  const dispatch = useDispatch<AppDispatch>()
  const { loading, shellItems, pages, page, limit } = useSelector(
    (state: RootState) => state.shellItem
  )

  
  useEffect(() => {
    dispatch(getShellItems({ page, limit }))
  }, [dispatch, page, limit])

  // columns
  const columns: ColumnDef<IShellItem>[] = [

    {
    accessorFn: (row) => row.shellSubCategory.shellCategory.shellPhase.name,
    id: 'phase', // Required when using accessorFn
    header: 'Phase',
    cell: ({ getValue }) => {
      const value = getValue() as string | undefined;
      return <div>{value || '-'}</div>;
    },
  },
    {
    accessorFn: (row) => row.shellSubCategory.shellCategory.name,
    id: 'category', // Required when using accessorFn
    header: 'Category',
    cell: ({ getValue }) => {
      const value = getValue() as string | undefined;
      return <div>{value || '-'}</div>;
    },
  },{
    accessorKey: 'shellSubCategory',
    header: 'Sub category',
    cell: ({ row }) => {
      const subcategory = row.getValue('shellSubCategory') as {
        id?: string;
        name?: string;
      } | null;
      
      return (
        <div>
          {subcategory?.name || '-'}
        </div>
      );
    },
  },
    {
      accessorKey: 'description',
      header: 'Description',
      cell: ({ row }) => <div>{row.getValue('description')}</div>,
    },
    {
      accessorKey: 'unit',
      header: 'Unit',
      cell: ({ row }) => <div>{row.getValue('unit')}</div>,
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
              <Link prefetch={true} href={`shell/view/${shell.id}`}>
              <DropdownMenuItem
              >
                View
              </DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]
  const handlePageChange = (newPage: number) => {
    dispatch(
      getShellItems({
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
          data={shellItems || []}
        />
      </div>
  )
}
