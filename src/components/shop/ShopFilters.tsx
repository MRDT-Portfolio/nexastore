"use client";

import { useEffect, useState } from "react";

interface ShopFiltersProps {
  search: string;
  category: string;
  sort: string;
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onSortChange: (value: string) => void;
}

const categories = [
  { value: "", label: "All categories" },
  { value: "beauty", label: "Beauty" },
  { value: "fragrances", label: "Fragrances" },
  { value: "furniture", label: "Furniture" },
  { value: "groceries", label: "Groceries" },
  { value: "laptops", label: "Laptops" },
  { value: "mens-shirts", label: "Men's Shirts" },
  { value: "mens-shoes", label: "Men's Shoes" },
  { value: "mens-watches", label: "Men's Watches" },
  {
    value: "mobile-accessories",
    label: "Mobile Accessories",
  },
  { value: "motorcycle", label: "Motorcycle" },
  { value: "skin-care", label: "Skin Care" },
  { value: "smartphones", label: "Smartphones" },
  { value: "sunglasses", label: "Sunglasses" },
  { value: "tablets", label: "Tablets" },
  { value: "tops", label: "Tops" },
  { value: "vehicle", label: "Vehicle" },
  { value: "womens-bags", label: "Women's Bags" },
  {
    value: "womens-dresses",
    label: "Women's Dresses",
  },
  {
    value: "womens-jewellery",
    label: "Women's Jewellery",
  },
  {
    value: "womens-shoes",
    label: "Women's Shoes",
  },
  {
    value: "womens-watches",
    label: "Women's Watches",
  },
];

