import Link from 'next/link';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-neutral-950">
      <div className="mx-auto grid min-h-[620px] max-w-7xl items-center gap-10 px-6 py-20 lg:grid-cols-2 lg:px-8">
        {/* Content */}
        <div className="relative z-10 max-w-xl">
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-neutral-400">
            New collection
          </p>

          <h1 className="text-5xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
            Modern products for everyday life.
          </h1>

          <p className="mt-6 max-w-lg text-base leading-7 text-neutral-400 sm:text-lg">
            Discover carefully selected products designed to make everyday
            moments simpler, better, and more enjoyable.
          </p>

          <Link
            href="/products"
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-neutral-950 transition hover:bg-neutral-200"
          >
            Shop collection
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        {/* Visual */}
        <div className="relative min-h-[350px] lg:min-h-[500px]">
          <div className="absolute right-0 top-1/2 h-[360px] w-[360px] -translate-y-1/2 rounded-full bg-neutral-800 blur-3xl" />

          <div className="absolute right-0 top-1/2 flex h-[400px] w-full -translate-y-1/2 items-center justify-center lg:h-[500px]">
            <div className="relative h-[280px] w-[280px] rounded-[40px] border border-white/10 bg-gradient-to-br from-neutral-700 to-neutral-950 shadow-2xl sm:h-[340px] sm:w-[340px]">
              <div className="absolute inset-8 rounded-[30px] border border-white/10" />

              <div className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-neutral-900 shadow-2xl" />

              <div className="absolute bottom-8 left-8 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs text-white backdrop-blur">
                Curated essentials
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}