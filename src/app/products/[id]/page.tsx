import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProductGallery } from '@/components/product/ProductGallery';
import { ProductInfo } from '@/components/product/ProductInfo';
import { products } from '@/lib/products';

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { id } = await params;

  const product = products.find(
    (item) => item.id === Number(id)
  );

  if (!product) {
    return {
      title: 'Product Not Found | NexaStore',
    };
  }

  return {
    title: `${product.name} | NexaStore`,
    description: product.description,
  };
}

export default async function ProductPage({
  params,
}: ProductPageProps) {
  const { id } = await params;

  const product = products.find(
    (item) => item.id === Number(id)
  );

  if (!product) {
    notFound();
  }

  return (
    <main>
      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <ProductGallery
            images={product.images}
            name={product.name}
          />

          <ProductInfo product={product} />
        </div>
      </section>
    </main>
  );
}