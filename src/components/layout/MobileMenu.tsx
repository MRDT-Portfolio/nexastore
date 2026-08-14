'use client';

import Link from 'next/link';

interface MobileMenuProps {
  isOpen: boolean;
  cartCount: number;
  onClose: () => void;
  onOpenCart: () => void;
  onOpenSearch: () => void;
}

export function MobileMenu({
  isOpen,
  cartCount,
  onClose,
  onOpenCart,
  onOpenSearch,
}: MobileMenuProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-40 md:hidden">
      {/* Overlay */}
      <button
        type="button"
        aria-label="Close menu"
        onClick={onClose}
        className="absolute inset-0 bg-black/30"
      />

      {/* Menu */}
      <div
        className="absolute left-0 right-0 top-[72px] border-b border-neutral-200 bg-white shadow-lg"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <nav className="px-6 py-6">
          <div className="flex flex-col">
            <Link
              href="/"
              onClick={onClose}
              className="border-b border-neutral-100 py-4 text-lg font-medium text-neutral-950"
            >
              Home
            </Link>

            <Link
              href="/products"
              onClick={onClose}
              className="border-b border-neutral-100 py-4 text-lg font-medium text-neutral-950"
            >
              Shop
            </Link>

            <Link
              href="/categories"
              onClick={onClose}
              className="border-b border-neutral-100 py-4 text-lg font-medium text-neutral-950"
            >
              Categories
            </Link>

            <Link
              href="/about"
              onClick={onClose}
              className="border-b border-neutral-100 py-4 text-lg font-medium text-neutral-950"
            >
              About
            </Link>
          </div>

          <div className="mt-6 space-y-3">
            {/* Search */}
            <button
              type="button"
              onClick={onOpenSearch}
              className="flex w-full items-center justify-between rounded-xl border border-neutral-200 px-4 py-3 text-left text-sm font-medium text-neutral-950 transition hover:bg-neutral-50"
            >
              <span>Search</span>

              <span
                aria-hidden="true"
                className="text-neutral-400"
              >
                ⌕
              </span>
            </button>

            {/* Cart */}
            <button
              type="button"
              onClick={onOpenCart}
              className="flex w-full items-center justify-between rounded-xl bg-neutral-950 px-4 py-3 text-left text-sm font-medium text-white"
            >
              <span>Cart</span>

              <span>{cartCount}</span>
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
}