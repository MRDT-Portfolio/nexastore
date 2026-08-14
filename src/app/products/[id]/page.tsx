import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProductDetails } from "@/components/product/ProductDetails";
import type { Product } from "@/types/product";

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

const API_URL = "https://dummyjson.com/products";

async function getProduct(
  id: number,
): Promise<Product | null> {
  const response = await fetch(
    `${API_URL}/${id}`,
    {
      next: {
        revalidate: 3600,
      },
    },
  );

  if (!response.ok) {
    return null;
  }

  return response.json();
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { id } = await params;

  const productId = Number(id);

  if (
    !Number.isInteger(productId) ||
    productId <= 0
  ) {
    return {
      title: "Product Not Found",
    };
  }

  const product = await getProduct(productId);

  if (!product) {
    return {
      title: "Product Not Found",
      description:
        "The requested product could not be found.",
    };
  }

  const productUrl = `/products/${product.id}`;

  return {
    title: product.title,
    description: product.description,

    alternates: {
      canonical: productUrl,
    },

    openGraph: {
      type: "website",
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
      card: "summary_large_image",
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

  const product = await getProduct(productId);

  if (!product) {
    notFound();
  }

  return <ProductDetails product={product} />;
}