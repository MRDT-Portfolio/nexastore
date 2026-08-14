import type { MetadataRoute } from 'next';

interface Product {
  id: number;
}

interface ProductsResponse {
  products: Product[];
}

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  'https://nexastore.vercel.app';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/products`,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/categories`,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/about`,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  const response = await fetch(
    'https://dummyjson.com/products?limit=0',
    {
      next: {
        revalidate: 3600,
      },
    },
  );

  if (!response.ok) {
    return staticRoutes;
  }

  const data: ProductsResponse =
    await response.json();

  const productRoutes: MetadataRoute.Sitemap =
    data.products.map((product) => ({
      url: `${BASE_URL}/products/${product.id}`,
      changeFrequency: 'weekly',
      priority: 0.8,
    }));

  return [
    ...staticRoutes,
    ...productRoutes,
  ];
}