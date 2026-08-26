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
        {/* Hero */}
        <section className="relative overflow-hidden min-h-[400px] md:min-h-[600px] lg:min-h-[700px]">
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="font-display text-4xl md:text-6xl font-bold text-[var(--fg)] mb-4">
                  {product.name}
                </h1>
                <p className="text-[var(--muted)] text-lg mb-8 line-clamp-3">
                  {product.description}
                </p>
                <div className="flex gap-3 pt-8 border-t border-[var(--border)]">
                  <span className="text-3xl font-bold text-[var(--accent)]">
                    {product.price}
                  </span>
                  {product.oldPrice && (
                    <span className="text-sm text-[var(--muted)] line-through">
                      {product.oldPrice}
                    </span>
                  )}
                </div>
              </div>

              {/* Specifications */}
              <div>
                <h2 className="font-display font-semibold text-xl text-[var(--fg)] mb-6">
                  Informações do Produto
                </h2>
                <div className="space-y-4 text-sm text-[var(--muted)]">
                  <div className="flex items-baseline justify-between">
                    <span className="text-[var(--fg)] font-medium">Categoria:</span>
                    <span>{product.category}</span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-[var(--fg)] font-medium">Fortalecimento:</span>
                    <span>{product.strength}</span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-[var(--fg)] font-medium">Consumo:</span>
                    <span>{product.usage}</span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-[var(--fg)] font-medium">Quantidade:</span>
                    <span>{product.presentation}</span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-[var(--fg)] font-medium">Armazenamento:</span>
                    <span>{product.storage}</span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-[var(--fg)] font-medium">Validade:</span>
                    <span>{product.shelfLife}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 border-b border-[var(--border)] bg-[var(--bg-subtle)]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <h2 className="font-display text-3xl font-bold text-[var(--fg)] mb-6">
              Principais Benefícios
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {product.benefits.map((benefit, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 rounded-lg bg-[var(--card)] border border-[var(--border)] px-4 py-3"
                >
                  <span className="text-[var(--accent)] text-lg">
                    {product.category === 'Própolis' ? '🛡️' : '🍯'}
                  </span>
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Usage */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <h2 className="font-display text-3xl font-bold text-[var(--fg)] mb-6">
              Como Usar
            </h2>
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-8">
              <p className="text-[var(--muted)] text-lg mb-6">{product.usage}</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-3 rounded bg-[var(--accent)]/10 border border-[var(--accent)]/20">
                  <span className="font-medium text-sm text-[var(--fg)]">Dosagem:</span>
                  <p className="text-sm mt-1 text-[var(--muted)]">{product.dosage}</p>
                </div>
                <div className="p-3 rounded bg-[var(--accent)]/10 border border-[var(--accent)]/20">
                  <span className="font-medium text-sm text-[var(--fg)]">Origem:</span>
                  <p className="text-sm mt-1 text-[var(--muted)]">{product.origin}</p>
                </div>
                <div className="p-3 rounded bg-[var(--accent)]/10 border border-[var(--accent)]/20">
                  <span className="font-medium text-sm text-[var(--fg)]">Ingredientes:</span>
                  <p className="text-sm mt-1 text-[var(--muted)]">
                    {product.ingredients.join(', ')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 border-t border-[var(--border)] bg-[var(--bg-subtle)]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <p className="text-[var(--muted)] text-lg mb-6">
              Escolheu este produto? Garanta o seu agora com qualidade assegurada.
            </p>
            <a
              href="https://wa.me/5511999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--accent)] hover:bg-[var(--accent-light)] text-white font-semibold rounded-lg transition-all hover:shadow-lg hover:shadow-[var(--accent)]/30"
            >
              <span>💬</span>
              Comprar via WhatsApp
            </a>
          </div>
        </section>
      </main>
    </Layout>
  );
}
