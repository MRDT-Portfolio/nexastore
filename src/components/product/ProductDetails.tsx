"use client";

import { useGetProductQuery } from "@/services/api/baseApi";
import { ProductGallery } from "./ProductGallery";
import { ProductInfo } from "./ProductInfo";
import { ProductReviews } from "./ProductReviews";
import Link from "next/link";

interface ProductDetailsProps {
  productId: number;
}

export function ProductDetails({ productId }: ProductDetailsProps) {
  const { data: product, isLoading, isError } = useGetProductQuery(productId);

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
        <div className="mx-auto max-w-lg text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-xl text-red-600">
            !
          </div>

          <h1 className="mt-6 text-2xl font-semibold tracking-tight text-neutral-950">
            Unable to load product
          </h1>

          <p className="mt-3 text-sm leading-6 text-neutral-500">
            We couldnt retrieve this product right now. Please try again later.
          </p>

          <Link
            href="/products"
            className="mt-7 inline-flex h-12 items-center justify-center rounded-xl bg-neutral-950 px-6 text-sm font-semibold text-white transition hover:bg-neutral-800"
          >
            Back to products
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-20">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <ProductGallery images={product.images} name={product.title} />

        <ProductInfo product={product} />
      </div>

      <ProductReviews reviews={product.reviews} rating={product.rating} />
    </section>
  );
}
