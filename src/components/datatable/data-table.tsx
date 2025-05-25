'use client'

import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { DataTablePagination } from './data-table-pagination'

// Generic interface for table data
interface DataTableProps<T> {
  data: T[]
  columns: ColumnDef<T>[]
  onPageChange: (page: number) => void
  pageCount: number
  currentPage: number
  limit: number
  title?: string
  description?: string
}

export default function DataTable<T>({
  data,
  columns,
  limit,
  onPageChange,
  pageCount,
  currentPage,
  title,
  description,
}: DataTableProps<T>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  const noResults = table.getRowModel().rows.length === 0

  return (
    <div className="space-y-4 relative z-0">
      {/* Header section with title and description */}
      {(title || description) && (
        <div className="flex flex-col space-y-1.5 pb-2">
          {title && (
            <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
          )}
          {description && (
            <p className="text-sm text-gray-500">{description}</p>
          )}
        </div>
      )}

      {/* Controls for search and filter */}
      <div className="flex items-center justify-between">
        <div className="flex flex-1 items-center space-x-2">
          {/* This is a placeholder for your search component */}
        </div>
      </div>

      {/* Table container with border and rounded corners */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="bg-gray-50">
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="text-black font-extrabold"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {noResults ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-32 text-center text-gray-500"
                >
                  No results found.
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} className="hover:bg-gray-50">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
          {table.getFooterGroups().length > 0 && (
            <TableFooter>
              {table.getFooterGroups().map((footerGroup) => (
                <TableRow key={footerGroup.id}>
                  {footerGroup.headers.map((header) => (
                    <TableCell key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.footer,
                            header.getContext()
                          )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableFooter>
          )}
        </Table>
      </div>

      {/* Pagination */}
      <DataTablePagination
        totalPages={pageCount}
        pageSize={limit}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
    </div>
  )
}
