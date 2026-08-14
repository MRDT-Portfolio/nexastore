import Link from "next/link";

import {
  FREE_SHIPPING_THRESHOLD,
  SHIPPING_COST,
  calculateShipping,
} from "@/lib/features/cart/cartCalculations";

interface CartSummaryProps {
  subtotal: number;
}

export function CartSummary({
  subtotal,
}: CartSummaryProps) {
  const shipping = calculateShipping(subtotal);
  const total = subtotal + shipping;

  const isFreeShipping = shipping === 0;

  const amountUntilFreeShipping = Math.max(
    FREE_SHIPPING_THRESHOLD - subtotal,
    0,
  );

  const shippingProgress = Math.min(
    (subtotal / FREE_SHIPPING_THRESHOLD) * 100,
    100,
  );

  return (
    <aside
      aria-labelledby="cart-summary-title"
      className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6 lg:p-7"
    >
      <h2
        id="cart-summary-title"
        className="text-lg font-semibold text-neutral-950"
      >
        Order summary
      </h2>

      {!isFreeShipping && (
        <div className="mt-5 rounded-xl bg-white p-4">
          <p className="text-sm leading-6 text-neutral-600">
            Add{" "}
            <span className="font-semibold text-neutral-950">
              €{amountUntilFreeShipping.toFixed(2)}
            </span>{" "}
            more to get free shipping.
          </p>

          <div
            className="mt-3 h-1.5 overflow-hidden rounded-full bg-neutral-200"
            role="progressbar"
            aria-label="Free shipping progress"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(
              shippingProgress,
            )}
          >
            <div
              className="h-full rounded-full bg-neutral-950 transition-all"
              style={{
                width: `${shippingProgress}%`,
              }}
            />
          </div>
        </div>
      )}

      {isFreeShipping && (
        <div
          className="mt-5 rounded-xl bg-neutral-950 p-4 text-sm text-white"
          role="status"
        >
          You qualify for free shipping.
        </div>
      )}

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
              ? "Free"
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

      <Link
        href="/checkout"
        className="mt-6 flex h-12 w-full items-center justify-center rounded-xl bg-neutral-950 text-sm font-semibold text-white transition hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:ring-offset-2"
      >
        Checkout
      </Link>

      <p className="mt-4 text-center text-xs leading-5 text-neutral-400">
        Taxes and final shipping costs are
        calculated during checkout.
      </p>
    </aside>
  );
}