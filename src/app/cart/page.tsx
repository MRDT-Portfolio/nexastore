import { CartContent } from "@/components/cart/CartContent";

export default function CartPage() {
  return (
    <main className="bg-white">
      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-20">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.15em] text-neutral-500">
              Shopping cart
            </p>

            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-neutral-950 sm:text-5xl">
              Your cart
            </h1>
          </div>
        </div>

        <CartContent />
      </section>
    </main>
  );
}
