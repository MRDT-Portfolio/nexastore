"use client";

import type { ProductReview } from "@/types/product";

interface ProductReviewsProps {
  reviews: ProductReview[];
  rating: number;
}

function getRatingPercentage(
  reviews: ProductReview[],
  rating: number
) {
  if (reviews.length === 0) {
    return 0;
  }

  const count = reviews.filter(
    (review) => Math.round(review.rating) === rating
  ).length;

  return Math.round(
    (count / reviews.length) * 100
  );
}

function formatReviewDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
  }).format(new Date(date));
}

export function ProductReviews({
  reviews,
  rating,
}: ProductReviewsProps) {
const averageRating =
  reviews.length === 0
    ? rating
    : reviews.reduce(
        (sum, review) => sum + review.rating,
        0
      ) / reviews.length;

  if (reviews.length === 0) {
    return (
      <section className="border-t border-neutral-200 pt-10">
        <h2 className="text-2xl font-semibold tracking-tight text-neutral-950">
          Customer reviews
        </h2>

        <p className="mt-4 text-sm text-neutral-500">
          No reviews yet.
        </p>
      </section>
    );
  }

  return (
    <section className="border-t border-neutral-200 pt-10">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-neutral-950">
          Customer reviews
        </h2>

        <p className="mt-2 text-sm text-neutral-500">
          See what customers think about this product.
        </p>
      </div>

      {/* Rating summary */}
      <div className="mt-8 grid gap-8 md:grid-cols-[180px_1fr]">
        {/* Average */}
        <div className="flex flex-col items-center justify-center rounded-2xl bg-neutral-50 p-6 text-center">
          <span className="text-4xl font-semibold text-neutral-950">
            {averageRating.toFixed(1)}
          </span>

          <div
            className="mt-2 text-lg tracking-wide text-amber-500"
            aria-label={`Average rating ${averageRating.toFixed(1)} out of 5`}
          >
            {"★★★★★"}
          </div>

          <p className="mt-2 text-sm text-neutral-500">
            {reviews.length}{" "}
            {reviews.length === 1
              ? "review"
              : "reviews"}
          </p>
        </div>

        {/* Rating distribution */}
        <div className="flex flex-col justify-center gap-3">
          {[5, 4, 3, 2, 1].map((ratingValue) => {
            const percentage =
              getRatingPercentage(
                reviews,
                ratingValue
              );

            return (
              <div
                key={ratingValue}
                className="flex items-center gap-3"
              >
                <span className="w-8 text-sm text-neutral-600">
                  {ratingValue} ★
                </span>

                <div className="h-2 flex-1 overflow-hidden rounded-full bg-neutral-100">
                  <div
                    className="h-full rounded-full bg-neutral-900 transition-all"
                    style={{
                      width: `${percentage}%`,
                    }}
                  />
                </div>

                <span className="w-10 text-right text-xs text-neutral-400">
                  {percentage}%
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-10 divide-y divide-neutral-200 border-y border-neutral-200">
        {reviews.map((review, index) => (
          <article
            key={`${review.reviewerEmail}-${review.date}-${index}`}
            className="py-7"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h3 className="font-medium text-neutral-950">
                  {review.reviewerName}
                </h3>

                <div
                  className="mt-1 text-sm tracking-wide text-amber-500"
                  aria-label={`Rating ${review.rating} out of 5`}
                >
                  {"★".repeat(
                    Math.round(review.rating)
                  )}
                  <span className="text-neutral-200">
                    {"★".repeat(
                      5 - Math.round(review.rating)
                    )}
                  </span>
                </div>
              </div>

              <time
                dateTime={review.date}
                className="text-xs text-neutral-400"
              >
                {formatReviewDate(review.date)}
              </time>
            </div>

            <p className="mt-4 max-w-3xl text-sm leading-7 text-neutral-600">
              {review.comment}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}