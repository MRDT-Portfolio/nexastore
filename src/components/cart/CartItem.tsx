'use client';

import Image from 'next/image';

import {
  removeFromCart,
  updateQuantity,
} from '@/lib/features/cart/cartSlice';

import {
  useAppDispatch,
} from '@/hooks/redux';

import type { CartItem as CartItemType } from '@/lib/features/cart/types';

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const dispatch = useAppDispatch();

  const itemTotal = item.price * item.quantity;

  const handleDecrease = () => {
    dispatch(
      updateQuantity({
        id: item.id,
        quantity: item.quantity - 1,
      })
    );
  };

  const handleIncrease = () => {
    dispatch(
      updateQuantity({
        id: item.id,
        quantity: item.quantity + 1,
      })
    );
  };

  const handleRemove = () => {
    dispatch(removeFromCart(item.id));
  };

  return (
    <article className="flex gap-4 py-6 sm:gap-6">
      {/* Product image */}
      <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-2xl bg-neutral-100 sm:h-36 sm:w-36">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="(max-width: 640px) 112px, 144px"
          className="object-cover"
        />
      </div>

      {/* Product information */}
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-sm font-semibold text-neutral-950 sm:text-base">
              {item.name}
            </h2>

            <p className="mt-1 text-sm text-neutral-500">
              €{item.price.toFixed(2)} each
            </p>
          </div>

          {/* Desktop total */}
          <p className="hidden shrink-0 text-sm font-semibold text-neutral-950 sm:block">
            €{itemTotal.toFixed(2)}
          </p>
        </div>

        <div className="mt-5 flex items-center justify-between">
          {/* Quantity */}
          <div className="flex h-10 items-center rounded-xl border border-neutral-200">
            <button
              type="button"
              onClick={handleDecrease}
              aria-label={`Decrease ${item.name} quantity`}
              className="flex h-full w-10 items-center justify-center text-lg text-neutral-600 transition hover:bg-neutral-50 hover:text-neutral-950"
            >
              −
            </button>

            <span className="w-9 text-center text-sm font-medium text-neutral-950">
              {item.quantity}
            </span>

            <button
              type="button"
              onClick={handleIncrease}
              aria-label={`Increase ${item.name} quantity`}
              className="flex h-full w-10 items-center justify-center text-lg text-neutral-600 transition hover:bg-neutral-50 hover:text-neutral-950"
            >
              +
            </button>
          </div>

          {/* Remove */}
          <button
            type="button"
            onClick={handleRemove}
            className="text-xs font-medium text-neutral-400 transition hover:text-red-600"
          >
            Remove
          </button>
        </div>

        {/* Mobile total */}
        <div className="mt-4 sm:hidden">
          <span className="text-sm font-semibold text-neutral-950">
            €{itemTotal.toFixed(2)}
          </span>
        </div>
      </div>
    </article>
  );
}