// Contact form helper. Sends via EmailJS when configured; otherwise falls
// back to the user's mail client via a `mailto:` URL so the site always
// works out of the box.
//
// =============================================================
// EmailJS template variables expected (must match in your EmailJS template):
//   {{name}}      — sender's name
//   {{email}}     — sender's reply-to email
//   {{subject}}   — message subject
//   {{message}}   — message body
//   {{to_email}}  — destination address (taken from data.json -> contact.toEmail)
//
// Configure in src/data/data.json -> contact.emailjs:
//   { "serviceId": "...", "templateId": "...", "publicKey": "..." }
// Until those three are filled in, sendContact() opens the user's mail
// client with a pre-filled message and resolves successfully.
// =============================================================

import emailjs from "@emailjs/browser";
import data from "../data/data.json";

export type ContactFormValues = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export type SendResult =
  | { ok: true }
  | {
      ok: false;
      reason: "config" | "network" | "validation";
      message: string;
    };

// Shared regex — keep in sync with the form's onBlur validator.
export const EMAIL_REGEX = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export function validateContact(values: ContactFormValues):
  | { ok: true }
  | { ok: false; field: keyof ContactFormValues; message: string } {
  const name = values.name.trim();
  const email = values.email.trim();
  const subject = values.subject.trim();
  const message = values.message.trim();

  if (name.length < 2) {
    return { ok: false, field: "name", message: "Please enter your name (2+ characters)." };
  }
  if (!EMAIL_REGEX.test(email)) {
    return { ok: false, field: "email", message: "Please enter a valid email address." };
  }
  if (subject.length < 3) {
    return { ok: false, field: "subject", message: "Subject must be at least 3 characters." };
  }
  if (message.length < 10) {
    return { ok: false, field: "message", message: "Message must be at least 10 characters." };
  }
  return { ok: true };
}

function openMailtoFallback(values: ContactFormValues): void {
  if (typeof window === "undefined") return;
  const to = data.contact.toEmail;
  const subject = encodeURIComponent(values.subject);
  const body = encodeURIComponent(
    `${values.message}\n\n— ${values.name}\n${values.email}`
  );
  window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
}

export async function sendContact(
  values: ContactFormValues
): Promise<SendResult> {
  // Server-side-style validation first (mirrors the UI rules).
  const v = validateContact(values);
  if (!v.ok) {
    return { ok: false, reason: "validation", message: v.message };
  }

  const { serviceId, templateId, publicKey } = data.contact.emailjs;

  // Graceful fallback when EmailJS isn't configured yet.
  if (!serviceId || !templateId || !publicKey) {
    // eslint-disable-next-line no-console
    console.warn(
      "EmailJS not configured — opened mailto fallback. Set IDs in data.json → contact.emailjs to send directly."
    );
    openMailtoFallback(values);
    return { ok: true };
  }

  try {
    await emailjs.send(
      serviceId,
      templateId,
      {
        name: values.name.trim(),
        email: values.email.trim(),
        subject: values.subject.trim(),
        message: values.message.trim(),
        to_email: data.contact.toEmail,
      },
      { publicKey }
    );
    return { ok: true };
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("EmailJS send failed:", err);
    return {
      ok: false,
      reason: "network",
      message: "Could not send right now. Please try again or email directly.",
    };
  }
}
