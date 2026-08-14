import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Categories',
  description:
    'Explore all product categories available at NexaStore.',
};

interface Category {
  slug: string;
  name: string;
  url: string;
}

async function getCategories(): Promise<Category[]> {
  const response = await fetch(
    'https://dummyjson.com/products/categories',
    {
      next: {
        revalidate: 3600,
      },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }

  return response.json();
}

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <main className="bg-white">
      <section className="border-b border-neutral-200">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
          <p className="text-sm font-medium uppercase tracking-[0.15em] text-neutral-500">
            Explore
          </p>

          <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-neutral-950 sm:text-5xl lg:text-6xl">
            Shop by category
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-neutral-500">
            Explore our collection by category and
            discover products selected for every part
            of your everyday life.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-20">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/products?category=${encodeURIComponent(
                category.slug
              )}`}
              className="group rounded-2xl border border-neutral-200 p-6 transition hover:-translate-y-1 hover:border-neutral-950 hover:shadow-lg"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-lg font-semibold text-neutral-950">
                    {category.name}
                  </p>

                  <p className="mt-2 text-sm text-neutral-500">
                    Explore products
                  </p>
                </div>

                <span className="text-lg text-neutral-400 transition group-hover:translate-x-1 group-hover:text-neutral-950">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}