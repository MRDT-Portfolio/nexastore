"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";

import { openCart } from "@/lib/features/cart/cartSlice";

import { MobileMenu } from "./MobileMenu";
import { useRouter } from "next/navigation";

export function Navbar() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  const cartItems = useAppSelector((state) => state.cart.items);

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
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
    setIsMobileMenuOpen((current) => !current);
  };

  const handleMobileMenuClose = () => {
    setIsMobileMenuOpen(false);
  };

  const handleSearchOpen = () => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(true);
  };

  const handleSearchClose = () => {
    setIsSearchOpen(false);
    setSearchQuery("");
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const query = searchQuery.trim();

    if (!query) {
      return;
    }

    setIsSearchOpen(false);

    router.push(`/products?search=${encodeURIComponent(query)}`);
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
          <button
            type="button"
            aria-label="Search products"
            onClick={handleSearchOpen}
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
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
            onClick={handleMobileMenuToggle}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 text-neutral-800 transition hover:bg-neutral-50 md:hidden"
          >
            {isMobileMenuOpen ? (
              <span className="text-xl leading-none">×</span>
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

      {/* Mobile Navigation */}

      <MobileMenu
        isOpen={isMobileMenuOpen}
        cartCount={cartCount}
        onClose={handleMobileMenuClose}
        onOpenCart={handleCartClick}
        onOpenSearch={handleSearchOpen}
      />
      {isSearchOpen && (
        <div
          className="absolute inset-x-0 top-[72px] z-50 border-b border-neutral-200 bg-white shadow-lg"
          role="dialog"
          aria-label="Search products"
        >
          <div className="mx-auto max-w-7xl px-6 py-6 lg:px-8">
            <form
              onSubmit={handleSearchSubmit}
              className="flex items-center gap-4"
            >
              <div className="flex flex-1 items-center rounded-xl border border-neutral-300 bg-white px-4 focus-within:border-neutral-950 focus-within:ring-1 focus-within:ring-neutral-950">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="h-5 w-5 shrink-0 text-neutral-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <circle cx="11" cy="11" r="6.5" />

                  <path d="m16 16 4 4" strokeLinecap="round" />
                </svg>

                <input
                  autoFocus
                  type="search"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search products..."
                  aria-label="Search products"
                  className="h-12 w-full bg-transparent px-3 text-sm text-neutral-950 outline-none placeholder:text-neutral-400 [appearance:textfield] [&::-webkit-search-cancel-button]:appearance-none"
                />

                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    aria-label="Clear search"
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-neutral-400 transition hover:bg-neutral-100 hover:text-neutral-950"
                  >
                    ×
                  </button>
                )}
              </div>

              <button
                type="submit"
                disabled={!searchQuery.trim()}
                className="h-12 rounded-xl bg-neutral-950 px-6 text-sm font-semibold text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Search
              </button>

              <button
                type="button"
                onClick={handleSearchClose}
                className="hidden text-sm text-neutral-500 transition hover:text-neutral-950 sm:block"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </header>
  );
}
