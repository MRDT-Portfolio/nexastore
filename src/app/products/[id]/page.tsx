import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { ProductDetails } from '@/components/product/ProductDetails';

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  thumbnail: string;
  images: string[];
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { id } = await params;

  const response = await fetch(
    `https://dummyjson.com/products/${id}`,
    {
      next: {
        revalidate: 3600,
      },
    }
  );

  if (!response.ok) {
    return {
      title: 'Product Not Found',
      description:
        'The requested product could not be found.',
    };
  }

  const product: Product =
    await response.json();

  const productUrl = `/products/${product.id}`;

  return {
    title: product.title,

    description: product.description,

    alternates: {
      canonical: productUrl,
    },

    openGraph: {
      type: 'website',
      title: product.title,
      description: product.description,
      url: productUrl,
      images: [
        {
          url: product.thumbnail,
          width: 600,
          height: 600,
          alt: product.title,
        },
      ],
    },

    twitter: {
      card: 'summary_large_image',
      title: product.title,
      description: product.description,
      images: [product.thumbnail],
    },
  };
}

export default async function ProductPage({
  params,
}: ProductPageProps) {
  const { id } = await params;

  const productId = Number(id);

  if (
    !Number.isInteger(productId) ||
    productId <= 0
  ) {
    notFound();
  }

  return (
    <ProductDetails productId={productId} />
  );
}