"use client";

import Link from "next/link";

import { useAppSelector } from "@/hooks/redux";

import { CartItem } from "@/components/cart/CartItem";
import { CartSummary } from "@/components/cart/CartSummary";
import { EmptyCart } from "@/components/cart/EmptyCart";

import { calculateSubtotal } from "@/lib/features/cart/cartCalculations";

export function CartContent() {
  const cartItems = useAppSelector(
    (state) => state.cart.items,
  );

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const subtotal = calculateSubtotal(
    cartItems,
  );

  if (cartItems.length === 0) {
    return <EmptyCartState />;
  }

  return (
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
          className="mt-6 inline-flex items-center text-sm font-medium text-neutral-600 transition hover:text-neutral-950 focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:ring-offset-2"
        >
          ← Continue shopping
        </Link>
      </div>

      {/* Summary */}
      <CartSummary subtotal={subtotal} />
    </div>
  );
}

function EmptyCartState() {
  return (
    <EmptyCart />
  );
}