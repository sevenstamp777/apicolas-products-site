import Link from 'next/link';

export default function ProductCard({ product }) {
  return (
    <Link href={`/produtos/${product.id}`} className="group block">
      <div className="rounded-2xl bg-[var(--card)] border border-[var(--border)] overflow-hidden transition-all duration-300 group-hover:shadow-xl group-hover:shadow-black/20 group-hover:border-[var(--accent)]/40">
        {/* Image placeholder */}
        <div className="h-48 bg-gradient-to-br from-[var(--accent)]/5 via-[var(--accent-light)]/10 to-[var(--honey)]/5 border-b border-[var(--border)] flex items-center justify-center">
          <span className="text-5xl">{product.category === 'Própolis' ? '🛡️' : '🍯'}</span>
        </div>

        <div className="p-6 space-y-4">
          {/* Category badge */}
          <div className="flex items-center justify-between">
            <span className="inline-block px-2.5 py-0.5 rounded-full bg-[var(--accent)]/10 text-[var(--amber)] text-xs font-medium border border-[var(--amber)]/20">
              {product.category}
            </span>
            <span className="text-xs text-[var(--muted)] bg-[var(--border)]/20 px-2 py-0.5 rounded-full">
              {product.strength}
            </span>
          </div>

          {/* Product info */}
          <div>
            <h3 className="font-display font-semibold text-xl text-[var(--fg)] group-hover:text-[var(--amber)] transition-colors">
              {product.name}
            </h3>
            <p className="text-sm text-[var(--muted)] mt-1 line-clamp-2">
              {product.subtitle}
            </p>
          </div>

          {/* Pricing */}
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold text-[var(--accent)]">
              {product.price}
            </span>
            {product.oldPrice && (
              <span className="text-sm text-[var(--muted)] line-through">
                {product.oldPrice}
              </span>
            )}
          </div>

          {/* View link */}
          <div className="pt-2 text-[var(--amber)] text-sm font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            Ver detalhes
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}