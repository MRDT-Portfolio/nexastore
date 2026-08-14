import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn more about NexaStore and our approach to creating a simple, modern online shopping experience.',
};

export default function AboutPage() {
  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="border-b border-neutral-200">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
          <p className="text-sm font-medium uppercase tracking-[0.15em] text-neutral-500">
            About NexaStore
          </p>

          <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-neutral-950 sm:text-5xl lg:text-6xl">
            A simpler way to discover products
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-neutral-500">
            NexaStore is a modern e-commerce experience
            designed around simple navigation, thoughtful
            product discovery, and a seamless checkout
            experience.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.15em] text-neutral-500">
              Our approach
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl">
              Shopping should feel effortless.
            </h2>
          </div>

          <div className="space-y-6 text-base leading-8 text-neutral-600">
            <p>
              We believe online shopping should be
              straightforward. Finding a product,
              understanding what it offers, and
              completing a purchase shouldn&apos;t require
              unnecessary complexity.
            </p>

            <p>
              That&apos;s why NexaStore focuses on clean
              interfaces, useful product information,
              responsive experiences, and a checkout
              process that keeps the customer moving
              forward.
            </p>

            <p>
              From browsing categories to managing your
              cart, every part of the experience is
              designed to be simple and intuitive.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="border-y border-neutral-200 bg-neutral-50">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
          <div className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-[0.15em] text-neutral-500">
              What matters to us
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-neutral-950">
              Built around the customer
            </h2>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <article className="rounded-2xl bg-white p-7">
              <span className="text-sm font-semibold text-neutral-400">
                01
              </span>

              <h3 className="mt-5 text-lg font-semibold text-neutral-950">
                Simplicity
              </h3>

              <p className="mt-3 text-sm leading-6 text-neutral-500">
                Clear navigation and thoughtful interfaces
                make it easier to find what you&apos;re looking
                for.
              </p>
            </article>

            <article className="rounded-2xl bg-white p-7">
              <span className="text-sm font-semibold text-neutral-400">
                02
              </span>

              <h3 className="mt-5 text-lg font-semibold text-neutral-950">
                Quality
              </h3>

              <p className="mt-3 text-sm leading-6 text-neutral-500">
                Product information and reviews help you
                make confident purchasing decisions.
              </p>
            </article>

            <article className="rounded-2xl bg-white p-7">
              <span className="text-sm font-semibold text-neutral-400">
                03
              </span>

              <h3 className="mt-5 text-lg font-semibold text-neutral-950">
                Experience
              </h3>

              <p className="mt-3 text-sm leading-6 text-neutral-500">
                From the first visit to checkout, every
                interaction should feel fast and intuitive.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
        <div className="rounded-3xl bg-neutral-950 px-6 py-12 text-center sm:px-10 lg:py-16">
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Ready to explore?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-neutral-400">
            Browse our collection and discover
            something you&apos;ll love.
          </p>

          <Link
            href="/products"
            className="mt-8 inline-flex h-12 items-center justify-center rounded-xl bg-white px-6 text-sm font-semibold text-neutral-950 transition hover:bg-neutral-100"
          >
            Shop all products
          </Link>
        </div>
      </section>
    </main>
  );
}