"use client";

import { useEffect, useMemo, useState } from "react";

export const usePagination = <T>(items: T[], itemsPerPage: number) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = Math.ceil(items.length / itemsPerPage);

  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return items.slice(startIndex, startIndex + itemsPerPage);
  }, [items, currentPage, itemsPerPage]);

  const getPaginationRange = () => {
    const pages: (number | string)[] = [];
    const startPage = Math.max(2, currentPage - 2);
    const endPage = Math.min(totalPages - 1, currentPage + 2);

    pages.push(1);
    if (startPage > 2) {
      pages.push("...");
    }
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    if (endPage < totalPages - 1) {
      pages.push("...");
    }
    if (totalPages > 1) {
      pages.push(totalPages);
    }
    return pages;
  };

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages || 1);
    }
  }, [currentPage, totalPages]);

  useEffect(() => {
    setCurrentPage(1);
  }, [items]);

  return {
    currentPage,
    setCurrentPage,
    totalPages,
    paginatedItems,
    getPaginationRange,
  };
};
