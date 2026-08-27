import { useState } from 'react';

export default function CaptureForm() {
  const [formData, setFormData] = useState({ name: '', email: '', whatsapp: '' });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (status.type) setStatus({ type: '', message: '' });
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateWhatsApp = (whatsapp) => {
    return /^\d{10,11}$/.test(whatsapp.replace(/\D/g, ''));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      setStatus({ type: 'error', message: 'Por favor, digite seu nome' });
      return;
    }
    
    if (!validateEmail(formData.email)) {
      setStatus({ type: 'error', message: 'Por favor, digite um e-mail válido' });
      return;
    }
    
    if (!formData.whatsapp?.trim()) {
      setStatus({ type: 'error', message: 'Por favor, informe seu WhatsApp' });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Falha ao enviar');
      }

      setStatus({ type: 'success', message: 'Obrigado! Entraremos em contato pelo WhatsApp.' });
      setFormData({ name: '', email: '', whatsapp: '' });
    } catch (err) {
      setStatus({ type: 'error', message: 'Erro ao enviar. Tente novamente.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {/* Name Field */}
      <div>
        <label htmlFor="nome" className="block text-sm font-medium text-[var(--fg)] mb-2">
          Nome completo
        </label>
        <input
          id="nome"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Seu nome completo"
          required
          disabled={isSubmitting}
          className="w-full px-4 py-3 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border)] focus:outline-none focus:border-[var(--accent)] transition-colors placeholder-text-[var(--muted)] disabled:opacity-50"
        />
      </div>

      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-[var(--fg)] mb-2">
          E-mail
        </label>
        <input
          id="email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="seu@email.com"
          required
          disabled={isSubmitting}
          className="w-full px-4 py-3 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border)] focus:outline-none focus:border-[var(--accent)] transition-colors placeholder-text-[var(--muted)] disabled:opacity-50"
        />
      </div>

      {/* WhatsApp Field */}
      <div>
        <label htmlFor="whatsapp" className="block text-sm font-medium text-[var(--fg)] mb-2">
          WhatsApp (DDD + número)
        </label>
        <input
          id="whatsapp"
          type="tel"
          name="whatsapp"
          value={formData.whatsapp}
          onChange={handleChange}
          placeholder="11999999999"
          required
          disabled={isSubmitting}
          className="w-full px-4 py-3 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border)] focus:outline-none focus:border-[var(--accent)] transition-colors disabled:opacity-50"
        />
      </div>

      {/* Status Messages */}
      {status.type === 'error' && (
        <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-4 text-sm">
          <span className="text-red-400 font-medium">{status.message}</span>
        </div>
      )}
      {status.type === 'success' && (
        <div className="bg-[var(--accent)]/10 border border-[var(--accent)]/30 rounded-xl p-4 text-sm">
          <span className="text-[var(--accent)] font-medium">{status.message}</span>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-8 py-4 bg-[var(--honey)] hover:bg-[var(--amber)] disabled:bg-[var(--honey)]/50 disabled:cursor-not-allowed text-[var(--bg)] font-semibold rounded-xl text-lg transition-all hover:shadow-lg hover:shadow-[var(--honey)]/30"
      >
        {isSubmitting ? 'Enviando...' : 'Receber Recomendação'}
      </button>
    </form>
  );
}