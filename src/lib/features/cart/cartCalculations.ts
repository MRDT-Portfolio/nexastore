import type { CartItem } from '@/lib/features/cart/types';

export const FREE_SHIPPING_THRESHOLD = 100;
export const SHIPPING_COST = 5.99;

export function calculateSubtotal(
  items: CartItem[]
): number {
  return items.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );
}

export function calculateShipping(
  subtotal: number
): number {
  return subtotal >= FREE_SHIPPING_THRESHOLD
    ? 0
    : SHIPPING_COST;
}

export function calculateTotal(
  subtotal: number,
  shipping: number
): number {
  return subtotal + shipping;
}

export function calculateCartTotals(
  items: CartItem[]
) {
  const subtotal = calculateSubtotal(items);
  const shipping = calculateShipping(subtotal);
  const total = calculateTotal(
    subtotal,
    shipping
  );

  return {
    subtotal,
    shipping,
    total,
  };
}