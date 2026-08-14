import { ProductGallery } from "./ProductGallery";
import { ProductInfo } from "./ProductInfo";
import { ProductReviews } from "./ProductReviews";

import type { Product } from "@/types/product";

interface ProductDetailsProps {
  product: Product;
}

export function ProductDetails({
  product,
}: ProductDetailsProps) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-20">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <ProductGallery
          images={product.images}
          name={product.title}
        />

        <ProductInfo product={product} />
      </div>

      <ProductReviews
        reviews={product.reviews}
        rating={product.rating}
      />
    </section>
  );
}