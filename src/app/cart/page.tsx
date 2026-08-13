'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import {
  removeFromCart,
  updateQuantity,
  clearCart,
} from '@/lib/features/cart/cartSlice';

export default function CartPage() {
  const dispatch = useAppDispatch();

  const items = useAppSelector((state) => state.cart.items);

  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (items.length === 0) {
    return (
      <main className="mx-auto flex min-h-[60vh] max-w-7xl items-center justify-center px-6 py-20">
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-neutral-950">
            Your cart is empty
          </h1>

          <p className="mt-3 text-neutral-500">
            Discover something youll love.
          </p>

          <Link
            href="/products"
            className="mt-8 inline-flex rounded-full bg-neutral-950 px-7 py-3 text-sm font-semibold text-white"
          >
            Continue shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-20">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.15em] text-neutral-500">
            Shopping
          </p>

          <h1 className="mt-2 text-4xl font-semibold tracking-tight">
            Your cart
          </h1>
        </div>

        <button
          type="button"
          onClick={() => dispatch(clearCart())}
          className="text-sm text-neutral-500 transition hover:text-red-600"
        >
          Clear cart
        </button>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px]">
        {/* Items */}
        <div className="divide-y divide-neutral-200 border-y border-neutral-200">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex gap-5 py-6"
            >
              <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-xl bg-neutral-100">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="112px"
                  className="object-cover"
                />
              </div>

              <div className="flex flex-1 flex-col">
                <div className="flex justify-between gap-4">
                  <div>
                    <h2 className="font-semibold text-neutral-950">
                      {item.name}
                    </h2>

                    <p className="mt-1 text-sm text-neutral-500">
                      €{item.price.toFixed(2)}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      dispatch(removeFromCart(item.id))
                    }
                    className="text-sm text-neutral-400 hover:text-red-600"
                  >
                    Remove
                  </button>
                </div>

                <div className="mt-auto flex items-center gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() =>
                      dispatch(
                        updateQuantity({
                          id: item.id,
                          quantity: item.quantity - 1,
                        })
                      )
                    }
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-300"
                  >
                    −
                  </button>

                  <span className="w-5 text-center text-sm">
                    {item.quantity}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      dispatch(
                        updateQuantity({
                          id: item.id,
                          quantity: item.quantity + 1,
                        })
                      )
                    }
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-300"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <aside className="h-fit rounded-2xl bg-neutral-50 p-6">
          <h2 className="text-lg font-semibold">
            Order summary
          </h2>

          <div className="mt-6 flex justify-between text-sm">
            <span className="text-neutral-500">Subtotal</span>
            <span className="font-medium">
              €{subtotal.toFixed(2)}
            </span>
          </div>

          <div className="mt-3 flex justify-between text-sm">
            <span className="text-neutral-500">Shipping</span>
            <span className="font-medium">Free</span>
          </div>

          <div className="my-6 h-px bg-neutral-200" />

          <div className="flex justify-between">
            <span className="font-semibold">Total</span>

            <span className="text-lg font-semibold">
              €{subtotal.toFixed(2)}
            </span>
          </div>

          <Link
            href="/checkout"
            className="mt-6 flex h-12 items-center justify-center rounded-xl bg-neutral-950 text-sm font-semibold text-white transition hover:bg-neutral-800"
          >
            Proceed to checkout
          </Link>
        </aside>
      </div>
    </main>
  );
}