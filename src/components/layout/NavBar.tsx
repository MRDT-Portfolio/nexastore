"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
  useAppDispatch,
  useAppSelector,
} from "@/hooks/redux";

import { openCart } from "@/lib/features/cart/cartSlice";

import { MobileMenu } from "./MobileMenu";

export function Navbar() {
  const dispatch = useAppDispatch();

  const cartItems = useAppSelector(
    (state) => state.cart.items
  );

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const [isMobileMenuOpen, setIsMobileMenuOpen] =
    useState(false);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      return;
    }

    const handleKeyDown = (
      event: KeyboardEvent
    ) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [isMobileMenuOpen]);


  useEffect(() => {
    if (!isMobileMenuOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);


  const handleCartClick = () => {
    setIsMobileMenuOpen(false);
    dispatch(openCart());
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(
      (current) => !current
    );
  };

  const handleMobileMenuClose = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6 lg:px-8">

        <Link
          href="/"
          className="text-xl font-semibold tracking-tight text-neutral-950"
          onClick={handleMobileMenuClose}
        >
          NexaStore
        </Link>

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
          {/* Search */}
          <button
            type="button"
            aria-label="Search"
            className="hidden text-sm text-neutral-700 transition hover:text-neutral-950 sm:block"
          >
            Search
          </button>

          {/* Cart */}
          <button
            type="button"
            onClick={handleCartClick}
            className="text-sm text-neutral-700 transition hover:text-neutral-950"
          >
            Cart ({cartCount})
          </button>

          {/* Mobile menu button */}
          <button
            type="button"
            aria-label={
              isMobileMenuOpen
                ? "Close menu"
                : "Open menu"
            }
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
            onClick={handleMobileMenuToggle}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 text-neutral-800 transition hover:bg-neutral-50 md:hidden"
          >
            {isMobileMenuOpen ? (
              <span className="text-xl leading-none">
                ×
              </span>
            ) : (
              <span className="flex flex-col gap-1.5">
                <span className="block h-px w-4 bg-current" />
                <span className="block h-px w-4 bg-current" />
                <span className="block h-px w-4 bg-current" />
              </span>
            )}
          </button>
        </div>
      </div>

      {/* -------------------------------- */}
      {/* Mobile Navigation */}
      {/* -------------------------------- */}

      <MobileMenu
        isOpen={isMobileMenuOpen}
        cartCount={cartCount}
        onClose={handleMobileMenuClose}
        onOpenCart={handleCartClick}
      />
    </header>
  );
}