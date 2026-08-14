"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";

import {
  checkoutSchema,
  type CheckoutFormValues,
} from "@/lib/validation/checkoutSchema";

import { calculateCartTotals } from "@/lib/features/cart/cartCalculations";
import { clearCart } from "@/lib/features/cart/cartSlice";

type CheckoutStep = 1 | 2 | 3;

export default function CheckoutPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const cartItems = useAppSelector((state) => state.cart.items);

  const { subtotal, shipping, total } = calculateCartTotals(cartItems);

  const [step, setStep] = useState<CheckoutStep>(1);

  const stepHeadingRef = useRef<HTMLHeadingElement>(null);

  const {
    register,
    trigger,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    mode: "onBlur",
    defaultValues: {
      country: "Bulgaria",
    },
  });

  /*
   * Focus the current step heading whenever
   * the checkout step changes.
   */
  useEffect(() => {
    stepHeadingRef.current?.focus();
  }, [step]);

  /*
   * Redirect to products if cart is empty.
   */
  if (cartItems.length === 0) {
    return (
      <main className="bg-white">
        <section className="mx-auto max-w-2xl px-6 py-20 text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-neutral-950">
            Your cart is empty
          </h1>

          <p className="mt-3 text-sm text-neutral-500">
            Add some products before continuing to checkout.
          </p>

          <Link
            href="/products"
            className="mt-7 inline-flex h-12 items-center justify-center rounded-xl bg-neutral-950 px-6 text-sm font-semibold text-white transition hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:ring-offset-2"
          >
            Continue shopping
          </Link>
        </section>
      </main>
    );
  }

  /*
   * Move to the next checkout step.
   */
  const handleNext = async () => {
    let fields: (keyof CheckoutFormValues)[] = [];

    if (step === 1) {
      fields = ["firstName", "lastName", "email", "phone"];
    }

    if (step === 2) {
      fields = ["address", "apartment", "city", "postalCode", "country"];
    }

    const isValid = await trigger(fields);

    if (!isValid) {
      return;
    }

    setStep((current) => Math.min(current + 1, 3) as CheckoutStep);
  };

  /*
   * Go back one step.
   */
  const handleBack = () => {
    setStep((current) => Math.max(current - 1, 1) as CheckoutStep);
  };

  /*
   * Place order.
   */
  const handlePlaceOrder = (data: CheckoutFormValues) => {
    console.log("Order submitted:", data);

    dispatch(clearCart());

    router.push("/checkout/success");
  };

  return (
    <main className="min-h-screen bg-neutral-50">
      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-16">
        {/* Header */}
        <div className="mb-10">
          <Link
            href="/cart"
            className="text-sm text-neutral-500 transition hover:text-neutral-950 focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:ring-offset-2"
          >
            ← Back to cart
          </Link>

          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-neutral-950">
            Checkout
          </h1>
        </div>

        {/* Progress */}
        <div className="mb-10">
          <div
            className="flex items-center"
            aria-label={`Checkout step ${step} of 3`}
          >
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex flex-1 items-center">
                <div
                  aria-current={step === stepNumber ? "step" : undefined}
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
                    step >= stepNumber
                      ? "bg-neutral-950 text-white"
                      : "bg-neutral-200 text-neutral-500"
                  }`}
                >
                  {stepNumber}
                </div>

                {stepNumber < 3 && (
                  <div
                    aria-hidden="true"
                    className={`mx-3 h-px flex-1 ${
                      step > stepNumber ? "bg-neutral-950" : "bg-neutral-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="mt-3 grid grid-cols-3 text-xs text-neutral-500">
            <span>Information</span>

            <span className="text-center">Shipping</span>

            <span className="text-right">Payment</span>
          </div>
        </div>

        {/* Main content */}
        <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
          {/* Form */}
          <div className="rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8">
            <form onSubmit={handleSubmit(handlePlaceOrder)} noValidate>
              {/* ================================= */}
              {/* Step 1 */}
              {/* ================================= */}

              {step === 1 && (
                <section aria-labelledby="checkout-step-1-title">
                  <h2
                    ref={stepHeadingRef}
                    id="checkout-step-1-title"
                    tabIndex={-1}
                    className="text-xl font-semibold text-neutral-950 outline-none"
                  >
                    Contact information
                  </h2>

                  <p className="mt-2 text-sm text-neutral-500">
                    Enter your contact details.
                  </p>

                  <div className="mt-7 grid gap-5 sm:grid-cols-2">
                    {/* First name */}
                    <FormField
                      id="firstName"
                      label="First name"
                      error={errors.firstName?.message}
                    >
                      <input
                        {...register("firstName")}
                        id="firstName"
                        autoComplete="given-name"
                        placeholder="John"
                        aria-invalid={errors.firstName ? "true" : "false"}
                        aria-describedby={
                          errors.firstName ? "firstName-error" : undefined
                        }
                        className={inputClass}
                      />
                    </FormField>

                    {/* Last name */}
                    <FormField
                      id="lastName"
                      label="Last name"
                      error={errors.lastName?.message}
                    >
                      <input
                        {...register("lastName")}
                        id="lastName"
                        autoComplete="family-name"
                        placeholder="Doe"
                        aria-invalid={errors.lastName ? "true" : "false"}
                        aria-describedby={
                          errors.lastName ? "lastName-error" : undefined
                        }
                        className={inputClass}
                      />
                    </FormField>

                    {/* Email */}
                    <FormField
                      id="email"
                      label="Email"
                      error={errors.email?.message}
                    >
                      <input
                        {...register("email")}
                        id="email"
                        type="email"
                        autoComplete="email"
                        placeholder="john@example.com"
                        aria-invalid={errors.email ? "true" : "false"}
                        aria-describedby={
                          errors.email ? "email-error" : undefined
                        }
                        className={`${inputClass} sm:col-span-2`}
                      />
                    </FormField>

                    {/* Phone */}
                    <FormField
                      id="phone"
                      label="Phone"
                      error={errors.phone?.message}
                    >
                      <input
                        {...register("phone")}
                        id="phone"
                        type="tel"
                        autoComplete="tel"
                        placeholder="+359 88 123 4567"
                        aria-invalid={errors.phone ? "true" : "false"}
                        aria-describedby={
                          errors.phone ? "phone-error" : undefined
                        }
                        className={`${inputClass} sm:col-span-2`}
                      />
                    </FormField>
                  </div>

                  <StepButton type="button" onClick={handleNext}>
                    Continue to shipping
                  </StepButton>
                </section>
              )}

              {/* ================================= */}
              {/* Step 2 */}
              {/* ================================= */}

              {step === 2 && (
                <section aria-labelledby="checkout-step-2-title">
                  <h2
                    ref={stepHeadingRef}
                    id="checkout-step-2-title"
                    tabIndex={-1}
                    className="text-xl font-semibold text-neutral-950 outline-none"
                  >
                    Shipping information
                  </h2>

                  <p className="mt-2 text-sm text-neutral-500">
                    Where should we deliver your order?
                  </p>

                  <div className="mt-7 space-y-5">
                    {/* Address */}
                    <FormField
                      id="address"
                      label="Address"
                      error={errors.address?.message}
                    >
                      <input
                        {...register("address")}
                        id="address"
                        autoComplete="street-address"
                        placeholder="123 Main Street"
                        aria-invalid={errors.address ? "true" : "false"}
                        aria-describedby={
                          errors.address ? "address-error" : undefined
                        }
                        className={inputClass}
                      />
                    </FormField>

                    {/* Apartment */}
                    <FormField
                      id="apartment"
                      label="Apartment, suite, etc. (optional)"
                      error={errors.apartment?.message}
                    >
                      <input
                        {...register("apartment")}
                        id="apartment"
                        autoComplete="address-line2"
                        placeholder="Apartment 4"
                        aria-invalid={errors.apartment ? "true" : "false"}
                        aria-describedby={
                          errors.apartment ? "apartment-error" : undefined
                        }
                        className={inputClass}
                      />
                    </FormField>

                    <div className="grid gap-5 sm:grid-cols-2">
                      {/* City */}
                      <FormField
                        id="city"
                        label="City"
                        error={errors.city?.message}
                      >
                        <input
                          {...register("city")}
                          id="city"
                          autoComplete="address-level2"
                          placeholder="Sofia"
                          aria-invalid={errors.city ? "true" : "false"}
                          aria-describedby={
                            errors.city ? "city-error" : undefined
                          }
                          className={inputClass}
                        />
                      </FormField>

                      {/* Postal code */}
                      <FormField
                        id="postalCode"
                        label="Postal code"
                        error={errors.postalCode?.message}
                      >
                        <input
                          {...register("postalCode")}
                          id="postalCode"
                          autoComplete="postal-code"
                          inputMode="numeric"
                          placeholder="1000"
                          aria-invalid={errors.postalCode ? "true" : "false"}
                          aria-describedby={
                            errors.postalCode ? "postalCode-error" : undefined
                          }
                          className={inputClass}
                        />
                      </FormField>
                    </div>

                    {/* Country */}
                    <FormField
                      id="country"
                      label="Country"
                      error={errors.country?.message}
                    >
                      <select
                        {...register("country")}
                        id="country"
                        autoComplete="country-name"
                        aria-invalid={errors.country ? "true" : "false"}
                        aria-describedby={
                          errors.country ? "country-error" : undefined
                        }
                        className={inputClass}
                      >
                        <option value="Bulgaria">Bulgaria</option>

                        <option value="Germany">Germany</option>

                        <option value="France">France</option>

                        <option value="Italy">Italy</option>

                        <option value="Spain">Spain</option>
                      </select>
                    </FormField>
                  </div>

                  <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row">
                    <StepButton
                      type="button"
                      variant="secondary"
                      onClick={handleBack}
                    >
                      Back
                    </StepButton>

                    <StepButton type="button" onClick={handleNext}>
                      Continue to payment
                    </StepButton>
                  </div>
                </section>
              )}

              {/* ================================= */}
              {/* Step 3 */}
              {/* ================================= */}

              {step === 3 && (
                <section aria-labelledby="checkout-step-3-title">
                  <h2
                    ref={stepHeadingRef}
                    id="checkout-step-3-title"
                    tabIndex={-1}
                    className="text-xl font-semibold text-neutral-950 outline-none"
                  >
                    Payment
                  </h2>

                  <p className="mt-2 text-sm text-neutral-500">
                    Enter your payment information.
                  </p>

                  <div className="mt-7 space-y-5">
                    {/* Card name */}
                    <FormField
                      id="cardName"
                      label="Name on card"
                      error={errors.cardName?.message}
                    >
                      <input
                        {...register("cardName")}
                        id="cardName"
                        autoComplete="cc-name"
                        placeholder="John Doe"
                        aria-invalid={errors.cardName ? "true" : "false"}
                        aria-describedby={
                          errors.cardName ? "cardName-error" : undefined
                        }
                        className={inputClass}
                      />
                    </FormField>

                    {/* Card number */}
                    <FormField
                      id="cardNumber"
                      label="Card number"
                      error={errors.cardNumber?.message}
                    >
                      <input
                        {...register("cardNumber")}
                        id="cardNumber"
                        inputMode="numeric"
                        autoComplete="cc-number"
                        maxLength={16}
                        placeholder="1234567890123456"
                        aria-invalid={errors.cardNumber ? "true" : "false"}
                        aria-describedby={
                          errors.cardNumber ? "cardNumber-error" : undefined
                        }
                        className={inputClass}
                      />
                    </FormField>

                    <div className="grid gap-5 sm:grid-cols-2">
                      {/* Expiry */}
                      <FormField
                        id="expiryDate"
                        label="Expiry date"
                        error={errors.expiryDate?.message}
                      >
                        <input
                          {...register("expiryDate")}
                          id="expiryDate"
                          autoComplete="cc-exp"
                          placeholder="MM/YY"
                          maxLength={5}
                          aria-invalid={errors.expiryDate ? "true" : "false"}
                          aria-describedby={
                            errors.expiryDate ? "expiryDate-error" : undefined
                          }
                          className={inputClass}
                        />
                      </FormField>

                      {/* CVV */}
                      <FormField
                        id="cvv"
                        label="CVV"
                        error={errors.cvv?.message}
                      >
                        <input
                          {...register("cvv")}
                          id="cvv"
                          inputMode="numeric"
                          autoComplete="cc-csc"
                          maxLength={4}
                          placeholder="123"
                          aria-invalid={errors.cvv ? "true" : "false"}
                          aria-describedby={
                            errors.cvv ? "cvv-error" : undefined
                          }
                          className={inputClass}
                        />
                      </FormField>
                    </div>
                  </div>

                  <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row">
                    <StepButton
                      type="button"
                      variant="secondary"
                      onClick={handleBack}
                    >
                      Back
                    </StepButton>

                    <StepButton type="submit">Place order</StepButton>
                  </div>
                </section>
              )}
            </form>
          </div>

          {/* Order summary */}
          <aside
            aria-labelledby="order-summary-title"
            className="h-fit rounded-2xl border border-neutral-200 bg-white p-6 lg:sticky lg:top-24"
          >
            <h2
              id="order-summary-title"
              className="text-lg font-semibold text-neutral-950"
            >
              Order summary
            </h2>

            <div className="mt-6 divide-y divide-neutral-100">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 py-4 first:pt-0 last:pb-0"
                >
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-neutral-100">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-2 text-sm font-medium text-neutral-950">
                      {item.name}
                    </p>

                    <p className="mt-1 text-xs text-neutral-500">
                      Qty: {item.quantity}
                    </p>
                  </div>

                  <p className="shrink-0 text-sm font-medium text-neutral-950">
                    €{(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-3 border-t border-neutral-200 pt-6">
              <div className="flex justify-between text-sm">
                <span className="text-neutral-500">Subtotal</span>

                <span className="font-medium">€{subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-neutral-500">Shipping</span>

                <span className="font-medium">
                  {shipping === 0 ? "Free" : `€${shipping.toFixed(2)}`}
                </span>
              </div>

              <div className="flex justify-between border-t border-neutral-200 pt-4">
                <span className="font-semibold">Total</span>

                <span className="text-xl font-semibold">
                  €{total.toFixed(2)}
                </span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

/* ================================= */
/* Shared form components */
/* ================================= */

const inputClass =
  "h-12 w-full rounded-xl border border-neutral-200 bg-white px-4 text-sm text-neutral-950 outline-none transition placeholder:text-neutral-400 focus:border-neutral-950 focus:ring-2 focus:ring-neutral-950 focus:ring-offset-1 aria-[invalid=true]:border-red-500 aria-[invalid=true]:focus:ring-red-500";

interface FormFieldProps {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}

function FormField({ id, label, error, children }: FormFieldProps) {
  const errorId = `${id}-error`;

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-medium text-neutral-950"
      >
        {label}
      </label>

      {children}

      {error && (
        <p id={errorId} role="alert" className="mt-2 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

interface StepButtonProps {
  children: React.ReactNode;
  type: "button" | "submit";
  onClick?: () => void;
  variant?: "primary" | "secondary";
}

function StepButton({
  children,
  type,
  onClick,
  variant = "primary",
}: StepButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`h-12 flex-1 rounded-xl px-6 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:ring-offset-2 ${
        variant === "secondary"
          ? "border border-neutral-200 bg-white text-neutral-950 hover:bg-neutral-50"
          : "bg-neutral-950 text-white hover:bg-neutral-800"
      }`}
    >
      {children}
    </button>
  );
}
