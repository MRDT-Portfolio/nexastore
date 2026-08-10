import type { Product } from '@/types/product';

export const products: Product[] = [
  {
    id: 1,
    name: 'Wireless Headphones',
    description:
      'Premium wireless headphones designed for immersive sound, everyday comfort, and long listening sessions.',
    price: 79.99,
    originalPrice: 99.99,
    rating: 4.8,
    reviews: 128,
    category: 'Electronics',
    colors: ['Black', 'White', 'Silver'],
    features: [
      'Active noise cancellation',
      'Up to 30 hours battery life',
      'Bluetooth 5.3',
      'Built-in microphone',
    ],
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?q=80&w=1400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=1400&auto=format&fit=crop',
    ],
  },
  {
    id: 2,
    name: 'Smart Watch Series 7',
    description:
      'A modern smartwatch combining fitness tracking, notifications, health insights, and everyday functionality.',
    price: 169.99,
    originalPrice: 199.99,
    rating: 4.7,
    reviews: 96,
    category: 'Electronics',
    colors: ['Black', 'Blue', 'Silver'],
    sizes: ['41mm', '45mm'],
    features: [
      'AMOLED display',
      'Fitness tracking',
      'Water resistant',
      'Up to 7 days battery life',
    ],
    images: [
      'https://images.unsplash.com/photo-1544117519-31a4b719223d?q=80&w=1400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1400&auto=format&fit=crop',
    ],
  },
];