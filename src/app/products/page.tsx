import type { Metadata } from "next";

import { ProductsFilters } from "@/components/shop/ProductsFilters";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { Pagination } from "@/components/shop/Pagination";
import { Product } from "@/types/product";

const LIMIT = 12;

interface ProductsPageProps {
  searchParams: Promise<{
    search?: string;
    category?: string;
    sort?: string;
    page?: string;
  }>;
}

interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

function getSortConfig(sort: string) {
  switch (sort) {
    case "price-asc":
      return {
        sortBy: "price",
        order: "asc",
      };

    case "price-desc":
      return {
        sortBy: "price",
        order: "desc",
      };

    case "rating-desc":
      return {
        sortBy: "rating",
        order: "desc",
      };

    case "title-asc":
      return {
        sortBy: "title",
        order: "asc",
      };

    default:
      return null;
  }
}

async function getProducts({
  search,
  category,
  sort,
  page,
}: {
  search: string;
  category: string;
  sort: string;
  page: number;
}): Promise<ProductsResponse> {
  const sortConfig = getSortConfig(sort);

  /*
   * DummyJSON doesn't support combining
   * search + category in a single request.
   *
   * Fetch the search results and filter the
   * category on the server.
   */
  if (search && category) {
    const params = new URLSearchParams({
      q: search,
      limit: "100",
    });

    if (sortConfig) {
      params.set("sortBy", sortConfig.sortBy);
      params.set("order", sortConfig.order);
    }

    const response = await fetch(
      `https://dummyjson.com/products/search?${params.toString()}`,
      {
        next: {
          revalidate: 3600,
        },
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const data: ProductsResponse =
      await response.json();

    const filteredProducts =
      data.products.filter(
        (product) =>
          product.category === category,
      );

    const start =
      (page - 1) * LIMIT;

    return {
      products: filteredProducts.slice(
        start,
        start + LIMIT,
      ),
      total: filteredProducts.length,
      skip: start,
      limit: LIMIT,
    };
  }

  /*
   * Category-only request.
   */
  if (category) {
    const params = new URLSearchParams({
      limit: String(LIMIT),
      skip: String((page - 1) * LIMIT),
    });

    if (sortConfig) {
      params.set(
        "sortBy",
        sortConfig.sortBy,
      );

      params.set(
        "order",
        sortConfig.order,
      );
    }

    const response = await fetch(
      `https://dummyjson.com/products/category/${encodeURIComponent(
        category,
      )}?${params.toString()}`,
      {
        next: {
          revalidate: 3600,
        },
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    return response.json();
  }

  /*
   * Search-only request.
   */
  if (search) {
    const params = new URLSearchParams({
      q: search,
      limit: String(LIMIT),
      skip: String((page - 1) * LIMIT),
    });

    if (sortConfig) {
      params.set(
        "sortBy",
        sortConfig.sortBy,
      );

      params.set(
        "order",
        sortConfig.order,
      );
    }

    const response = await fetch(
      `https://dummyjson.com/products/search?${params.toString()}`,
      {
        next: {
          revalidate: 3600,
        },
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    return response.json();
  }

  /*
   * All products.
   */
  const params = new URLSearchParams({
    limit: String(LIMIT),
    skip: String((page - 1) * LIMIT),
  });

  if (sortConfig) {
    params.set(
      "sortBy",
      sortConfig.sortBy,
    );

    params.set(
      "order",
      sortConfig.order,
    );
  }

  const response = await fetch(
    `https://dummyjson.com/products?${params.toString()}`,
    {
      next: {
        revalidate: 3600,
      },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
}

export async function generateMetadata({
  searchParams,
}: ProductsPageProps): Promise<Metadata> {
  const params = await searchParams;

  const category = params.category;

  if (category) {
    return {
      title: `${category} Products`,
      description: `Browse ${category} products at NexaStore.`,
    };
  }

  return {
    title: "Shop All Products",
    description:
      "Explore the complete NexaStore product collection.",
  };
}

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const params = await searchParams;

  const search = params.search ?? "";
  const category = params.category ?? "";
  const sort = params.sort ?? "";

  const parsedPage = Number(
    params.page ?? "1",
  );

  const page =
    Number.isInteger(parsedPage) &&
    parsedPage > 0
      ? parsedPage
      : 1;

  let data: ProductsResponse;

  try {
    data = await getProducts({
      search,
      category,
      sort,
      page,
    });
  } catch {
    data = {
      products: [],
      total: 0,
      skip: 0,
      limit: LIMIT,
    };
  }

  const totalProducts = data.total;

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
            Discover carefully selected
            products across electronics,
            lifestyle, beauty, fashion, and
            more.
          </p>
        </div>

        {/* Client-side filter controls */}
        <div className="mt-10">
          <ProductsFilters
            search={search}
            category={category}
            sort={sort}
          />
        </div>

        {/* Results */}
        <div className="mb-6 mt-10 flex items-center justify-between">
          <p className="text-sm text-neutral-500">
            {totalProducts} products
          </p>
        </div>

        {data.products.length === 0 ? (
          <div className="rounded-2xl border border-neutral-200 p-12 text-center">
            <h2 className="text-xl font-semibold text-neutral-950">
              No products found
            </h2>

            <p className="mt-2 text-sm text-neutral-500">
              Try changing your search or
              filters.
            </p>
          </div>
        ) : (
          <>
            <ProductGrid
              products={data.products}
            />

            <Pagination
              page={page}
              total={totalProducts}
              limit={LIMIT}
            />
          </>
        )}
      </section>
    </main>
  );
}