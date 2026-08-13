export default function Loading() {
  return (
    <main className="min-h-[60vh] bg-white">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-20">
        <div className="animate-pulse space-y-8">
          {/* Heading */}
          <div className="h-8 w-48 rounded-lg bg-neutral-200" />

          {/* Content */}
          <div className="grid gap-8 md:grid-cols-3">
            <div className="aspect-square rounded-2xl bg-neutral-200" />
            <div className="aspect-square rounded-2xl bg-neutral-200" />
            <div className="aspect-square rounded-2xl bg-neutral-200" />
          </div>
        </div>
      </div>
    </main>
  );
}