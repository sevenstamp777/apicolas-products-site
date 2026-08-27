import fs from 'fs';
import path from 'path';
import Layout from '../components/layout';
import ProductCard from '../components/ProductCard';

export async function getStaticProps() {
  const productsDirectory = path.join(process.cwd(), 'content/products');
  const fileNames = fs.readdirSync(productsDirectory);
  const products = fileNames.map((fileName) => {
    const fullPath = path.join(productsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    return JSON.parse(fileContents);
  });

  return {
    props: {
      products,
    },
  };
}

export default function Home({ products }) {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-[var(--border)]">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--honey)]/20 via-[var(--accent-light)]/10 to-transparent" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-20 md:py-32">
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex justify-center mb-8">
              <img src="/logo.png" alt="Mel, Própolis & Cia" className="w-40 h-40 md:w-52 md:h-52 drop-shadow-lg rounded-full" />
            </div>
            <span className="inline-block px-3 py-1 rounded-full bg-[var(--accent)]/10 text-[var(--amber)] text-xs font-medium border border-[var(--amber)]/20 mb-6">
              🐝 100% Natural · Direto do Apiário
            </span>
            <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-[var(--fg)] mb-6 leading-tight">
              A natureza na sua
              <span className="block bg-gradient-to-r from-[var(--amber)] via-[var(--accent-light)] to-[var(--accent)] bg-clip-text text-transparent">
                forma mais pura
              </span>
            </h1>
            <p className="text-lg md:text-xl text-[var(--muted)] max-w-2xl mx-auto mb-10 leading-relaxed">
              Própolis, mel e produtos apícolas selecionados para quem valoriza saúde, 
              qualidade e procedência rastreável.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#produtos"
                className="px-8 py-4 bg-[var(--honey)] hover:bg-[var(--amber)] text-[var(--bg)] font-semibold rounded-lg transition-all hover:shadow-lg hover:shadow-[var(--honey)]/30"
              >
                Ver Produtos
              </a>
              <a
                href="https://wa.me/5511999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-[var(--card)] hover:bg-[var(--border)] text-[var(--fg)] font-semibold rounded-lg transition-all border border-[var(--border)]"
              >
                Falar com Especialista
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 border-b border-[var(--border)] bg-[var(--bg-subtle)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { icon: '🌿', label: '100% Natural' },
              { icon: '🛡️', label: 'Selo de Qualidade' },
              { icon: '🚚', label: 'Entrega Garantida' },
              { icon: '📦', label: 'Rastreabilidade' },
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center gap-2">
                <div className="text-3xl">{item.icon}</div>
                <span className="text-sm font-medium text-[var(--fg)]">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="produtos" className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[var(--fg)] mb-4">
              Nossos Produtos
            </h2>
            <p className="text-[var(--muted)]">
              Cada produto é cuidadosamente extraído e embalado para preservar todas 
              as propriedades naturais que só o apiário oferece.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 border-t border-[var(--border)] bg-[var(--bg-subtle)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-[var(--fg)] mb-4">
            Dúvidas sobre qual produto é ideal para você?
          </h2>
          <p className="text-[var(--muted)] mb-8 max-w-2xl mx-auto">
            Nossa equipe está pronta para te orientar na escolha do produto perfeito 
            para sua rotina e necessidades.
          </p>
          <a
            href="https://wa.me/5511999999999"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--honey)] hover:bg-[var(--amber)] text-[var(--bg)] font-semibold rounded-lg transition-all hover:shadow-lg hover:shadow-[var(--honey)]/30"
          >
            <span>💬</span>
            Falar pelo WhatsApp
          </a>
        </div>
      </section>
    </Layout>
  );
}