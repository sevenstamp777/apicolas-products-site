import Layout from '../../components/layout';
import ProductCard from '../../components/ProductCard';
import fs from 'fs';
import path from 'path';

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

export default function ProductsPage({ products }) {
  // Group products by category
  const categories = {};
  products.forEach((p) => {
    if (!categories[p.category]) {
      categories[p.category] = [];
    }
    categories[p.category].push(p);
  });

  return (
    <Layout>
      <main className="min-h-screen bg-[var(--bg)]">
        {/* Header */}
        <section className="py-16 border-b border-[var(--border)]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto">
              <h1 className="font-display text-4xl md:text-5xl font-bold text-[var(--fg)] mb-4">
                Nossos Produtos
              </h1>
              <p className="text-[var(--muted)]">
                Descubra a linha completa de produtos apícolas naturais do nosso apiário. Cada item é cuidadosamente extraído e embalado para preservar todas as propriedades.
              </p>
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-8 border-b border-[var(--border)]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="flex flex-wrap gap-2 justify-center">
              <button className="px-4 py-2 rounded-full bg-[var(--accent)] text-white text-sm font-medium">
                Todos ({products.length})
              </button>
              {Object.keys(categories).map((cat) => (
                <button
                  key={cat}
                  className="px-4 py-2 rounded-full bg-[var(--card)] text-[var(--muted)] hover:text-[var(--fg)] hover:bg-[var(--border)] text-sm font-medium transition-colors border border-[var(--border)]"
                >
                  {cat} ({categories[cat].length})
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            {Object.entries(categories).map(([categoryName, items]) => (
              <div key={categoryName} className="mb-12 last:mb-0">
                <h2 className="font-display text-2xl font-bold text-[var(--fg)] mb-6 flex items-center gap-2">
                  <span>{categoryName === 'Própolis' ? '🛡️' : '🍯'}</span>
                  {categoryName}
                  <span className="ml-2 text-sm text-[var(--muted)] font-normal">
                    ({items.length} {items.length === 1 ? 'produto' : 'produtos'})
                  </span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {items.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </Layout>
  );
}
