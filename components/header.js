import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[var(--bg)]/80 border-b border-[var(--border)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <nav className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <img src="/bee-icon.svg" alt="Mel, Própolis & Cia" className="w-10 h-10 transition-transform group-hover:scale-110" />
            <span className="font-display font-semibold text-lg text-[var(--fg)]">
              Mel, Própolis &amp; Cia
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-[var(--muted)] hover:text-[var(--fg)] transition-colors text-sm font-medium">
              Início
            </Link>
            <Link href="/produtos" className="text-[var(--muted)] hover:text-[var(--fg)] transition-colors text-sm font-medium">
              Produtos
            </Link>
            <Link href="/sobre" className="text-[var(--muted)] hover:text-[var(--fg)] transition-colors text-sm font-medium">
              Sobre
            </Link>
            <Link href="/contato" className="text-[var(--muted)] hover:text-[var(--fg)] transition-colors text-sm font-medium">
              Contato
            </Link>
          </div>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <a
              href={`https://wa.me/55${process.env.NEXT_PUBLIC_WHATSAPP || '11999999999'}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-[var(--honey)] hover:bg-[var(--amber)] text-[var(--bg)] text-sm font-medium rounded-lg transition-all hover:shadow-lg hover:shadow-[var(--honey)]/20"
            >
              <span>💬</span>
              <span>Fale Conosco</span>
            </a>

            {/* Mobile menu button */}
            <button className="md:hidden p-2 text-[var(--muted)] hover:text-[var(--fg)]" aria-label="Menu">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}