import Layout from '../components/layout';

export default function SobrePage() {
  return (
    <Layout>
      <main className="min-h-screen bg-[var(--bg)]">
        <section className="py-24 border-b border-[var(--border)]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <h1 className="font-display text-4xl md:text-5xl font-bold text-[var(--fg)] mb-6">
                Sobre Nós
              </h1>
              <p className="text-[var(--muted)] max-w-2xl mx-auto leading-relaxed">
                Na Mel, Própolis & Cia, temos orgulho de trabalhar diretamente com a natureza. Fundada em 2023 por entusiastas da apicultura, nossa missão é trazer para você os benefícios puros dos produtos da colmeia e do apiário, com qualidade excepcional e procedência transparente.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Our Story */}
              <div className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)]">
                <h3 className="font-display font-semibold text-xl text-[var(--fg)] mb-4">
                  Nossa História
                </h3>
                <p className="text-[var(--muted)] text-sm">
                  Tudo começou quando nosso fundador, Erick Garcia, descobriu os benefícios da própolis verde 30% para a saúde respiratória. Desde então, dedicamo-nos a produzir produtos apícolas de alta qualidade, conectando apiários locais com consumidores conscientes.
                </p>
              </div>

              {/* Mission */}
              <div className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)]">
                <h3 className="font-display font-semibold text-xl text-[var(--fg)] mb-4">
                  Nossa Missão
                </h3>
                <p className="text-[var(--muted)] text-sm">
                  Fornecer produtos apícolas 100% naturais, direto do apiário para a sua casa, com qualidade premium, rastreabilidade total e respeito ao meio ambiente e às abelhas.
                </p>
              </div>

              {/* Values */}
              <div className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)]">
                <h3 className="font-display font-semibold text-xl text-[var(--fg)] mb-4">
                  Nossos Valores
                </h3>
                <ul className="text-[var(--muted)] text-sm space-y-2">
                  <li>🌿 100% Natural</li>
                  <li>🛡️ Qualidade Premium</li>
                  <li>🔍 Rastreabilidade</li>
                  <li>🐝 Respeito às Abelhas</li>
                  <li>🤝 Transparência</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
