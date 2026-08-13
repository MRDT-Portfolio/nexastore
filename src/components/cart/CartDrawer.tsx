"use client";

import Image from "next/image";
import Link from "next/link";

import {
  closeCart,
  removeFromCart,
  updateQuantity,
} from "@/lib/features/cart/cartSlice";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useEffect } from "react";

export function CartDrawer() {
  const dispatch = useAppDispatch();

  const { items, isCartOpen } = useAppSelector((state) => state.cart);

  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    if (!isCartOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        dispatch(closeCart());
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isCartOpen, dispatch]);

  if (!isCartOpen) {
    return null;
  }

  const handleClose = () => {
    dispatch(closeCart());
  };

  const handleOverlayClick = () => {
    dispatch(closeCart());
  };

  return (
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        aria-label="Close cart"
        onClick={handleOverlayClick}
        className="absolute inset-0 h-full w-full cursor-default bg-black/40"
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-drawer-title"
        className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-neutral-200 px-6 py-5">
          <div>
            <h2
              id="cart-drawer-title"
              className="text-lg font-semibold text-neutral-950"
            >
              Your cart
            </h2>

            <p className="mt-1 text-sm text-neutral-500">
              {totalItems} {totalItems === 1 ? "item" : "items"}
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            aria-label="Close cart"
            className="flex h-10 w-10 items-center justify-center rounded-full text-2xl text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-950"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100 text-2xl">
                🛒
              </div>

              <h3 className="mt-5 text-lg font-semibold text-neutral-950">
                Your cart is empty
              </h3>

              <p className="mt-2 max-w-xs text-sm leading-6 text-neutral-500">
                Add some products to your cart and they will appear here.
              </p>

              <button
                type="button"
                onClick={handleClose}
                className="mt-6 rounded-xl bg-neutral-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
              >
                Continue shopping
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-neutral-100">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="line-clamp-2 text-sm font-medium text-neutral-950">
                        {item.name}
                      </h3>

                      <button
                        type="button"
                        onClick={() => dispatch(removeFromCart(item.id))}
                        className="shrink-0 text-xs text-neutral-400 transition hover:text-red-600"
                      >
                        Remove
                      </button>
                    </div>

                    <p className="mt-1 text-sm font-semibold text-neutral-950">
                      €{item.price.toFixed(2)}
                    </p>

                    <div className="mt-3 flex items-center">
                      <div className="flex h-9 items-center rounded-lg border border-neutral-200">
                        <button
                          type="button"
                          onClick={() =>
                            dispatch(
                              updateQuantity({
                                id: item.id,
                                quantity: item.quantity - 1,
                              }),
                            )
                          }
                          className="flex h-full w-9 items-center justify-center text-neutral-600 hover:text-neutral-950"
                          aria-label={`Decrease ${item.name} quantity`}
                        >
                          −
                        </button>

                        <span className="w-8 text-center text-sm font-medium">
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            dispatch(
                              updateQuantity({
                                id: item.id,
                                quantity: item.quantity + 1,
                              }),
                            )
                          }
                          className="flex h-full w-9 items-center justify-center text-neutral-600 hover:text-neutral-950"
                          aria-label={`Increase ${item.name} quantity`}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-neutral-200 bg-white px-6 py-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-500">Subtotal</span>

              <span className="text-lg font-semibold text-neutral-950">
                €{subtotal.toFixed(2)}
              </span>
            </div>

            <p className="mt-2 text-xs leading-5 text-neutral-400">
              Shipping and taxes are calculated at checkout.
            </p>

            <Link
              href="/cart"
              onClick={handleClose}
              className="mt-5 flex h-12 w-full items-center justify-center rounded-xl bg-neutral-950 text-sm font-semibold text-white transition hover:bg-neutral-800"
            >
              View cart
            </Link>

            <button
              type="button"
              onClick={handleClose}
              className="mt-3 flex h-12 w-full items-center justify-center rounded-xl border border-neutral-200 text-sm font-semibold text-neutral-950 transition hover:bg-neutral-50"
            >
              Continue shopping
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}
