"use client";

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
  { value: "mobile-accessories", label: "Mobile Accessories" },
  { value: "motorcycle", label: "Motorcycle" },
  { value: "skin-care", label: "Skin Care" },
  { value: "smartphones", label: "Smartphones" },
  { value: "sunglasses", label: "Sunglasses" },
  { value: "tablets", label: "Tablets" },
  { value: "tops", label: "Tops" },
  { value: "vehicle", label: "Vehicle" },
  { value: "womens-bags", label: "Women's Bags" },
  { value: "womens-dresses", label: "Women's Dresses" },
  { value: "womens-jewellery", label: "Women's Jewellery" },
  { value: "womens-shoes", label: "Women's Shoes" },
  { value: "womens-watches", label: "Women's Watches" },
];

export function ShopFilters({
  search,
  category,
  sort,
  onSearchChange,
  onCategoryChange,
  onSortChange,
}: ShopFiltersProps) {
  return (
    <div className="grid gap-4 rounded-2xl border border-neutral-200 bg-white p-4 md:grid-cols-[1fr_220px_220px]">
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
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search products..."
          autoComplete="off"
          aria-label="Search products"
          className="h-11 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 text-sm outline-none transition focus:border-neutral-950 focus:bg-white"
        />
      </div>

      {/* Category */}
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
          onChange={(event) => onCategoryChange(event.target.value)}
          className="h-11 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 text-sm outline-none focus:border-neutral-950"
        >
          {categories.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </div>

      {/* Sort */}
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
          onChange={(event) => onSortChange(event.target.value)}
          className="h-11 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 text-sm outline-none focus:border-neutral-950"
        >
          <option value="">Featured</option>
          <option value="price-asc">Price: Low to high</option>
          <option value="price-desc">Price: High to low</option>
          <option value="rating-desc">Highest rated</option>
          <option value="title-asc">Name: A to Z</option>
        </select>
      </div>
    </div>
  );
}
