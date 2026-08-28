import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import Layout from '../../components/layout';

export async function getStaticPaths() {
  const productsDirectory = path.join(process.cwd(), 'content/products');
  const fileNames = fs.readdirSync(productsDirectory);
  const paths = fileNames.map((fileName) => ({
    params: { slug: fileName.replace('.json', '') },
  }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const productsDirectory = path.join(process.cwd(), 'content/products');
  const fullPath = path.join(productsDirectory, params.slug + '.json');
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const product = JSON.parse(fileContents);

  return {
    props: {
      product,
    },
  };
}

export default function ProductDetailPage({ product }) {
  const imagePath = product.image || '/products/default-product.jpg';

  return (
    <Layout>
      <main className="min-h-screen bg-[var(--bg)]">
        {/* Breadcrumb */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <nav className="flex items-center gap-2 text-sm text-[var(--muted)]">
            <Link href="/" className="hover:text-[var(--fg)] transition-colors">Início</Link>
            <span>/</span>
            <Link href="/produtos" className="hover:text-[var(--fg)] transition-colors">Produtos</Link>
            <span>/</span>
            <span className="text-[var(--fg)]">{product.name}</span>
          </nav>
        </div>

        {/* Hero Section */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Product Image */}
            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden bg-[var(--card)] border border-[var(--border)]">
                <img
                  src={imagePath}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {product.certifications && product.certifications.length > 0 && (
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  {product.certifications.map((cert, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full bg-[var(--honey)]/90 text-[var(--bg)] text-xs font-semibold backdrop-blur-sm"
                    >
                      {cert}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="lg:sticky lg:top-24">
              <div className="space-y-6">
                {/* Category */}
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-[var(--accent)]/10 text-[var(--amber)] text-xs font-medium border border-[var(--amber)]/20">
                    {product.category}
                  </span>
                  <span className="text-xs text-[var(--muted)]">
                    {product.strength}
                  </span>
                </div>

                {/* Title */}
                <h1 className="font-display text-4xl md:text-5xl font-bold text-[var(--fg)] leading-tight">
                  {product.name}
                </h1>

                {/* Subtitle */}
                <p className="text-[var(--muted)] text-lg">
                  {product.subtitle}
                </p>

                {/* Price */}
                <div className="flex items-baseline gap-3 pt-4">
                  <span className="text-4xl font-bold text-[var(--honey)]">
                    {product.price}
                  </span>
                  {product.oldPrice && (
                    <span className="text-lg text-[var(--muted)] line-through">
                      {product.oldPrice}
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-[var(--muted)] leading-relaxed">
                  {product.description}
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <a
                    href="https://wa.me/5511999999999"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 bg-[var(--honey)] hover:bg-[var(--amber)] text-[var(--bg)] font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-[var(--honey)]/30"
                  >
                    <span>💬</span>
                    Comprar via WhatsApp
                  </a>
                  <Link
                    href="/contato"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 bg-[var(--card)] hover:bg-[var(--border)] text-[var(--fg)] font-semibold rounded-xl transition-all border border-[var(--border)]"
                  >
                    Tirar Dúvidas
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Info Cards */}
        <section className="py-16 bg-[var(--bg-subtle)]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <h2 className="font-display text-2xl font-bold text-[var(--fg)] mb-8">
              Informações do Produto
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { icon: '📦', label: 'Apresentação', value: product.presentation },
                { icon: '⚖️', label: 'Dosagem', value: product.dosage },
                { icon: '🌱', label: 'Origem', value: product.origin },
                { icon: '🧊', label: 'Armazenamento', value: product.storage },
                { icon: '📅', label: 'Validade', value: product.shelfLife },
                { icon: '🧪', label: 'Ingredientes', value: product.ingredients?.join(', ') },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-4 p-5 rounded-2xl bg-[var(--card)] border border-[var(--border)] hover:border-[var(--accent)]/30 transition-colors"
                >
                  <span className="text-2xl flex-shrink-0">{item.icon}</span>
                  <div className="min-w-0">
                    <span className="text-sm text-[var(--muted)] block">{item.label}</span>
                    <span className="text-[var(--fg)] font-medium">{item.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 border-t border-[var(--border)]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <h2 className="font-display text-2xl font-bold text-[var(--fg)] mb-8">
              Principais Benefícios
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {product.benefits.map((benefit, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 p-5 rounded-2xl bg-[var(--card)] border border-[var(--border)]"
                >
                  <div className="w-10 h-10 rounded-full bg-[var(--honey)]/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-[var(--honey)]">
                      {product.category === 'Própolis' ? '🛡️' : '🍯'}
                    </span>
                  </div>
                  <span className="text-[var(--fg)]">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How to Use */}
        <section className="py-16 border-t border-[var(--border)] bg-[var(--bg-subtle)]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <h2 className="font-display text-2xl font-bold text-[var(--fg)] mb-8">
              Como Usar
            </h2>
            <div className="p-8 rounded-3xl bg-[var(--card)] border border-[var(--border)]">
              <p className="text-[var(--muted)] text-lg leading-relaxed">
                {product.usage}
              </p>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 border-t border-[var(--border)]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="font-display text-3xl font-bold text-[var(--fg)] mb-4">
              Garanta o seu {product.name}
            </h2>
            <p className="text-[var(--muted)] text-lg mb-8 max-w-2xl mx-auto">
              Qualidade assegurada direto do apiário. Fale conosco pelo WhatsApp e receba orientação personalizada.
            </p>
            <a
              href="https://wa.me/5511999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-10 py-5 bg-[var(--honey)] hover:bg-[var(--amber)] text-[var(--bg)] font-bold text-lg rounded-xl transition-all hover:shadow-xl hover:shadow-[var(--honey)]/30"
            >
              <span>💬</span>
              Falar no WhatsApp
            </a>
          </div>
        </section>
      </main>
    </Layout>
  );
}
