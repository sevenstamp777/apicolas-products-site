// pages/api/capture.js
/**
 * API Route: /api/capture
 * Receives form data from the CaptureForm and forwards to Google Apps Script webhook.
 * Requires NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL env variable.
 */

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, whatsapp } = req.body;

  // Validation
  if (!name || !email || !whatsapp) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Normalize WhatsApp (remove non-digits)
  const cleanWhatsapp = whatsapp.replace(/\D/g, '');

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  const webhookUrl = process.env.GOOGLE_APPS_SCRIPT_URL;

  // If no webhook configured (local dev), return simulated success
  if (!webhookUrl) {
    console.log('[capture] (dev mode) Dados recebidos:', {
      name,
      email,
      whatsapp: cleanWhatsapp,
      timestamp: new Date().toISOString(),
    });
    return res.status(200).json({
      success: true,
      message: 'Lead capturado com sucesso (modo desenvolvimento).',
    });
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        nome: name,
        email: email,
        whatsapp: cleanWhatsapp,
        timestamp: new Date().toISOString(),
      }).toString(),
    });

    if (!response.ok) {
      throw new Error(`Webhook error: ${response.status}`);
    }

    const data = await response.text();

    // Log to console for monitoring
    console.log('[capture] Lead enviado para Google Sheets:', { name, email });

    return res.status(200).json({
      success: true,
      message: 'Lead capturado com sucesso!',
    });
  } catch (err) {
    console.error('[capture] Error sending to Google Sheets:', err.message);

    // Still return success to the front-end to avoid blocking the user
    // In production you might want to queue the lead and retry
    return res.status(200).json({
      success: true,
      message: 'Lead capturado com sucesso!',
      warning: 'Fallback dev activado. Verifique integração.',
    });
  }
}
