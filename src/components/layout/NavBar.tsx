"use client";

import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { openCart } from "@/lib/features/cart/cartSlice";

export function Navbar() {
  const cartItems = useAppSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  return (
    <header className="border-b border-neutral-200 bg-white">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-semibold tracking-tight text-neutral-950"
        >
          NexaStore
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/"
            className="text-sm text-neutral-900 transition hover:text-neutral-500"
          >
            Home
          </Link>

          <Link
            href="/products"
            className="text-sm text-neutral-600 transition hover:text-neutral-900"
          >
            Shop
          </Link>

          <Link
            href="/categories"
            className="text-sm text-neutral-600 transition hover:text-neutral-900"
          >
            Categories
          </Link>

          <Link
            href="/about"
            className="text-sm text-neutral-600 transition hover:text-neutral-900"
          >
            About
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <button
            type="button"
            aria-label="Search"
            className="hidden text-sm text-neutral-700 transition hover:text-neutral-950 sm:block"
          >
            Search
          </button>

          <button
            type="button"
            onClick={() => dispatch(openCart())}
            className="text-sm text-neutral-700 transition hover:text-neutral-950"
          >
            Cart ({cartCount})
          </button>

          {/* Mobile menu button */}
          <button
            type="button"
            aria-label="Open menu"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 text-neutral-800 md:hidden"
          >
            <span className="flex flex-col gap-1.5">
              <span className="block h-px w-4 bg-current" />
              <span className="block h-px w-4 bg-current" />
              <span className="block h-px w-4 bg-current" />
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
