"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { useAppDispatch } from "@/hooks/redux";
import { addToCart } from "@/lib/features/cart/cartSlice";

interface ProductCardProps {
  id: number;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  rating?: number;
  reviews?: number;
  discount?: number;
}

export function ProductCard({
  id,
  name,
  image,
  price,
  originalPrice,
  rating,
  reviews,
  discount,
}: ProductCardProps) {
  const dispatch = useAppDispatch();

  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id,
        name,
        price,
        image,
        quantity: 1,
      }),
    );

    setIsAdded(true);

    window.setTimeout(() => {
      setIsAdded(false);
    }, 1500);
  };

  return (
    <article className="group">
      <Link href={`/products/${id}`}>
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-neutral-100">
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />

          {discount && discount > 0 && (
            <span className="absolute left-3 top-3 rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-neutral-950 shadow-sm">
              -{discount}%
            </span>
          )}
        </div>
      </Link>

      <div className="mt-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <Link href={`/products/${id}`}>
              <h3 className="line-clamp-2 text-sm font-medium text-neutral-950 transition hover:text-neutral-600">
                {name}
              </h3>
            </Link>

            {rating !== undefined && (
              <div className="mt-2 flex items-center gap-1.5">
                <span className="text-xs text-amber-500">★</span>

                <span className="text-xs text-neutral-500">
                  {rating.toFixed(1)}
                </span>

                {reviews !== undefined && (
                  <span className="text-xs text-neutral-400">({reviews})</span>
                )}
              </div>
            )}
          </div>

          <div className="shrink-0 text-right">
            <p className="text-sm font-semibold text-neutral-950">
              €{price.toFixed(2)}
            </p>

            {originalPrice && originalPrice > price && (
              <p className="mt-0.5 text-xs text-neutral-400 line-through">
                €{originalPrice.toFixed(2)}
              </p>
            )}
          </div>
        </div>

        <div
          className="
    mt-4
    sm:translate-y-2
    sm:opacity-0
    sm:transition-all
    sm:duration-300
    sm:group-hover:translate-y-0
    sm:group-hover:opacity-100
  "
        >
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={isAdded}
            className={`flex h-11 w-full items-center justify-center rounded-xl text-sm font-semibold transition active:scale-[0.98] ${
              isAdded
                ? "cursor-default bg-neutral-100 text-neutral-700"
                : "bg-neutral-950 text-white hover:bg-neutral-800"
            }`}
          >
            {isAdded ? "✓ Added" : "Add to cart"}
          </button>
        </div>
      </div>
    </article>
  );
}
