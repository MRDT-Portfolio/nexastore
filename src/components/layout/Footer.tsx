import Link from 'next/link';

const shopLinks = [
  { label: 'All Products', href: '/products' },
  { label: 'Electronics', href: '/categories/electronics' },
  { label: 'Home & Living', href: '/categories/home-living' },
  { label: 'Beauty', href: '/categories/beauty' },
];

const companyLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Shipping', href: '/shipping' },
  { label: 'Returns', href: '/returns' },
];

export function Footer() {
  return (
    <footer className="bg-neutral-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="text-2xl font-semibold tracking-tight"
            >
              NexaStore
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-6 text-neutral-400">
              Carefully selected products designed to make everyday life
              simpler, better, and more enjoyable.
            </p>

            <div className="mt-6 flex gap-3">
              {['Instagram', 'Facebook', 'X'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="flex h-9 items-center rounded-full border border-neutral-700 px-4 text-xs text-neutral-300 transition hover:border-neutral-500 hover:text-white"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-sm font-semibold">Shop</h3>

            <ul className="mt-5 space-y-3">
              {shopLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-400 transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold">Company</h3>

            <ul className="mt-5 space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-400 transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 flex flex-col gap-4 border-t border-neutral-800 pt-6 text-xs text-neutral-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 NexaStore. All rights reserved.</p>

          <div className="flex gap-5">
            <Link href="/privacy" className="transition hover:text-white">
              Privacy
            </Link>

            <Link href="/terms" className="transition hover:text-white">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}