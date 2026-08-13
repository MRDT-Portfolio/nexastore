'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { useGetProductsQuery } from '@/services/api/baseApi';
import { useDebounce } from '@/hooks/useDebounce';

import { ShopFilters } from '@/components/shop/ShopFilters';
import { ProductGrid } from '@/components/shop/ProductGrid';
import { ProductGridLoading } from '@/components/shop/ProductGridLoading';
import { Pagination } from '@/components/shop/Pagination';

const LIMIT = 12;

export default function ProductsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // --------------------------------
  // Initial URL values
  // --------------------------------

  const initialSearch = searchParams.get('search') ?? '';
  const initialCategory = searchParams.get('category') ?? '';
  const initialSort = searchParams.get('sort') ?? '';

  const parsedPage = Number(
    searchParams.get('page') ?? '1'
  );

  const initialPage =
    Number.isInteger(parsedPage) && parsedPage > 0
      ? parsedPage
      : 1;

  // --------------------------------
  // Local state
  // --------------------------------

  const [search, setSearch] = useState(initialSearch);
  const [category, setCategory] = useState(initialCategory);
  const [sort, setSort] = useState(initialSort);
  const [page, setPage] = useState(initialPage);

  // --------------------------------
  // Debounced search
  // --------------------------------

  const debouncedSearch = useDebounce(search, 400);

  // --------------------------------
  // Sort configuration
  // --------------------------------

  const sortConfig = (() => {
    switch (sort) {
      case 'price-asc':
        return {
          sortBy: 'price',
          order: 'asc' as const,
        };

      case 'price-desc':
        return {
          sortBy: 'price',
          order: 'desc' as const,
        };

      case 'rating-desc':
        return {
          sortBy: 'rating',
          order: 'desc' as const,
        };

      case 'title-asc':
        return {
          sortBy: 'title',
          order: 'asc' as const,
        };

      default:
        return {};
    }
  })();

  // --------------------------------
  // Combined search + category
  // --------------------------------

  const hasCombinedFilters =
    Boolean(debouncedSearch) && Boolean(category);

  // --------------------------------
  // API request
  // --------------------------------

  const {
    data,
    isLoading,
    isFetching,
    isError,
  } = useGetProductsQuery({
    search: debouncedSearch || undefined,

    category: hasCombinedFilters
      ? undefined
      : category || undefined,

    limit: hasCombinedFilters ? 100 : LIMIT,

    skip: hasCombinedFilters
      ? 0
      : (page - 1) * LIMIT,

    ...sortConfig,
  });

  // --------------------------------
  // Products returned by API
  // --------------------------------

  const products = data?.products ?? [];

  // --------------------------------
  // Local category filtering
  // --------------------------------

  const filteredProducts = hasCombinedFilters
    ? products.filter(
        (product) => product.category === category
      )
    : products;

  // --------------------------------
  // Local pagination
  // --------------------------------

  const paginatedProducts = hasCombinedFilters
    ? filteredProducts.slice(
        (page - 1) * LIMIT,
        page * LIMIT
      )
    : filteredProducts;

  // --------------------------------
  // Total products
  // --------------------------------

  const totalProducts = hasCombinedFilters
    ? filteredProducts.length
    : data?.total ?? 0;

  // --------------------------------
  // Synchronize URL
  // --------------------------------

  useEffect(() => {
    const params = new URLSearchParams();

    if (search) {
      params.set('search', search);
    }

    if (category) {
      params.set('category', category);
    }

    if (sort) {
      params.set('sort', sort);
    }

    if (page > 1) {
      params.set('page', String(page));
    }

    const query = params.toString();

    const nextUrl = query
      ? `/products?${query}`
      : '/products';

    router.replace(nextUrl, {
      scroll: false,
    });
  }, [
    search,
    category,
    sort,
    page,
    router,
  ]);

  // --------------------------------
  // Handlers
  // --------------------------------

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
    setPage(1);
  };

  const handleSortChange = (value: string) => {
    setSort(value);
    setPage(1);
  };

  const handlePageChange = (nextPage: number) => {
    setPage(nextPage);

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // --------------------------------
  // Render
  // --------------------------------

  return (
    <main className="bg-white">
      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-20">

        {/* Header */}
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.15em] text-neutral-500">
            Shop
          </p>

          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-neutral-950 sm:text-5xl">
            Explore our products
          </h1>

          <p className="mt-5 text-base leading-7 text-neutral-600">
            Discover carefully selected products across
            electronics, lifestyle, beauty, fashion, and
            more.
          </p>
        </div>

        {/* Filters */}
        <div className="mt-10">
          <ShopFilters
            search={search}
            category={category}
            sort={sort}
            onSearchChange={handleSearchChange}
            onCategoryChange={handleCategoryChange}
            onSortChange={handleSortChange}
          />
        </div>

        {/* Results header */}
        <div className="mb-6 mt-10 flex items-center justify-between">
          <p className="text-sm text-neutral-500">
            {totalProducts} products
          </p>

          {isFetching && !isLoading && (
            <span className="text-xs text-neutral-400">
              Updating...
            </span>
          )}
        </div>

        {/* Loading */}
        {isLoading && <ProductGridLoading />}

        {/* Error */}
        {isError && !isLoading && (
          <div className="rounded-2xl bg-red-50 p-8 text-center">
            <h2 className="font-semibold text-red-900">
              Something went wrong
            </h2>

            <p className="mt-2 text-sm text-red-600">
              We couldnt load the products. Please try
              again later.
            </p>
          </div>
        )}

        {/* Empty state */}
        {!isLoading &&
          !isError &&
          paginatedProducts.length === 0 && (
            <div className="rounded-2xl border border-neutral-200 p-12 text-center">
              <h2 className="text-xl font-semibold text-neutral-950">
                No products found
              </h2>

              <p className="mt-2 text-sm text-neutral-500">
                Try changing your search or filters.
              </p>
            </div>
          )}

        {/* Product grid */}
        {!isLoading &&
          !isError &&
          paginatedProducts.length > 0 && (
            <>
              <ProductGrid
                products={paginatedProducts}
              />

              <Pagination
                page={page}
                total={totalProducts}
                limit={LIMIT}
                onPageChange={handlePageChange}
              />
            </>
          )}
      </section>
    </main>
  );
}