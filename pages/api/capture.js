// Capture API - sends leads to Google Forms
// Form ID: 1FAIpQLSel9Wc9W5Rflgg4p7MPywWGbxKz46csoFGCY8gjbjxIz0LE-Q
// Fields:
//   - "Nome completo" -> entry.603056903
//   - "Seu melhor e-mail" -> entry.1899263815
//   - "WhatsApp com DDD" -> entry.544565653

const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSel9Wc9W5Rflgg4p7MPywWGbxKz46csoFGCY8gjbjxIz0LE-Q/formResponse';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const { name, email, whatsapp, message } = req.body || {};

  if (!name || !email || !whatsapp) {
    return res.status(400).json({ 
      error: 'Campos obrigatórios faltando: nome, email, whatsapp' 
    });
  }

  const cleanName = String(name).trim();
  const cleanEmail = String(email).trim();
  const cleanWhatsapp = String(whatsapp).replace(/\D/g, '');
  const cleanMessage = message ? String(message).trim() : '';

  try {
    const formData = new URLSearchParams();
    formData.append('entry.603056903', cleanName);
    formData.append('entry.1899263815', cleanEmail);
    formData.append('entry.544565653', cleanWhatsapp);
    if (cleanMessage) {
      formData.append('entry.688312707', cleanMessage);
    }

    const response = await fetch(GOOGLE_FORM_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formData.toString(),
    });

    console.log('[capture] Lead enviado:', { nome: cleanName, email: cleanEmail, whatsapp: cleanWhatsapp, mensagem: cleanMessage });

    return res.status(200).json({
      success: true,
      message: 'Obrigado! Entraremos em contato pelo WhatsApp.',
    });
  } catch (err) {
    console.error('[capture] Erro ao enviar:', err.message);
    return res.status(200).json({
      success: true,
      message: 'Obrigado! Entraremos em contato em breve.',
    });
  }
}