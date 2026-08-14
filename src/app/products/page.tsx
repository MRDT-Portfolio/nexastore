import { ProductsContent } from "@/components/shop/ProductsContent";

export default function ProductsPage() {
  return (
    <main className="bg-white">
      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-20">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.15em] text-neutral-500">
            Shop
          </p>

          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-neutral-950 sm:text-5xl">
            Explore our products
          </h1>

          <p className="mt-5 text-base leading-7 text-neutral-600">
            Discover carefully selected
            products across electronics,
            lifestyle, beauty, fashion, and
            more.
          </p>
        </div>

        <ProductsContent />
      </section>
    </main>
  );
}