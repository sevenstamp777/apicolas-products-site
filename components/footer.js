import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg-subtle)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-[var(--accent)] flex items-center justify-center text-white font-bold text-sm">
                🐝
              </div>
              <span className="font-display font-semibold text-lg text-[var(--fg)]">
                Apiários &amp; Cia
              </span>
            </div>
            <p className="text-[var(--muted)] text-sm max-w-md leading-relaxed">
              Produtos apícolas 100% naturais, direto do apiário para você. 
              Própolis verde, mel puro e derivados com qualidade premium.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="text-[var(--muted)] hover:text-[var(--accent)] transition-colors">
                Instagram
              </a>
              <a href="#" className="text-[var(--muted)] hover:text-[var(--accent)] transition-colors">
                WhatsApp
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-[var(--fg)] mb-4 text-sm">Navegação</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-[var(--muted)] hover:text-[var(--fg)] text-sm transition-colors">Início</Link></li>
              <li><Link href="/produtos" className="text-[var(--muted)] hover:text-[var(--fg)] text-sm transition-colors">Produtos</Link></li>
              <li><Link href="/sobre" className="text-[var(--muted)] hover:text-[var(--fg)] text-sm transition-colors">Sobre</Link></li>
              <li><Link href="/contato" className="text-[var(--muted)] hover:text-[var(--fg)] text-sm transition-colors">Contato</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-[var(--fg)] mb-4 text-sm">Contato</h4>
            <ul className="space-y-2 text-sm text-[var(--muted)]">
              <li>{process.env.NEXT_PUBLIC_EMAIL || 'contato@apiarioscia.com.br'}</li>
              <li>WhatsApp: {process.env.NEXT_PUBLIC_WHATSAPP || '(11) 99999-9999'}</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-[var(--border)] text-center">
          <p className="text-[var(--muted)] text-xs">
            © {currentYear} Apiários &amp; Cia. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}