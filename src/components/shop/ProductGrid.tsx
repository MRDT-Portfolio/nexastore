import { ProductCard } from '@/components/product/ProductCard';
import type { Product } from '@/types/product';

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({
  products,
}: ProductGridProps) {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => {
        const originalPrice =
          product.discountPercentage > 0
            ? product.price /
              (1 - product.discountPercentage / 100)
            : undefined;

        return (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.title}
            image={product.thumbnail}
            price={product.price}
            originalPrice={originalPrice}
            rating={product.rating}
            reviews={product.reviews?.length ?? 0}
            discount={Math.round(
              product.discountPercentage
            )}
          />
        );
      })}
    </div>
  );
}