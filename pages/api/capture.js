// Capture API - sends leads to Google Forms
// Form ID: 13llb0_a_v1rcN820NAs7ZFOfK8MiXj9gPc-vbk94eM8
// Fields:
//   - "Nome completo" -> entry.699971494
//   - "Seu melhor e-mail" -> entry.1350414018
//   - "WhatsApp com DDD" -> entry.1331367221

const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLScD9k-DPwKzHXYXYMLqCbZN_p9W-hj8idCn9ldaQhttkJrx-w/formResponse';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const { name, email, whatsapp } = req.body || {};

  if (!name || !email || !whatsapp) {
    return res.status(400).json({ 
      error: 'Campos obrigatórios faltando: nome, email, whatsapp' 
    });
  }

  const cleanName = String(name).trim();
  const cleanEmail = String(email).trim();
  const cleanWhatsapp = String(whatsapp).replace(/\D/g, '');

  try {
    const formData = new URLSearchParams();
    formData.append('entry.699971494', cleanName);
    formData.append('entry.1350414018', cleanEmail);
    formData.append('entry.1331367221', cleanWhatsapp);

    const response = await fetch(GOOGLE_FORM_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formData.toString(),
    });

    console.log('[capture] Lead enviado:', { nome: cleanName, email: cleanEmail, whatsapp: cleanWhatsapp });

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