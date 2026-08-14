"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

import {
  closeCart,
  removeFromCart,
  updateQuantity,
} from "@/lib/features/cart/cartSlice";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";

export function CartDrawer() {
  const dispatch = useAppDispatch();

  const { items, isCartOpen } = useAppSelector((state) => state.cart);

  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const previouslyFocusedElement = useRef<HTMLElement | null>(null);

  const drawerRef = useRef<HTMLElement>(null);

  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  /*
   * Store the element that had focus before
   * opening the cart.
   */
  useEffect(() => {
    if (!isCartOpen) {
      return;
    }

    previouslyFocusedElement.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    /*
     * Move focus into the drawer after it has
     * been rendered.
     */
    const focusTimer = window.setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 0);

    return () => {
      window.clearTimeout(focusTimer);
    };
  }, [isCartOpen]);

  /*
   * Keyboard handling:
   *
   * Escape → close
   * Tab → trap focus inside drawer
   */
  useEffect(() => {
    if (!isCartOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        dispatch(closeCart());
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const drawer = drawerRef.current;

      if (!drawer) {
        return;
      }

      const focusableElements = drawer.querySelectorAll<HTMLElement>(
        [
          "a[href]",
          "button:not([disabled])",
          "input:not([disabled])",
          "select:not([disabled])",
          "textarea:not([disabled])",
          "[tabindex]:not([tabindex='-1'])",
        ].join(","),
      );

      const focusable = Array.from(focusableElements);

      if (focusable.length === 0) {
        event.preventDefault();
        return;
      }

      const firstElement = focusable[0];
      const lastElement = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
        return;
      }

      if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isCartOpen, dispatch]);

  /*
   * Prevent the page behind the drawer from scrolling.
   */
  useEffect(() => {
    if (!isCartOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isCartOpen]);

  /*
   * Restore focus when the drawer closes.
   */
  useEffect(() => {
    if (isCartOpen) {
      return;
    }

    const element = previouslyFocusedElement.current;

    if (element) {
      element.focus();
      previouslyFocusedElement.current = null;
    }
  }, [isCartOpen]);

  if (!isCartOpen) {
    return null;
  }

  const handleClose = () => {
    dispatch(closeCart());
  };

  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay */}
      <button
        type="button"
        aria-label="Close cart"
        onClick={handleClose}
        className="absolute inset-0 h-full w-full cursor-default bg-black/40"
      />

      {/* Cart drawer */}
      <aside
        ref={drawerRef}
        id="cart-drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-drawer-title"
        aria-describedby="cart-drawer-description"
        className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-200 px-6 py-5">
          <div>
            <h2
              id="cart-drawer-title"
              className="text-lg font-semibold text-neutral-950"
            >
              Your cart
            </h2>

            <p
              id="cart-drawer-description"
              className="mt-1 text-sm text-neutral-500"
            >
              {totalItems} {totalItems === 1 ? "item" : "items"}
            </p>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={handleClose}
            aria-label="Close cart"
            className="flex h-10 w-10 items-center justify-center rounded-full text-2xl text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-950 focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:ring-offset-2"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div
                aria-hidden="true"
                className="flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100 text-2xl"
              >
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
                className="mt-6 rounded-xl bg-neutral-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:ring-offset-2"
              >
                Continue shopping
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  {/* Product image */}
                  <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-neutral-100">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </div>

                  {/* Product information */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="line-clamp-2 text-sm font-medium text-neutral-950">
                        {item.name}
                      </h3>

                      <button
                        type="button"
                        onClick={() => dispatch(removeFromCart(item.id))}
                        aria-label={`Remove ${item.name} from cart`}
                        className="shrink-0 text-xs text-neutral-400 transition hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2"
                      >
                        Remove
                      </button>
                    </div>

                    <p className="mt-1 text-sm font-semibold text-neutral-950">
                      €{item.price.toFixed(2)}
                    </p>

                    {/* Quantity controls */}
                    <div className="mt-3 flex items-center">
                      <div
                        className="flex h-9 items-center rounded-lg border border-neutral-200"
                        role="group"
                        aria-label={`${item.name} quantity`}
                      >
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
                          aria-label={`Decrease ${item.name} quantity`}
                          className="flex h-full w-9 items-center justify-center text-neutral-600 transition hover:text-neutral-950 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-neutral-950"
                        >
                          −
                        </button>

                        <span
                          aria-label={`Quantity ${item.quantity}`}
                          className="w-8 text-center text-sm font-medium"
                        >
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
                          aria-label={`Increase ${item.name} quantity`}
                          className="flex h-full w-9 items-center justify-center text-neutral-600 transition hover:text-neutral-950 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-neutral-950"
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

        {/* Footer */}
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
              className="mt-5 flex h-12 w-full items-center justify-center rounded-xl bg-neutral-950 text-sm font-semibold text-white transition hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:ring-offset-2"
            >
              View cart
            </Link>

            <button
              type="button"
              onClick={handleClose}
              className="mt-3 flex h-12 w-full items-center justify-center rounded-xl border border-neutral-200 text-sm font-semibold text-neutral-950 transition hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:ring-offset-2"
            >
              Continue shopping
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}
