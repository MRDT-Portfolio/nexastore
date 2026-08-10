import Image from 'next/image';
import Link from 'next/link';

const categories = [
  {
    name: 'Electronics',
    count: 124,
    image:
      'https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=1200&auto=format&fit=crop',
  },
  {
    name: 'Home & Living',
    count: 98,
    image:
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1200&auto=format&fit=crop',
  },
  {
    name: 'Beauty',
    count: 76,
    image:
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=1200&auto=format&fit=crop',
  },
  {
    name: 'Fashion',
    count: 112,
    image:
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1200&auto=format&fit=crop',
  },
  {
    name: 'Accessories',
    count: 85,
    image:
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1200&auto=format&fit=crop',
  },
];

export function CategorySection() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="mb-2 text-sm font-medium uppercase tracking-[0.15em] text-neutral-500">
              Explore
            </p>

            <h2 className="text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl">
              Shop by category
            </h2>
          </div>

          <Link
            href="/categories"
            className="hidden text-sm font-medium text-neutral-700 transition hover:text-neutral-950 sm:block"
          >
            View all categories →
          </Link>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={`/categories/${category.name
                .toLowerCase()
                .replaceAll(' ', '-')}`}
              className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-neutral-100"
            >
              <Image
                src={category.image}
                alt={category.name}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

              {/* Content */}
              <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                <h3 className="text-base font-semibold sm:text-lg">
                  {category.name}
                </h3>

                <p className="mt-1 text-sm text-white/70">
                  {category.count} products
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile link */}
        <Link
          href="/categories"
          className="mt-6 block text-sm font-medium text-neutral-700 sm:hidden"
        >
          View all categories →
        </Link>
      </div>
    </section>
  );
}