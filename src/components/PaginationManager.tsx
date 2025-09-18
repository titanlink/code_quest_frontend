"use client"

import { useState, useCallback } from "react"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

interface Props {
  totalItems: number
  itemsPerPage: number
  currentPage?: number
  onPageChange?: (page: number) => void
  maxVisiblePages?: number
  className?: string
}

export function PaginationManager({
  totalItems,
  itemsPerPage,
  currentPage = 1,
  onPageChange,
  maxVisiblePages = 5,
  className,
}: Props) {
  const [internalCurrentPage, setInternalCurrentPage] = useState(currentPage)

  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const activePage = onPageChange ? currentPage : internalCurrentPage

  const handlePageChange = useCallback(
    (page: number) => {
      if (page < 1 || page > totalPages) return

      if (onPageChange) {
        onPageChange(page)
      } else {
        setInternalCurrentPage(page)
      }
    },
    [onPageChange, totalPages],
  )

  const getVisiblePages = () => {
    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    const half = Math.floor(maxVisiblePages / 2)
    let start = Math.max(1, activePage - half)
    const end = Math.min(totalPages, start + maxVisiblePages - 1)

    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(1, end - maxVisiblePages + 1)
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i)
  }

  const visiblePages = getVisiblePages()
  const showStartEllipsis = visiblePages[0] > 2
  const showEndEllipsis = visiblePages[visiblePages.length - 1] < totalPages - 1

  if (totalPages <= 1) return null

  return (
    <Pagination className={className}>
      <PaginationContent>
        {/* Botón Anterior */}
        {(totalPages > 1) &&  (<PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault()
              handlePageChange(activePage - 1)
            }}
            className={activePage <= 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
          />
        </PaginationItem>)}

        {/* Primera página */}
        {visiblePages[0] > 1 && (
          <PaginationItem>
            <PaginationLink
              href="#"
              onClick={(e) => {
                e.preventDefault()
                handlePageChange(1)
              }}
              className="cursor-pointer"
            >
              1
            </PaginationLink>
          </PaginationItem>
        )}

        {/* Ellipsis inicial */}
        {showStartEllipsis && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {/* Páginas visibles */}
        {visiblePages.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              href="#"
              onClick={(e) => {
                e.preventDefault()
                handlePageChange(page)
              }}
              isActive={page === activePage}
              className="cursor-pointer"
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* Ellipsis final */}
        {showEndEllipsis && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {/* Última página */}
        {visiblePages[visiblePages.length - 1] < totalPages && (
          <PaginationItem>
            <PaginationLink
              href="#"
              onClick={(e) => {
                e.preventDefault()
                handlePageChange(totalPages)
              }}
              className="cursor-pointer"
            >
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        )}

        {/* Botón Siguiente */}
        {(totalPages > 1) && (<PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault()
              handlePageChange(activePage + 1)
            }}
            className={activePage >= totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
          />
        </PaginationItem>)}
      </PaginationContent>
    </Pagination>
  )
}
