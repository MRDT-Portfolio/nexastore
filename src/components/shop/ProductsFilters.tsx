"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { ShopFilters } from "./ShopFilters";
import { useDebounce } from "@/hooks/useDebounce";

interface ProductsFiltersProps {
  search: string;
  category: string;
  sort: string;
}

export function ProductsFilters({
  search: initialSearch,
  category: initialCategory,
  sort: initialSort,
}: ProductsFiltersProps) {
  const router = useRouter();

  const [search, setSearch] =
    useState(initialSearch);

  const [category, setCategory] =
    useState(initialCategory);

  const [sort, setSort] =
    useState(initialSort);

  const debouncedSearch =
    useDebounce(search, 400);

  useEffect(() => {
    const params = new URLSearchParams();

    if (debouncedSearch) {
      params.set(
        "search",
        debouncedSearch,
      );
    }

    if (category) {
      params.set(
        "category",
        category,
      );
    }

    if (sort) {
      params.set("sort", sort);
    }

    const query = params.toString();

    router.replace(
      query
        ? `/products?${query}`
        : "/products",
      {
        scroll: false,
      },
    );
  }, [
    debouncedSearch,
    category,
    sort,
    router,
  ]);

  const handleSearchChange = (
    value: string,
  ) => {
    setSearch(value);
  };

  const handleCategoryChange = (
    value: string,
  ) => {
    setCategory(value);
  };

  const handleSortChange = (
    value: string,
  ) => {
    setSort(value);
  };

  return (
    <ShopFilters
      search={search}
      category={category}
      sort={sort}
      onSearchChange={
        handleSearchChange
      }
      onCategoryChange={
        handleCategoryChange
      }
      onSortChange={
        handleSortChange
      }
    />
  );
}