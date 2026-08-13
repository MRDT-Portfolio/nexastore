'use client';

import Link from 'next/link';

import {
  useAppSelector,
} from '@/hooks/redux';

import { CartItem } from '@/components/cart/CartItem';
import { CartSummary } from '@/components/cart/CartSummary';
import { EmptyCart } from '@/components/cart/EmptyCart';

export default function CartPage() {
  const cartItems = useAppSelector(
    (state) => state.cart.items
  );

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const subtotal = cartItems.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <main className="bg-white">
        <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-20">
          <div className="mb-10">
            <p className="text-sm font-medium uppercase tracking-[0.15em] text-neutral-500">
              Shopping cart
            </p>

            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-neutral-950 sm:text-5xl">
              Your cart
            </h1>
          </div>

          <EmptyCart />
        </section>
      </main>
    );
  }

  return (
    <main className="bg-white">
      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-20">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.15em] text-neutral-500">
              Shopping cart
            </p>

            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-neutral-950 sm:text-5xl">
              Your cart
            </h1>
          </div>

          <p className="text-sm text-neutral-500">
            {totalItems}{' '}
            {totalItems === 1 ? 'item' : 'items'}
          </p>
        </div>

        {/* Cart content */}
        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_380px] lg:items-start">
          {/* Items */}
          <div>
            <div className="divide-y divide-neutral-200 border-y border-neutral-200">
              {cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                />
              ))}
            </div>

            {/* Continue shopping */}
            <Link
              href="/products"
              className="mt-6 inline-flex items-center text-sm font-medium text-neutral-600 transition hover:text-neutral-950"
            >
              ← Continue shopping
            </Link>
          </div>

          {/* Summary */}
          <CartSummary subtotal={subtotal} />
        </div>
      </section>
    </main>
  );
}