'use client';

import { useState } from 'react';

interface QuantitySelectorProps {
  initialQuantity?: number;
}

export function QuantitySelector({
  initialQuantity = 1,
}: QuantitySelectorProps) {
  const [quantity, setQuantity] = useState(initialQuantity);

  const decrease = () => {
    setQuantity((current) => Math.max(1, current - 1));
  };

  const increase = () => {
    setQuantity((current) => current + 1);
  };

  return (
    <div className="flex h-12 w-fit items-center rounded-xl border border-neutral-300">
      <button
        type="button"
        onClick={decrease}
        className="flex h-full w-12 items-center justify-center text-lg text-neutral-600 transition hover:text-neutral-950"
        aria-label="Decrease quantity"
      >
        −
      </button>

      <span className="w-10 text-center text-sm font-medium">
        {quantity}
      </span>

      <button
        type="button"
        onClick={increase}
        className="flex h-full w-12 items-center justify-center text-lg text-neutral-600 transition hover:text-neutral-950"
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}