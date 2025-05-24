import React, { useEffect, useState } from 'react'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

interface PaginationProps {
  totalPages: number
  pageSize: number
  currentPage: number
  onPageChange: (pageIndex: number) => void
}

export const DataTablePagination: React.FC<PaginationProps> = ({
  totalPages,
  pageSize,
  currentPage,
  onPageChange,
}) => {
  const [, setPages] = useState<number[]>([])
  const [showFirstButton] = useState(true)
  const [showLastButton] = useState(true)
  const renderButtonsNumber = 2

  useEffect(() => {
    const createPages = () => {
      const pageArray = []
      for (let i = 1; i <= totalPages; i++) {
        pageArray.push(i)
      }
      setPages(pageArray)
    }
    createPages()
  }, [totalPages])

  const handlePageClick = (page: number) => {
    if (page < 1 || page > totalPages) return
    onPageChange(page)
  }

  const renderPageButtons = () => {
    const buttons = []
    const startPage = Math.max(1, currentPage - renderButtonsNumber)
    const endPage = Math.min(totalPages, currentPage + renderButtonsNumber)

    if (showFirstButton && startPage > 1) {
      buttons.push(
        <PaginationItem key="first">
          <PaginationLink
            onClick={() => handlePageClick(1)}
            aria-label="Go to first page"
          >
            1
          </PaginationLink>
        </PaginationItem>
      )
      buttons.push(
        <PaginationItem key="dots-start">
          <PaginationEllipsis />
        </PaginationItem>
      )
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <PaginationItem key={i}>
          <PaginationLink
            onClick={() => handlePageClick(i)}
            isActive={i === currentPage}
            aria-label={`Page ${i}`}
            aria-current={i === currentPage ? 'page' : undefined}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      )
    }

    if (showLastButton && endPage < totalPages) {
      buttons.push(
        <PaginationItem key="dots-end">
          <PaginationEllipsis />
        </PaginationItem>
      )
      buttons.push(
        <PaginationItem key="last">
          <PaginationLink
            onClick={() => handlePageClick(totalPages)}
            aria-label="Go to last page"
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      )
    }

    return buttons
  }

  // Calculate the range of items being displayed
  const startItem = totalPages > 0 ? (currentPage - 1) * pageSize + 1 : 0
  const endItem = Math.min(currentPage * pageSize, totalPages * pageSize)
  const totalItems = totalPages * pageSize

  return (
    <div className="flex items-center justify-between py-4 px-2 border-t border-gray-200">
      {/* Mobile view */}
      <div className="sm:hidden w-full">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-700">
            Page {currentPage} of {totalPages}
          </p>
          <Pagination className="justify-end">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => handlePageClick(currentPage - 1)}
                  className={
                    currentPage === 1 ? 'pointer-events-none opacity-50' : ''
                  }
                  aria-disabled={currentPage === 1}
                  aria-label="Previous page"
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  onClick={() => handlePageClick(currentPage + 1)}
                  className={
                    currentPage === totalPages
                      ? 'pointer-events-none opacity-50'
                      : ''
                  }
                  aria-disabled={currentPage === totalPages}
                  aria-label="Next page"
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>

      {/* Desktop view */}
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          {totalPages > 0 ? (
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">{startItem}</span> to{' '}
              <span className="font-medium">{endItem}</span> of{' '}
              <span className="font-medium">{totalItems}</span> results
            </p>
          ) : (
            <p className="text-sm text-gray-700">No results</p>
          )}
        </div>

        <Pagination className="justify-end">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => handlePageClick(currentPage - 1)}
                className={
                  currentPage === 1 ? 'pointer-events-none opacity-50' : ''
                }
                aria-disabled={currentPage === 1}
                aria-label="Previous page"
              />
            </PaginationItem>
            {renderPageButtons()}
            <PaginationItem>
              <PaginationNext
                onClick={() => handlePageClick(currentPage + 1)}
                className={
                  currentPage === totalPages
                    ? 'pointer-events-none opacity-50'
                    : ''
                }
                aria-disabled={currentPage === totalPages}
                aria-label="Next page"
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}
