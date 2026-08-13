"use client";

import { useState } from "react";
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
            className="mt-7 inline-flex h-12 items-center justify-center rounded-xl bg-neutral-950 px-6 text-sm font-semibold text-white transition hover:bg-neutral-800"
          >
            Continue shopping
          </Link>
        </section>
      </main>
    );
  }

  /*
   * Move to next checkout step.
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
            className="text-sm text-neutral-500 transition hover:text-neutral-950"
          >
            ← Back to cart
          </Link>

          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-neutral-950">
            Checkout
          </h1>
        </div>

        {/* Progress */}
        <div className="mb-10">
          <div className="flex items-center">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex flex-1 items-center">
                <div
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
            <form onSubmit={handleSubmit(handlePlaceOrder)}>
              {/* ================================= */}
              {/* Step 1 */}
              {/* ================================= */}

              {step === 1 && (
                <section>
                  <h2 className="text-xl font-semibold text-neutral-950">
                    Contact information
                  </h2>

                  <p className="mt-2 text-sm text-neutral-500">
                    Enter your contact details.
                  </p>

                  <div className="mt-7 grid gap-5 sm:grid-cols-2">
                    <FormField
                      label="First name"
                      error={errors.firstName?.message}
                    >
                      <input
                        {...register("firstName")}
                        placeholder="John"
                        className={inputClass}
                      />
                    </FormField>

                    <FormField
                      label="Last name"
                      error={errors.lastName?.message}
                    >
                      <input
                        {...register("lastName")}
                        placeholder="Doe"
                        className={inputClass}
                      />
                    </FormField>

                    <FormField label="Email" error={errors.email?.message}>
                      <input
                        {...register("email")}
                        type="email"
                        placeholder="john@example.com"
                        className={`${inputClass} sm:col-span-2`}
                      />
                    </FormField>

                    <FormField label="Phone" error={errors.phone?.message}>
                      <input
                        {...register("phone")}
                        type="tel"
                        placeholder="+359 88 123 4567"
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
                <section>
                  <h2 className="text-xl font-semibold text-neutral-950">
                    Shipping information
                  </h2>

                  <p className="mt-2 text-sm text-neutral-500">
                    Where should we deliver your order?
                  </p>

                  <div className="mt-7 space-y-5">
                    <FormField label="Address" error={errors.address?.message}>
                      <input
                        {...register("address")}
                        placeholder="123 Main Street"
                        className={inputClass}
                      />
                    </FormField>

                    <FormField
                      label="Apartment, suite, etc. (optional)"
                      error={errors.apartment?.message}
                    >
                      <input
                        {...register("apartment")}
                        placeholder="Apartment 4"
                        className={inputClass}
                      />
                    </FormField>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <FormField label="City" error={errors.city?.message}>
                        <input
                          {...register("city")}
                          placeholder="Sofia"
                          className={inputClass}
                        />
                      </FormField>

                      <FormField
                        label="Postal code"
                        error={errors.postalCode?.message}
                      >
                        <input
                          {...register("postalCode")}
                          placeholder="1000"
                          className={inputClass}
                        />
                      </FormField>
                    </div>

                    <FormField label="Country" error={errors.country?.message}>
                      <select {...register("country")} className={inputClass}>
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
                <section>
                  <h2 className="text-xl font-semibold text-neutral-950">
                    Payment
                  </h2>

                  <p className="mt-2 text-sm text-neutral-500">
                    Enter your payment information.
                  </p>

                  <div className="mt-7 space-y-5">
                    <FormField
                      label="Name on card"
                      error={errors.cardName?.message}
                    >
                      <input
                        {...register("cardName")}
                        placeholder="John Doe"
                        className={inputClass}
                      />
                    </FormField>

                    <FormField
                      label="Card number"
                      error={errors.cardNumber?.message}
                    >
                      <input
                        {...register("cardNumber")}
                        inputMode="numeric"
                        maxLength={16}
                        placeholder="1234567890123456"
                        className={inputClass}
                      />
                    </FormField>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <FormField
                        label="Expiry date"
                        error={errors.expiryDate?.message}
                      >
                        <input
                          {...register("expiryDate")}
                          placeholder="MM/YY"
                          maxLength={5}
                          className={inputClass}
                        />
                      </FormField>

                      <FormField label="CVV" error={errors.cvv?.message}>
                        <input
                          {...register("cvv")}
                          inputMode="numeric"
                          maxLength={4}
                          placeholder="123"
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
          <aside className="h-fit rounded-2xl border border-neutral-200 bg-white p-6 lg:sticky lg:top-24">
            <h2 className="text-lg font-semibold text-neutral-950">
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
  "h-12 w-full rounded-xl border border-neutral-200 bg-white px-4 text-sm text-neutral-950 outline-none transition placeholder:text-neutral-400 focus:border-neutral-950 focus:ring-1 focus:ring-neutral-950";

interface FormFieldProps {
  label: string;
  error?: string;
  children: React.ReactNode;
}

function FormField({ label, error, children }: FormFieldProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-neutral-950">
        {label}
      </label>

      {children}

      {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
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
      className={`h-12 flex-1 rounded-xl px-6 text-sm font-semibold transition ${
        variant === "secondary"
          ? "border border-neutral-200 bg-white text-neutral-950 hover:bg-neutral-50"
          : "bg-neutral-950 text-white hover:bg-neutral-800"
      }`}
    >
      {children}
    </button>
  );
}
