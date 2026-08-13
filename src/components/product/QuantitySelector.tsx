'use client';

interface QuantitySelectorProps {
  quantity: number;
  onDecrease: () => void;
  onIncrease: () => void;
}

export function QuantitySelector({
  quantity,
  onDecrease,
  onIncrease,
}: QuantitySelectorProps) {
  return (
    <div className="flex h-12 w-fit items-center rounded-xl border border-neutral-300">
      <button
        type="button"
        onClick={onDecrease}
        disabled={quantity <= 1}
        className="flex h-full w-12 items-center justify-center text-lg text-neutral-600 transition hover:text-neutral-950 disabled:cursor-not-allowed disabled:opacity-30"
        aria-label="Decrease quantity"
      >
        −
      </button>

      <span className="w-10 text-center text-sm font-medium">
        {quantity}
      </span>

      <button
        type="button"
        onClick={onIncrease}
        className="flex h-full w-12 items-center justify-center text-lg text-neutral-600 transition hover:text-neutral-950"
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}