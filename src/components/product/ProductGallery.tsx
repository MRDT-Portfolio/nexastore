'use client';

import Image from 'next/image';
import { useState } from 'react';

interface ProductGalleryProps {
  images: string[];
  name: string;
}

export function ProductGallery({
  images,
  name,
}: ProductGalleryProps) {
  const [activeImage, setActiveImage] = useState(0);

  return (
    <div className="grid gap-4 sm:grid-cols-[90px_1fr]">
      {/* Thumbnails */}
      <div className="order-2 flex gap-3 overflow-x-auto sm:order-1 sm:flex-col">
        {images.map((image, index) => (
          <button
            key={image}
            type="button"
            onClick={() => setActiveImage(index)}
            className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 transition ${
              activeImage === index
                ? 'border-neutral-950'
                : 'border-transparent'
            }`}
            aria-label={`View product image ${index + 1}`}
          >
            <Image
              src={image}
              alt={`${name} thumbnail ${index + 1}`}
              fill
              sizes="80px"
              className="object-cover"
            />
          </button>
        ))}
      </div>

      {/* Main image */}
      <div className="relative aspect-square overflow-hidden rounded-3xl bg-neutral-100 sm:order-2">
        <Image
          src={images[activeImage]}
          alt={name}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
      </div>
    </div>
  );
}