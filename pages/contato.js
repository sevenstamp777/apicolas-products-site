import { useState } from 'react';
import Layout from '../components/layout';

export default function ContatoPage() {
  const [formData, setFormData] = useState({ nome: '', email: '', whatsapp: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.nome,
          email: formData.email,
          whatsapp: formData.whatsapp,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
        setFormData({ nome: '', email: '', whatsapp: '' });
      } else {
        setError(data.error || 'Erro ao enviar. Tente novamente.');
      }
    } catch (err) {
      setError('Erro de conexão. Tente novamente.');
    }

    setLoading(false);
  };

  return (
    <Layout>
      <main className="min-h-screen bg-[var(--bg)]">
        {/* Hero Section */}
        <section className="py-20 border-b border-[var(--border)]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <span className="inline-block px-3 py-1 rounded-full bg-[var(--accent)]/10 text-[var(--accent-light)] text-xs font-medium border border-[var(--accent)]/20 mb-6">
              💬 Fale Conosco
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-[var(--fg)] mb-6">
              Estamos aqui para ajudar
            </h1>
            <p className="text-[var(--muted)] text-lg max-w-2xl mx-auto">
              Tem dúvidas sobre nossos produtos, pedidos ou parcerias? 
              Entre em contato e nossa equipe retornará o mais breve possível.
            </p>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {[
                {
                  icon: '📱',
                  title: 'WhatsApp',
                  desc: 'Atendimento rápido e direto',
                  value: '(11) 99999-9999',
                  action: 'https://wa.me/5518997130824',
                },
                {
                  icon: '📧',
                  title: 'E-mail',
                  desc: 'Respostas em até 24h',
                  value: 'melpropolis.cia@gmail.com',
                  action: 'mailto:melpropolis.cia@gmail.com',
                },
                {
                  icon: '📍',
                  title: 'Localização',
                  desc: 'São Paulo, SP - Brasil',
                  value: 'Atendemos todo o Brasil',
                  action: '#',
                },
              ].map((method, idx) => (
                <div
                  key={idx}
                  className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 text-center"
                >
                  <div className="text-3xl mb-4">{method.icon}</div>
                  <h3 className="font-display font-semibold text-lg text-[var(--fg)] mb-2">
                    {method.title}
                  </h3>
                  <p className="text-[var(--muted)] text-sm mb-3">
                    {method.desc}
                  </p>
                  <a
                    href={method.action}
                    className={method.action === '#' 
                      ? 'text-[var(--muted)] text-sm'
                      : 'text-[var(--accent-light)] hover:text-[var(--accent)] text-sm font-medium transition-colors'
                    }
                    target={method.action.startsWith('http') ? '_blank' : '_self'}
                    rel={method.action.startsWith('http') ? 'noopener noreferrer' : ''}
                  >
                    {method.value}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-20 border-t border-[var(--border)] bg-[var(--bg-subtle)]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl font-bold text-[var(--fg)] mb-4">
                Envie uma mensagem
              </h2>
              <p className="text-[var(--muted)]">
                Preencha o formulário abaixo e entraremos em contato em breve
              </p>
            </div>

            <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-8">
              {success ? (
                <div className="text-center py-8">
                  <div className="text-5xl mb-4">✅</div>
                  <h3 className="font-display text-2xl font-bold text-[var(--accent-light)] mb-2">
                    Mensagem enviada!
                  </h3>
                  <p className="text-[var(--muted)] mb-6">
                    Obrigado! Entraremos em contato pelo WhatsApp em breve.
                  </p>
                  <button
                    onClick={() => setSuccess(false)}
                    className="px-6 py-3 bg-[var(--accent)]/10 text-[var(--accent-light)] rounded-xl font-medium hover:bg-[var(--accent)]/20 transition-colors"
                  >
                    Enviar outra mensagem
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                      {error}
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="nome" className="block text-sm font-medium text-[var(--fg)] mb-2">
                        Nome completo *
                      </label>
                      <input
                        id="nome"
                        type="text"
                        value={formData.nome}
                        onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                        placeholder="Seu nome completo"
                        required
                        className="w-full px-4 py-3 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border)] focus:outline-none focus:border-[var(--accent)] transition-colors placeholder:text-[var(--muted)]"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-[var(--fg)] mb-2">
                        E-mail *
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="seu@email.com"
                        required
                        className="w-full px-4 py-3 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border)] focus:outline-none focus:border-[var(--accent)] transition-colors placeholder:text-[var(--muted)]"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="whatsapp" className="block text-sm font-medium text-[var(--fg)] mb-2">
                      WhatsApp com DDD *
                    </label>
                    <input
                      id="whatsapp"
                      type="tel"
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                      placeholder="(11) 99999-9999"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border)] focus:outline-none focus:border-[var(--accent)] transition-colors placeholder:text-[var(--muted)]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full px-8 py-4 bg-[var(--honey)] hover:bg-[var(--amber)] text-white font-semibold rounded-xl text-lg transition-all hover:shadow-lg hover:shadow-[var(--honey)]/30 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Enviando...' : 'Enviar Mensagem'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* FAQ Quick Links */}
        <section className="py-20 border-t border-[var(--border)]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="font-display text-3xl font-bold text-[var(--fg)] mb-6">
              Perguntas Frequentes
            </h2>
            <div className="space-y-4">
              {[
                {
                  q: 'Qual a diferença entre própolis e mel?',
                  a: 'Própolis é uma resina coletada pelas abelhas para proteger a colmeia. O mel é um alimento produzido a partir do néctar das flores.',
                },
                {
                  q: 'Os produtos são 100% naturais?',
                  a: 'Sim, todos os nossos produtos são 100% naturais, sem aditivos químicos ou conservantes.',
                },
                {
                  q: 'Vocês entregam em todo o Brasil?',
                  a: 'Sim, atendemos todo o território nacional com envios seguros e rastreados.',
                },
              ].map((faq, idx) => (
                <div
                  key={idx}
                  className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6 text-left"
                >
                  <h3 className="font-semibold text-[var(--fg)] mb-2">{faq.q}</h3>
                  <p className="text-[var(--muted)] text-sm">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}