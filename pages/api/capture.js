// Capture API - sends leads to Google Forms
// Form ID: 1FAIpQLScD9k-DPwKzHXYXYMLqCbZN_p9W-hj8idCn9ldaQhttkJrx-w
// Fields from FB_PUBLIC_LOAD_DATA_:
//   - "Nome completo" (field 1965630165) -> entry.699971494
//   - "WhatsApp com DDD" (field 957987546) -> entry.1331367221
//
// NOTE: The Google Form has email field configured to use logged-in user's email.
// We combine name+email into the "Nome completo" field and send WhatsApp separately.

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

  // Combine name + email into the "Nome completo" field
  // Format: "Name | email" so the lead info is all in one cell
  const nomeField = `${cleanName} | ${cleanEmail}`;

  try {
    const formData = new URLSearchParams();
    formData.append('entry.699971494', nomeField);
    formData.append('entry.1331367221', cleanWhatsapp);

    const response = await fetch(GOOGLE_FORM_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formData.toString(),
    });

    console.log('[capture] Lead enviado:', { nome: nomeField, whatsapp: cleanWhatsapp });

    return res.status(200).json({
      success: true,
      message: 'Obrigado! Entraremos em contato pelo WhatsApp.',
    });
  } catch (err) {
    console.error('[capture] Erro ao enviar:', err.message);
    // Still return success to the user
    return res.status(200).json({
      success: true,
      message: 'Obrigado! Entraremos em contato em breve.',
    });
  }
}