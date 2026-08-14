"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface PaginationProps {
  page: number;
  total: number;
  limit: number;
}

export function Pagination({
  page,
  total,
  limit,
}: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const totalPages = Math.ceil(
    total / limit,
  );

  if (totalPages <= 1) {
    return null;
  }

  const handlePageChange = (
    nextPage: number,
  ) => {
    const params = new URLSearchParams(
      searchParams.toString(),
    );

    if (nextPage <= 1) {
      params.delete("page");
    } else {
      params.set(
        "page",
        String(nextPage),
      );
    }

    router.push(
      `/products?${params.toString()}`,
      {
        scroll: false,
      },
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <nav
      aria-label="Product pagination"
      className="mt-12 flex items-center justify-center gap-2"
    >
      <button
        type="button"
        disabled={page === 1}
        onClick={() =>
          handlePageChange(page - 1)
        }
        className="rounded-lg border border-neutral-200 px-4 py-2 text-sm transition hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Previous
      </button>

      <span className="px-4 text-sm text-neutral-500">
        Page {page} of {totalPages}
      </span>

      <button
        type="button"
        disabled={page >= totalPages}
        onClick={() =>
          handlePageChange(page + 1)
        }
        className="rounded-lg border border-neutral-200 px-4 py-2 text-sm transition hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Next
      </button>
    </nav>
  );
}