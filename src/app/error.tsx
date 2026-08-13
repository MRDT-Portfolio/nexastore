'use client';

export default function Error({
  reset,
}: {
  reset: () => void;
}) {
  return (
    <main className="flex min-h-[60vh] items-center justify-center bg-white px-6 py-20">
      <section className="w-full max-w-lg text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-xl text-red-600">
          !
        </div>

        <p className="mt-6 text-sm font-medium uppercase tracking-[0.15em] text-neutral-500">
          Something went wrong
        </p>

        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-950">
          We couldnt load this page
        </h1>

        <p className="mt-4 text-sm leading-6 text-neutral-500">
          Something unexpected happened. Please try
          again.
        </p>

        <button
          type="button"
          onClick={reset}
          className="mt-7 h-12 rounded-xl bg-neutral-950 px-6 text-sm font-semibold text-white transition hover:bg-neutral-800"
        >
          Try again
        </button>
      </section>
    </main>
  );
}