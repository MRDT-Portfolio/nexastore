import Link from 'next/link';

export function EmptyCart() {
  return (
    <div className="flex min-h-[500px] flex-col items-center justify-center rounded-2xl border border-neutral-200 px-6 py-16 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100 text-2xl">
        🛒
      </div>

      <h1 className="mt-6 text-2xl font-semibold tracking-tight text-neutral-950">
        Your cart is empty
      </h1>

      <p className="mt-3 max-w-md text-sm leading-6 text-neutral-500">
        Looks like you havent added anything to your
        cart yet. Explore our products and find
        something you love.
      </p>

      <Link
        href="/products"
        className="mt-7 flex h-12 items-center justify-center rounded-xl bg-neutral-950 px-6 text-sm font-semibold text-white transition hover:bg-neutral-800"
      >
        Continue shopping
      </Link>
    </div>
  );
}