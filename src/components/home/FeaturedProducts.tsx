'use client';
import Link from 'next/link';
import { ProductCard } from '@/components/product/ProductCard';

import { ProductGridSkeleton } from '../product/ProductGridSkeleton';
import { useGetProductsQuery } from '@/services/api/baseApi';

export function FeaturedProducts() {
    const {
    data,
    isLoading,
    isError,
  } = useGetProductsQuery();

    const products = data?.products.slice(0, 5) ?? [];

  return (
   <section className="bg-white pb-20 pt-4 sm:pb-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="mb-2 text-sm font-medium uppercase tracking-[0.15em] text-neutral-500">
              Our selection
            </p>

            <h2 className="text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl">
              Featured products
            </h2>
          </div>

          <Link
            href="/products"
            className="hidden text-sm font-medium text-neutral-700 transition hover:text-neutral-950 sm:block"
          >
            View all products →
          </Link>
        </div>

        {isLoading && (
          <ProductGridSkeleton />
        )}

        {isError && (
          <div className="rounded-2xl bg-red-50 p-6 text-sm text-red-600">
            Unable to load products. Please try again later.
          </div>
        )}

        {!isLoading && !isError && (
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-5 lg:gap-x-5">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.title}
                image={product.thumbnail}
                price={product.price}
                originalPrice={
                  product.price /
                  (1 - product.discountPercentage / 100)
                }
                rating={product.rating}
                reviews={Math.round(product.rating * 20)}
                discount={Math.round(
                  product.discountPercentage
                )}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}