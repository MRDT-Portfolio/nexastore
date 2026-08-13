import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { ProductDetails } from '@/components/product/ProductDetails';

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { id } = await params;

  const response = await fetch(
    `https://dummyjson.com/products/${id}`
  );

  if (!response.ok) {
    return {
      title: 'Product Not Found | NexaStore',
    };
  }

  const product = await response.json();

  return {
    title: `${product.title} | NexaStore`,
    description: product.description,
  };
}

export default async function ProductPage({
  params,
}: ProductPageProps) {
  const { id } = await params;

  const productId = Number(id);

  if (!Number.isInteger(productId) || productId <= 0) {
    notFound();
  }

  return <ProductDetails productId={productId} />;
}