import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-[60vh] items-center justify-center bg-white px-6 py-20">
      <section className="w-full max-w-lg text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-400">
          404
        </p>

        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-neutral-950">
          Page not found
        </h1>

        <p className="mt-4 text-sm leading-6 text-neutral-500">
          The page youre looking for doesnt exist or
          may have been moved.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="flex h-12 items-center justify-center rounded-xl bg-neutral-950 px-6 text-sm font-semibold text-white transition hover:bg-neutral-800"
          >
            Back to home
          </Link>

          <Link
            href="/products"
            className="flex h-12 items-center justify-center rounded-xl border border-neutral-200 px-6 text-sm font-semibold text-neutral-950 transition hover:bg-neutral-50"
          >
            Browse products
          </Link>
        </div>
      </section>
    </main>
  );
}