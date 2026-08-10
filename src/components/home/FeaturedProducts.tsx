import Link from 'next/link';
import { ProductCard } from '@/components/product/ProductCard';

const products = [
  {
    id: 1,
    name: 'Wireless Headphones',
    image:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1200&auto=format&fit=crop',
    price: 79.99,
    originalPrice: 99.99,
    rating: 4.8,
    reviews: 128,
    discount: 20,
  },
  {
    id: 2,
    name: 'Smart Watch Series 7',
    image:
      'https://images.unsplash.com/photo-1544117519-31a4b719223d?q=80&w=1200&auto=format&fit=crop',
    price: 169.99,
    originalPrice: 199.99,
    rating: 4.7,
    reviews: 96,
    discount: 15,
  },
  {
    id: 3,
    name: 'Portable Bluetooth Speaker',
    image:
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=1200&auto=format&fit=crop',
    price: 49.99,
    rating: 4.9,
    reviews: 64,
  },
  {
    id: 4,
    name: 'Minimal Backpack',
    image:
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1200&auto=format&fit=crop',
    price: 89.99,
    originalPrice: 99.99,
    rating: 4.6,
    reviews: 87,
    discount: 10,
  },
  {
    id: 5,
    name: 'Digital Camera 4K',
    image:
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1200&auto=format&fit=crop',
    price: 499.99,
    rating: 4.8,
    reviews: 45,
  },
];

export function FeaturedProducts() {
  return (
    <section className="bg-white pb-20 pt-4 sm:pb-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="mb-2 text-sm font-medium uppercase tracking-[0.15em] text-neutral-500">
              Our selection
            </p>

            <h2 className="text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl">
              Featured products
            </h2>
          </div>

          <Link
            href="/products"
            className="hidden text-sm font-medium text-neutral-700 transition hover:text-neutral-950 sm:block"
          >
            View all products →
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-5 lg:gap-x-5">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>

        <Link
          href="/products"
          className="mt-10 block text-sm font-medium text-neutral-700 sm:hidden"
        >
          View all products →
        </Link>
      </div>
    </section>
  );
}