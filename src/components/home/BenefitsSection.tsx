const benefits = [
  {
    icon: '🚚',
    title: 'Fast Delivery',
    description: 'Quick delivery directly to your doorstep.',
  },
  {
    icon: '↩',
    title: 'Easy Returns',
    description: '30-day return policy for complete peace of mind.',
  },
  {
    icon: '🔒',
    title: 'Secure Payment',
    description: 'Your payment information is protected and encrypted.',
  },
];

export function BenefitsSection() {
  return (
    <section className="bg-white pb-20 sm:pb-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid divide-y divide-neutral-200 rounded-3xl border border-neutral-200 md:grid-cols-3 md:divide-x md:divide-y-0">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="flex flex-col items-center px-6 py-10 text-center sm:px-10"
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-neutral-100 text-xl">
                {benefit.icon}
              </div>

              <h3 className="text-base font-semibold text-neutral-950">
                {benefit.title}
              </h3>

              <p className="mt-2 max-w-xs text-sm leading-6 text-neutral-500">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}