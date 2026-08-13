'use client';

import Link from 'next/link';

interface CartSummaryProps {
  subtotal: number;
}

const FREE_SHIPPING_THRESHOLD = 100;
const SHIPPING_COST = 5.99;

export function CartSummary({
  subtotal,
}: CartSummaryProps) {
  const isFreeShipping =
    subtotal >= FREE_SHIPPING_THRESHOLD;

  const shipping = isFreeShipping
    ? 0
    : SHIPPING_COST;

  const total = subtotal + shipping;

  const amountUntilFreeShipping = Math.max(
    FREE_SHIPPING_THRESHOLD - subtotal,
    0
  );

  return (
    <aside className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6 lg:p-7">
      <h2 className="text-lg font-semibold text-neutral-950">
        Order summary
      </h2>

      {/* Free shipping message */}
      {!isFreeShipping && (
        <div className="mt-5 rounded-xl bg-white p-4">
          <p className="text-sm leading-6 text-neutral-600">
            Add{' '}
            <span className="font-semibold text-neutral-950">
              €{amountUntilFreeShipping.toFixed(2)}
            </span>{' '}
            more to get free shipping.
          </p>

          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-neutral-200">
            <div
              className="h-full rounded-full bg-neutral-950"
              style={{
                width: `${Math.min(
                  (subtotal /
                    FREE_SHIPPING_THRESHOLD) *
                    100,
                  100
                )}%`,
              }}
            />
          </div>
        </div>
      )}

      {isFreeShipping && (
        <div className="mt-5 rounded-xl bg-neutral-950 p-4 text-sm text-white">
          You qualify for free shipping.
        </div>
      )}

      {/* Totals */}
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-neutral-500">
            Subtotal
          </span>

          <span className="font-medium text-neutral-950">
            €{subtotal.toFixed(2)}
          </span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-neutral-500">
            Shipping
          </span>

          <span className="font-medium text-neutral-950">
            {isFreeShipping
              ? 'Free'
              : `€${SHIPPING_COST.toFixed(2)}`}
          </span>
        </div>

        <div className="border-t border-neutral-200 pt-4">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-neutral-950">
              Total
            </span>

            <span className="text-xl font-semibold text-neutral-950">
              €{total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Checkout */}
      <Link
        href="/checkout"
        className="mt-6 flex h-12 w-full items-center justify-center rounded-xl bg-neutral-950 text-sm font-semibold text-white transition hover:bg-neutral-800"
      >
        Checkout
      </Link>

      <p className="mt-4 text-center text-xs leading-5 text-neutral-400">
        Taxes and final shipping costs are calculated
        during checkout.
      </p>
    </aside>
  );
}