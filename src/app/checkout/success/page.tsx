import Link from 'next/link';

export default function CheckoutSuccessPage() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-white px-6 py-20">
      <section className="w-full max-w-lg text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-neutral-950 text-2xl text-white">
          ✓
        </div>

        <p className="mt-8 text-sm font-medium uppercase tracking-[0.15em] text-neutral-500">
          Order confirmed
        </p>

        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-neutral-950">
          Thank you for your order
        </h1>

        <p className="mt-5 text-sm leading-7 text-neutral-500">
          Your order has been successfully placed.
          You will receive a confirmation email with
          your order details shortly.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/products"
            className="flex h-12 items-center justify-center rounded-xl bg-neutral-950 px-6 text-sm font-semibold text-white transition hover:bg-neutral-800"
          >
            Continue shopping
          </Link>

          <Link
            href="/"
            className="flex h-12 items-center justify-center rounded-xl border border-neutral-200 px-6 text-sm font-semibold text-neutral-950 transition hover:bg-neutral-50"
          >
            Back to home
          </Link>
        </div>
      </section>
    </main>
  );
}