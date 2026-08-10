'use client';

import { useState } from 'react';
import type { Product } from '@/types/product';
import { QuantitySelector } from './QuantitySelector';

interface ProductInfoProps {
  product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0]);

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) /
          product.originalPrice) *
          100
      )
    : null;

  return (
    <div>
      {/* Category */}
      <p className="text-sm font-medium uppercase tracking-[0.15em] text-neutral-500">
        {product.category}
      </p>

      {/* Title */}
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl">
        {product.name}
      </h1>

      {/* Rating */}
      <div className="mt-4 flex items-center gap-3">
        <div className="flex gap-0.5 text-sm text-amber-400">
          {'★★★★★'.split('').map((star, index) => (
            <span
              key={index}
              className={
                index < Math.round(product.rating)
                  ? ''
                  : 'text-neutral-300'
              }
            >
              {star}
            </span>
          ))}
        </div>

        <span className="text-sm text-neutral-500">
          {product.rating} · {product.reviews} reviews
        </span>
      </div>

      {/* Price */}
      <div className="mt-6 flex items-center gap-3">
        <span className="text-2xl font-semibold text-neutral-950">
          €{product.price.toFixed(2)}
        </span>

        {product.originalPrice && (
          <>
            <span className="text-lg text-neutral-400 line-through">
              €{product.originalPrice.toFixed(2)}
            </span>

            {discount && (
              <span className="rounded-md bg-red-50 px-2 py-1 text-xs font-semibold text-red-600">
                Save {discount}%
              </span>
            )}
          </>
        )}
      </div>

      {/* Description */}
      <p className="mt-6 leading-7 text-neutral-600">
        {product.description}
      </p>

      <div className="my-8 h-px bg-neutral-200" />

      {/* Color */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <span className="text-sm font-semibold text-neutral-950">
            Color
          </span>

          <span className="text-sm text-neutral-500">
            {selectedColor}
          </span>
        </div>

        <div className="flex gap-3">
          {product.colors.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => setSelectedColor(color)}
              className={`rounded-lg border px-4 py-2 text-sm transition ${
                selectedColor === color
                  ? 'border-neutral-950 bg-neutral-950 text-white'
                  : 'border-neutral-300 text-neutral-700 hover:border-neutral-500'
              }`}
            >
              {color}
            </button>
          ))}
        </div>
      </div>

      {/* Size */}
      {product.sizes && (
        <div className="mt-6">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-semibold text-neutral-950">
              Size
            </span>

            <span className="text-sm text-neutral-500">
              {selectedSize}
            </span>
          </div>

          <div className="flex gap-3">
            {product.sizes.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => setSelectedSize(size)}
                className={`rounded-lg border px-4 py-2 text-sm transition ${
                  selectedSize === size
                    ? 'border-neutral-950 bg-neutral-950 text-white'
                    : 'border-neutral-300 text-neutral-700 hover:border-neutral-500'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity */}
      <div className="mt-6">
        <span className="mb-3 block text-sm font-semibold text-neutral-950">
          Quantity
        </span>

        <QuantitySelector />
      </div>

      {/* Add to cart */}
      <button
        type="button"
        className="mt-8 flex h-14 w-full items-center justify-center rounded-xl bg-neutral-950 text-sm font-semibold text-white transition hover:bg-neutral-800"
      >
        Add to cart
      </button>

      {/* Product features */}
      <div className="mt-8 border-t border-neutral-200 pt-6">
        <h2 className="text-sm font-semibold text-neutral-950">
          Product features
        </h2>

        <ul className="mt-4 space-y-3">
          {product.features.map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-3 text-sm text-neutral-600"
            >
              <span className="mt-0.5 text-neutral-950">✓</span>
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}