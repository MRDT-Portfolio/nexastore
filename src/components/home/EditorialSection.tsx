import Image from 'next/image';
import Link from 'next/link';

export function EditorialSection() {
  return (
    <section className="bg-neutral-50 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid overflow-hidden rounded-3xl bg-white lg:grid-cols-2">
          {/* Image */}
          <div className="relative min-h-[380px] lg:min-h-[520px]">
            <Image
              src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1600&auto=format&fit=crop"
              alt="Modern interior designed for everyday living"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          {/* Content */}
          <div className="flex items-center p-8 sm:p-12 lg:p-16">
            <div className="max-w-lg">
              <p className="mb-4 text-sm font-medium uppercase tracking-[0.15em] text-neutral-500">
                Our philosophy
              </p>

              <h2 className="text-4xl font-semibold tracking-tight text-neutral-950 sm:text-5xl">
                Built for everyday life.
              </h2>

              <p className="mt-6 text-base leading-7 text-neutral-600">
                We believe great products should combine thoughtful design,
                reliable functionality, and everyday practicality.
              </p>

              <p className="mt-4 text-base leading-7 text-neutral-600">
                Thats why we carefully select products that fit naturally
                into the way you live.
              </p>

              <Link
                href="/about"
                className="mt-8 inline-flex items-center gap-3 rounded-full bg-neutral-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
              >
                Learn more
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}