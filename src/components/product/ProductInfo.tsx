"use client";

import { useState } from "react";

import type { Product } from "@/types/product";
import { useAppDispatch } from "@/hooks/redux";
import { QuantitySelector } from "./QuantitySelector";
import { addToCart } from "@/lib/features/cart/cartSlice";

interface ProductInfoProps {
  product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const dispatch = useAppDispatch();

  const [quantity, setQuantity] = useState(1);

  const discount = Math.round(product.discountPercentage);

  const originalPrice =
    product.discountPercentage > 0 && product.discountPercentage < 100
      ? product.price / (1 - product.discountPercentage / 100)
      : product.price;

  const reviewCount = product.reviews?.length ?? 0;

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        name: product.title,
        price: product.price,
        image: product.thumbnail,
        quantity,
      }),
    );
  };

  return (
    <div>
      {/* Category */}
      <p className="text-sm font-medium uppercase tracking-[0.15em] text-neutral-500">
        {product.category}
      </p>

      {/* Title */}
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl">
        {product.title}
      </h1>

      {/* Brand */}
      {product.brand && (
        <p className="mt-2 text-sm text-neutral-500">by {product.brand}</p>
      )}

      {/* Rating */}
      <div className="mt-4 flex items-center gap-3">
        <div
          className="flex gap-0.5 text-sm text-amber-400"
          aria-label={`${product.rating} out of 5 stars`}
        >
          {"★★★★★".split("").map((star, index) => (
            <span
              key={index}
              className={
                index < Math.round(product.rating) ? "" : "text-neutral-300"
              }
            >
              {star}
            </span>
          ))}
        </div>

        <span className="text-sm text-neutral-500">
          {product.rating.toFixed(1)} · {reviewCount} reviews
        </span>
      </div>

      {/* Price */}
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <span className="text-2xl font-semibold text-neutral-950">
          €{product.price.toFixed(2)}
        </span>

        {product.discountPercentage > 0 && (
          <>
            <span className="text-lg text-neutral-400 line-through">
              €{originalPrice.toFixed(2)}
            </span>

            <span className="rounded-md bg-red-50 px-2 py-1 text-xs font-semibold text-red-600">
              Save {discount}%
            </span>
          </>
        )}
      </div>

      {/* Description */}
      <p className="mt-6 leading-7 text-neutral-600">{product.description}</p>

      <div className="my-8 h-px bg-neutral-200" />

      {/* Availability */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-neutral-950">
          Availability
        </span>

        <span
          className={
            product.stock > 0
              ? "text-sm font-medium text-green-600"
              : "text-sm font-medium text-red-600"
          }
        >
          {product.availabilityStatus}
        </span>
      </div>

      {/* Quantity */}
      <div className="mt-6">
        <span className="mb-3 block text-sm font-semibold text-neutral-950">
          Quantity
        </span>

        <QuantitySelector
          quantity={quantity}
          onDecrease={() => setQuantity((current) => Math.max(1, current - 1))}
          onIncrease={() =>
            setQuantity((current) => Math.min(product.stock, current + 1))
          }
        />
      </div>

      {/* Add to cart */}
      <button
        type="button"
        disabled={product.stock === 0}
        onClick={handleAddToCart}
        className="mt-8 flex h-14 w-full items-center justify-center rounded-xl bg-neutral-950 text-sm font-semibold text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:bg-neutral-300"
      >
        {product.stock > 0 ? "Add to cart" : "Out of stock"}
      </button>

      {/* Product information */}
      <div className="mt-8 border-t border-neutral-200 pt-6">
        <h2 className="text-sm font-semibold text-neutral-950">
          Product information
        </h2>

        <dl className="mt-5 space-y-4">
          <div className="flex justify-between gap-6 text-sm">
            <dt className="text-neutral-500">Shipping</dt>

            <dd className="text-right text-neutral-800">
              {product.shippingInformation}
            </dd>
          </div>

          <div className="flex justify-between gap-6 text-sm">
            <dt className="text-neutral-500">Warranty</dt>

            <dd className="text-right text-neutral-800">
              {product.warrantyInformation}
            </dd>
          </div>

          <div className="flex justify-between gap-6 text-sm">
            <dt className="text-neutral-500">Returns</dt>

            <dd className="text-right text-neutral-800">
              {product.returnPolicy}
            </dd>
          </div>

          <div className="flex justify-between gap-6 text-sm">
            <dt className="text-neutral-500">Minimum order</dt>

            <dd className="text-right text-neutral-800">
              {product.minimumOrderQuantity}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