export function ShopFilters({
  search,
  category,
  sort,
  onSearchChange,
  onCategoryChange,
  onSortChange,
}: ShopFiltersProps) {
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] =
    useState(false);

  const [mobileCategory, setMobileCategory] =
    useState(category);

  const [mobileSort, setMobileSort] =
    useState(sort);

  const handleOpenFilters = () => {
    setMobileCategory(category);
    setMobileSort(sort);
    setIsMobileFiltersOpen(true);
  };

  const handleCloseFilters = () => {
    setIsMobileFiltersOpen(false);
  };

  useEffect(() => {
    if (!isMobileFiltersOpen) {
      return;
    }

    const handleKeyDown = (
      event: KeyboardEvent
    ) => {
      if (event.key === "Escape") {
        setIsMobileFiltersOpen(false);
      }
    };

    document.addEventListener(
      "keydown",
      handleKeyDown
    );

    const originalOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown
      );

      document.body.style.overflow =
        originalOverflow;
    };
  }, [isMobileFiltersOpen]);

  const handleApplyFilters = () => {
    onCategoryChange(mobileCategory);
    onSortChange(mobileSort);

    setIsMobileFiltersOpen(false);
  };

  const handleClearFilters = () => {
    setMobileCategory("");
    setMobileSort("");

    onCategoryChange("");
    onSortChange("");

    setIsMobileFiltersOpen(false);
  };

  const activeFilterCount =
    Number(Boolean(category)) +
    Number(Boolean(sort));

  return (
    <>
      <div className="hidden rounded-2xl border border-neutral-200 bg-white p-4 md:grid md:grid-cols-[1fr_220px_220px] md:gap-4">
        {/* Search */}
        <div>
          <label
            htmlFor="product-search"
            className="mb-2 block text-xs font-medium uppercase tracking-wider text-neutral-500"
          >
            Search
          </label>

          <input
            id="product-search"
            type="search"
            value={search}
            onChange={(event) =>
              onSearchChange(event.target.value)
            }
            placeholder="Search products..."
            autoComplete="off"
            aria-label="Search products"
            className="h-11 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 text-sm outline-none transition focus:border-neutral-950 focus:bg-white"
          />
        </div>

        <div>
          <label
            htmlFor="category"
            className="mb-2 block text-xs font-medium uppercase tracking-wider text-neutral-500"
          >
            Category
          </label>

          <select
            id="category"
            value={category}
            onChange={(event) =>
              onCategoryChange(event.target.value)
            }
            className="h-11 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 text-sm outline-none focus:border-neutral-950"
          >
            {categories.map((item) => (
              <option
                key={item.value}
                value={item.value}
              >
                {item.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="sort"
            className="mb-2 block text-xs font-medium uppercase tracking-wider text-neutral-500"
          >
            Sort by
          </label>

          <select
            id="sort"
            value={sort}
            onChange={(event) =>
              onSortChange(event.target.value)
            }
            className="h-11 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 text-sm outline-none focus:border-neutral-950"
          >
            <option value="">Featured</option>

            <option value="price-asc">
              Price: Low to high
            </option>

            <option value="price-desc">
              Price: High to low
            </option>

            <option value="rating-desc">
              Highest rated
            </option>

            <option value="title-asc">
              Name: A to Z
            </option>
          </select>
        </div>
      </div>

      <div className="md:hidden">
        <div>
          <label
            htmlFor="mobile-product-search"
            className="mb-2 block text-xs font-medium uppercase tracking-wider text-neutral-500"
          >
            Search
          </label>

          <input
            id="mobile-product-search"
            type="search"
            value={search}
            onChange={(event) =>
              onSearchChange(event.target.value)
            }
            placeholder="Search products..."
            autoComplete="off"
            aria-label="Search products"
            className="h-12 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 text-sm outline-none transition focus:border-neutral-950 focus:bg-white"
          />
        </div>

        <button
          type="button"
          onClick={handleOpenFilters}
          className="mt-3 flex h-12 w-full items-center justify-between rounded-xl border border-neutral-200 bg-white px-4 text-sm font-medium text-neutral-950 transition hover:bg-neutral-50"
        >
          <span>Filters</span>

          <span className="flex items-center gap-2">
            {activeFilterCount > 0 && (
              <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-neutral-950 px-1.5 text-xs font-semibold text-white">
                {activeFilterCount}
              </span>
            )}

            <span className="text-lg text-neutral-500">
              →
            </span>
          </span>
        </button>
      </div>

      {isMobileFiltersOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Overlay */}
          <button
            type="button"
            aria-label="Close filters"
            onClick={handleCloseFilters}
            className="absolute inset-0 bg-black/40"
          />

          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-filters-title"
            className="absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto rounded-t-3xl bg-white"
          >
            <div className="sticky top-0 flex items-center justify-between border-b border-neutral-200 bg-white px-6 py-5">
              <div>
                <h2
                  id="mobile-filters-title"
                  className="text-lg font-semibold text-neutral-950"
                >
                  Filters
                </h2>

                {activeFilterCount > 0 && (
                  <p className="mt-1 text-xs text-neutral-500">
                    {activeFilterCount} active{" "}
                    {activeFilterCount === 1
                      ? "filter"
                      : "filters"}
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={handleCloseFilters}
                aria-label="Close filters"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100 text-xl text-neutral-700"
              >
                ×
              </button>
            </div>

            <div className="space-y-7 px-6 py-6">
              <div>
                <label
                  htmlFor="mobile-category"
                  className="mb-3 block text-sm font-semibold text-neutral-950"
                >
                  Category
                </label>

                <select
                  id="mobile-category"
                  value={mobileCategory}
                  onChange={(event) =>
                    setMobileCategory(
                      event.target.value
                    )
                  }
                  className="h-12 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 text-sm outline-none focus:border-neutral-950"
                >
                  {categories.map((item) => (
                    <option
                      key={item.value}
                      value={item.value}
                    >
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="mobile-sort"
                  className="mb-3 block text-sm font-semibold text-neutral-950"
                >
                  Sort by
                </label>

                <select
                  id="mobile-sort"
                  value={mobileSort}
                  onChange={(event) =>
                    setMobileSort(
                      event.target.value
                    )
                  }
                  className="h-12 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 text-sm outline-none focus:border-neutral-950"
                >
                  <option value="">Featured</option>

                  <option value="price-asc">
                    Price: Low to high
                  </option>

                  <option value="price-desc">
                    Price: High to low
                  </option>

                  <option value="rating-desc">
                    Highest rated
                  </option>

                  <option value="title-asc">
                    Name: A to Z
                  </option>
                </select>
              </div>
            </div>

            <div className="sticky bottom-0 border-t border-neutral-200 bg-white px-6 py-4">
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleClearFilters}
                  className="h-12 flex-1 rounded-xl border border-neutral-200 text-sm font-semibold text-neutral-950 transition hover:bg-neutral-50"
                >
                  Clear
                </button>

                <button
                  type="button"
                  onClick={handleApplyFilters}
                  className="h-12 flex-[2] rounded-xl bg-neutral-950 text-sm font-semibold text-white transition hover:bg-neutral-800"
                >
                  Apply filters
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}