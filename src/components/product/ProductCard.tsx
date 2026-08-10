import Image from 'next/image';
import Link from 'next/link';

interface ProductCardProps {
  id: number;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  discount?: number;
}

export function ProductCard({
  id,
  name,
  image,
  price,
  originalPrice,
  rating,
  reviews,
  discount,
}: ProductCardProps) {
  return (
    <article className="group relative">
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-neutral-100">
        <Link href={`/products/${id}`}>
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        </Link>

        {discount && (
          <span className="absolute left-3 top-3 rounded-md bg-red-500 px-2 py-1 text-xs font-semibold text-white">
            -{discount}%
          </span>
        )}

        <button
          type="button"
          aria-label={`Add ${name} to wishlist`}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white text-lg shadow-sm transition hover:scale-105"
        >
          ♡
        </button>

        <button
          type="button"
          className="absolute bottom-3 left-3 right-3 translate-y-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-neutral-950 opacity-0 shadow-lg transition duration-300 group-hover:translate-y-0 group-hover:opacity-100"
        >
          Add to cart
        </button>
      </div>

      <div className="pt-4">
        <Link href={`/products/${id}`}>
          <h3 className="line-clamp-1 text-sm font-semibold text-neutral-950 transition hover:text-neutral-500">
            {name}
          </h3>
        </Link>

        <div className="mt-2 flex items-center gap-2">
          <div
            className="flex items-center gap-0.5 text-sm text-amber-400"
            aria-label={`${rating} out of 5 stars`}
          >
            {'★★★★★'.split('').map((star, index) => (
              <span
                key={index}
                className={index < Math.round(rating) ? '' : 'text-neutral-300'}
              >
                {star}
              </span>
            ))}
          </div>

          <span className="text-xs text-neutral-500">
            ({reviews})
          </span>
        </div>

        <div className="mt-2 flex items-center gap-2">
          <span className="text-sm font-semibold text-neutral-950">
            €{price.toFixed(2)}
          </span>

          {originalPrice && (
            <span className="text-sm text-neutral-400 line-through">
              €{originalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}