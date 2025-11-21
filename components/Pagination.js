'use client';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { useState } from 'react';

export default function PaginationPage({
  totalItems,
  itemsPerPage,
  onPageChange,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    onPageChange(pageNumber);
  };

  const renderPages = () => {
    const pages = [];

    // Always show first page
    if (currentPage > 3) {
      pages.push(
        <PaginationItem key={1}>
          <PaginationLink
            className="cursor-pointer"
            onClick={() => handleClick(1)}
          >
            1
          </PaginationLink>
        </PaginationItem>
      );
      pages.push(
        <PaginationItem key="start-ellipsis">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    // Show 2 pages before and after current page
    for (
      let i = Math.max(1, currentPage - 2);
      i <= Math.min(totalPages, currentPage + 2);
      i++
    ) {
      pages.push(
        <PaginationItem key={i}>
          <PaginationLink
            className="cursor-pointer"
            isActive={i === currentPage}
            onClick={() => handleClick(i)}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    // Always show last page
    if (currentPage < totalPages - 2) {
      pages.push(
        <PaginationItem key="end-ellipsis">
          <PaginationEllipsis />
        </PaginationItem>
      );
      pages.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            className="cursor-pointer"
            onClick={() => handleClick(totalPages)}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return pages;
  };

  return (
    <Pagination className="mt-5">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className="cursor-pointer "
            onClick={() => currentPage > 1 && handleClick(currentPage - 1)}
          />
        </PaginationItem>

        {renderPages()}

        <PaginationItem>
          <PaginationNext
            className="cursor-pointer "
            onClick={() =>
              currentPage < totalPages && handleClick(currentPage + 1)
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
