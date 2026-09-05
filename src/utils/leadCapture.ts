export type LeadSource = 'contact' | 'booking';

export type LeadPayload = {
  name: string;
  email: string;
  message?: string;
  source: LeadSource;
  bookingDate?: string;
  bookingTime?: string;
};

const getLeadText = (lead: LeadPayload) => {
  const title = lead.source === 'booking' ? '📅 New booking request' : '📩 New portfolio message';
  const lines = [
    title,
    `Name: ${lead.name}`,
    `Email: ${lead.email}`,
  ];

  if (lead.message) lines.push(`Message: ${lead.message}`);
  if (lead.bookingDate) lines.push(`Booking date: ${lead.bookingDate}`);
  if (lead.bookingTime) lines.push(`Booking time: ${lead.bookingTime}`);
  lines.push('Source: portfolio website');

  return lines.join('\n');
};

const maybeSendTelegram = async (lead: LeadPayload) => {
  const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
  const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) return false;

  const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text: getLeadText(lead),
      disable_web_page_preview: true,
    }),
  });

  if (!response.ok) {
    throw new Error('Telegram send failed');
  }

  return true;
};

const maybeSendWebhook = async (lead: LeadPayload) => {
  const webhookUrl = import.meta.env.VITE_GOOGLE_SHEET_WEBHOOK_URL || import.meta.env.VITE_CRM_WEBHOOK_URL;

  if (!webhookUrl) return false;

  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: lead.name,
      email: lead.email,
      message: lead.message || '',
      source: lead.source,
      bookingDate: lead.bookingDate || '',
      bookingTime: lead.bookingTime || '',
      timestamp: new Date().toISOString(),
    }),
  });

  if (!response.ok) {
    throw new Error('Webhook send failed');
  }

  return true;
};

const maybeSendEmailjs = async (lead: LeadPayload) => {
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

  if (!publicKey || !serviceId || !templateId) return false;

  const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      template_params: {
        name: lead.name,
        email: lead.email,
        message: lead.message || 'No message provided',
        source: lead.source,
        booking_date: lead.bookingDate || 'N/A',
        booking_time: lead.bookingTime || 'N/A',
      },
    }),
  });

  if (!response.ok) {
    throw new Error('EmailJS send failed');
  }

  return true;
};

const maybeSendFormspree = async (lead: LeadPayload) => {
  const endpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT;

  if (!endpoint) return false;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      name: lead.name,
      email: lead.email,
      message: lead.message || '',
      source: lead.source,
      bookingDate: lead.bookingDate || '',
      bookingTime: lead.bookingTime || '',
    }),
  });

  if (!response.ok) {
    throw new Error('Formspree send failed');
  }

  return true;
};

export const sendLead = async (lead: LeadPayload) => {
  const senders = [
    maybeSendTelegram,
    maybeSendWebhook,
    maybeSendEmailjs,
    maybeSendFormspree,
  ];

  const results = await Promise.allSettled(senders.map((sender) => sender(lead)));
  const success = results.some((result) => result.status === 'fulfilled' && result.value === true);

  if (!success) {
    const fallbackMailto = `mailto:salomh46@gmail.com?subject=${encodeURIComponent(
      lead.source === 'booking' ? 'New booking request' : 'New portfolio inquiry'
    )}&body=${encodeURIComponent(
      `Name: ${lead.name}\nEmail: ${lead.email}\n\nMessage:\n${lead.message || 'No message provided'}\n\nBooking Date: ${lead.bookingDate || 'N/A'}\nBooking Time: ${lead.bookingTime || 'N/A'}`
    )}`;
    window.location.href = fallbackMailto;
  }

  return success;
};
