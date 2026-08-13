import { z } from 'zod';

export const checkoutSchema = z.object({
  firstName: z
    .string()
    .min(2, 'First name must contain at least 2 characters'),

  lastName: z
    .string()
    .min(2, 'Last name must contain at least 2 characters'),

  email: z
    .string()
    .email('Please enter a valid email address'),

  phone: z
    .string()
    .min(7, 'Please enter a valid phone number'),

  address: z
    .string()
    .min(5, 'Please enter your address'),

  apartment: z
    .string()
    .optional(),

  city: z
    .string()
    .min(2, 'Please enter your city'),

  postalCode: z
    .string()
    .min(3, 'Please enter a valid postal code'),

  country: z
    .string()
    .min(2, 'Please select your country'),

  cardNumber: z
    .string()
    .regex(
      /^\d{16}$/,
      'Card number must contain 16 digits'
    ),

  expiryDate: z
    .string()
    .regex(
      /^(0[1-9]|1[0-2])\/\d{2}$/,
      'Use MM/YY format'
    ),

  cvv: z
    .string()
    .regex(
      /^\d{3,4}$/,
      'CVV must contain 3 or 4 digits'
    ),

  cardName: z
    .string()
    .min(2, 'Please enter the name on the card'),
});

export type CheckoutFormValues = z.infer<
  typeof checkoutSchema
>;