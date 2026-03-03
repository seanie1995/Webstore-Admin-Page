"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { create } from "domain";

const Pagination = ({ totalPages }: { totalPages: number }) => {
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;

  const startPage = currentPage + 1;
  const endPage = Math.min(totalPages, currentPage + 3);

  const paginationDisplay: number[] = [];

  for (let i = startPage; i <= endPage; i++) {
    paginationDisplay.push(i);
  }

  /*   for (let i = startPage; i <= endPage; i++) {
    paginationDisplay.push(i);
  } */

  const createPageUrl = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("page", pageNumber.toString());

    return `${pathName}?${params.toString()}`;
  };

  return (
    <div className="flex gap-4 p-4 justify-between">
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <div className="flex gap-4">
        <Link
          scroll={false}
          href={createPageUrl(1)}
          className={`border border-neutral-400 rounded-lg px-2 hover:bg-purple-700 transition-all ${currentPage === 1 ? "pointer-events-none text-gray-400 cursor-not-allowed" : ""}`}
        >
          First
        </Link>
        <Link
          scroll={false}
          href={createPageUrl(currentPage - 1)}
          className={`border border-neutral-400 rounded-lg px-2 hover:bg-purple-700 transition-all ${currentPage === 1 ? "pointer-events-none text-gray-400 cursor-not-allowed" : ""}`}
        >
          Previous
        </Link>
        {paginationDisplay.map((i, index) => (
          <Link
            scroll={false}
            className={`border border-neutral-400 rounded-lg px-2 hover:bg-purple-700 transition-all `}
            href={createPageUrl(i.toString())}
            key={index}
          >
            {i.toString()}
          </Link>
        ))}
        {currentPage === totalPages && (
          <Link
            scroll={false}
            href={createPageUrl(totalPages)}
            className={`border border-neutral-400 rounded-lg px-2 hover:bg-purple-700 transition-all ${currentPage === totalPages ? "pointer-events-none text-gray-400 cursor-not-allowed" : ""}`}
          >
            {currentPage}
          </Link>
        )}
        <Link
          scroll={false}
          href={createPageUrl(currentPage + 1)}
          className={`border border-neutral-400 rounded-lg px-2 hover:bg-purple-700 transition-all ${currentPage === totalPages ? "pointer-events-none text-gray-400 cursor-not-allowed" : ""}`}
        >
          {" "}
          Next
        </Link>
        <Link
          scroll={false}
          href={createPageUrl(totalPages)}
          className={`border border-neutral-400 rounded-lg px-2 hover:bg-purple-700 transition-all ${currentPage === totalPages ? "pointer-events-none text-gray-400 cursor-not-allowed" : ""}`}
        >
          {" "}
          Last
        </Link>
      </div>
    </div>
  );
};

export default Pagination;
