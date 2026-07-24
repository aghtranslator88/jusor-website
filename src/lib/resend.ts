import { Resend } from "resend";

// Lazily constructed so builds/tests without RESEND_API_KEY set don't crash
// at import time — the key is only required when a form is actually submitted.
let client: Resend | null = null;

export function getResendClient(): Resend {
  if (!client) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error("RESEND_API_KEY is not set");
    }
    client = new Resend(apiKey);
  }
  return client;
}

// Default sender uses Resend's shared test domain, which works out of the
// box with no DNS setup but can only deliver to the email address the
// Resend account was created with. Once jusortrans.com is verified in the
// Resend dashboard, set EMAIL_FROM="JUSOR <no-reply@jusortrans.com>" in the
// environment (see .env.example) to send to any recipient.
export const RESEND_FROM_EMAIL =
  process.env.EMAIL_FROM ?? "JUSOR Website <onboarding@resend.dev>";
