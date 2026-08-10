export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  images: string[];
  category: string;
  colors: string[];
  sizes?: string[];
  features: string[];
}