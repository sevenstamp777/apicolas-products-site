import Layout from '../components/layout';
import CaptureForm from '../components/CaptureForm';

export default function CapturaPage() {
  return (
    <Layout>
      <main className="min-h-screen bg-[var(--bg)]">
        {/* Hero Section */}
        <section className="py-24 border-b border-[var(--border)]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="inline-block px-3 py-1 rounded-full bg-[var(--accent)]/10 text-[var(--amber)] text-xs font-medium border border-[var(--amber)]/20 mb-6">
                🐝 Comunidade de Saúde Natural
              </span>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--fg)] mb-6 leading-tight">
                Junte-se à nossa comunidade de quem entende verdadeira saúde
              </h1>
              <p className="text-lg text-[var(--muted)] max-w-2xl mx-auto leading-relaxed">
                Receba dicas exclusivas sobre imunidade natural, novidades do apiário e ofertas especiais direto no seu WhatsApp. Mais de 2.000 pessoas já fazem parte desta comunidade.
              </p>
            </div>

            {/* Form Section */}
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-8 max-w-md mx-auto">
              <h2 className="font-display font-semibold text-2xl text-[var(--fg)] mb-6 text-center">
                Receba nosso guia gratuito
              </h2>
              <p className="text-[var(--muted)] text-sm text-center mb-8">
                Preencha seus dados e ganhe o e-book "Imunidade Pós-Treino" com receitas exclusivas de própolis e mel.
              </p>
              <CaptureForm />
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 border-b border-[var(--border)] bg-[var(--bg-subtle)]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { icon: '💡', title: 'Dicas Exclusivas', desc: 'Conteúdo premium sobre saúde natural' },
                { icon: '🛡️', title: 'Conteúdo Premium', desc: 'Própolis, mel e bem-estar' },
                { icon: '🎁', title: 'Ofertas Especiais', desc: 'Descontos para inscritos' },
                { icon: '📱', title: 'No WhatsApp', desc: 'Receba direto no celular' },
              ].map((item, idx) => (
                <div key={idx} className="p-4">
                  <div className="text-3xl mb-2">{item.icon}</div>
                  <div className="font-medium text-[var(--fg)] text-sm mb-1">{item.title}</div>
                  <p className="text-[var(--muted)] text-xs">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl font-bold text-[var(--fg)] mb-4">
                O que nossos clientes dizem
              </h2>
              <p className="text-[var(--muted)]">
                Depoimentos de quem já transformou sua rotina com produtos naturais
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  name: 'Carolina M.',
                  text: 'O própolis verde 30% mudou meu dia a dia! Não tenho mais resfriados e a energia está óptima.',
                  avatar: '🦋',
                },
                {
                  name: 'Ricardo S.',
                  text: 'Mel puro da minha região é incrível. A qualidade é notável e o sabor único.',
                  avatar: '🐝',
                },
                {
                  name: 'Julia T.',
                  text: 'Comprei o spray de própolis para viajar. Foi uma óptima solução para a garganta no voo!',
                  avatar: '🌿',
                },
              ].map((testimonial, idx) => (
                <div key={idx} className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6">
                  <div className="flex gap-3 mb-4">
                    <div className="text-2xl">{testimonial.avatar}</div>
                    <div>
                      <div className="font-medium text-[var(--fg)]">{testimonial.name}</div>
                      <div className="text-xs text-[var(--muted)]">Cliente desde 2024</div>
                    </div>
                  </div>
                  <p className="text-[var(--muted)] text-sm leading-relaxed">
                    {testimonial.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 border-t border-[var(--border)]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="font-display text-3xl font-bold text-[var(--fg)] mb-6">
              Pronto para melhorar sua saúde naturalmente?
            </h2>
            <p className="text-[var(--muted)] mb-8 max-w-2xl mx-auto">
              Inscreva-se agora e receba o guia gratuito + nosso e-book "Imunidade Pós-Treino". Comprometemos-nos em entregar apenas o melhor da apicultura.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/captura"
                className="px-8 py-4 bg-[var(--honey)] hover:bg-[var(--amber)] text-[var(--bg)] font-semibold rounded-xl transition-all hover:shadow-lg"
              >
                Inscrever-se Gratuito
              </a>
              <a
                href="/"
                className="px-8 py-4 bg-[var(--card)] hover:bg-[var(--border)] text-[var(--fg)] font-semibold rounded-xl transition-all border border-[var(--border)]"
              >
                Ver Produtos
              </a>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
