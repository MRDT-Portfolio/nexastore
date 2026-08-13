'use client';

import { useGetProductQuery } from '@/services/api/baseApi';
import { ProductGallery } from './ProductGallery';
import { ProductInfo } from './ProductInfo';
import { ProductReviews } from './ProductReviews';

interface ProductDetailsProps {
  productId: number;
}

export function ProductDetails({
  productId,
}: ProductDetailsProps) {
  const {
    data: product,
    isLoading,
    isError,
  } = useGetProductQuery(productId);

  if (isLoading) {
    return (
      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="aspect-square animate-pulse rounded-3xl bg-neutral-200" />

          <div className="space-y-5">
            <div className="h-4 w-24 animate-pulse rounded bg-neutral-200" />
            <div className="h-10 w-3/4 animate-pulse rounded bg-neutral-200" />
            <div className="h-6 w-32 animate-pulse rounded bg-neutral-200" />
            <div className="h-24 w-full animate-pulse rounded bg-neutral-200" />
          </div>
        </div>
      </section>
    );
  }

  if (isError || !product) {
    return (
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="rounded-2xl bg-red-50 p-8 text-center">
          <h1 className="text-xl font-semibold text-red-900">
            Unable to load product
          </h1>

          <p className="mt-2 text-sm text-red-600">
            Please try again later.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-20">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <ProductGallery
          images={product.images}
          name={product.title}
        />

        <ProductInfo product={product} />
      </div>

      <ProductReviews
        reviews={product.reviews}
        rating={product.rating}
      />
    </section>
  );
}