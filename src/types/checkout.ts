export interface CheckoutFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;

  address: string;
  apartment?: string;
  city: string;
  postalCode: string;
  country: string;

  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardName: string;
}