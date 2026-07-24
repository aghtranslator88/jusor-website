"use server";

import { z } from "zod";
import { getResendClient, RESEND_FROM_EMAIL } from "@/lib/resend";
import { primaryOffice } from "@/content/company";

export type InquiryResult = { ok: true } | { ok: false; error: string };

// Honeypot: a hidden field real users never fill in. Any non-empty value
// means a bot filled every input on the form — we pretend success and skip
// sending, rather than telling the bot its submission was rejected.
const honeypotSchema = z.string().optional();

function isHoneypotTripped(value: FormDataEntryValue | null): boolean {
  return typeof value === "string" && value.trim().length > 0;
}

async function sendInquiryEmail(params: {
  subject: string;
  replyTo: string;
  rows: { label: string; value: string }[];
}): Promise<InquiryResult> {
  const html = `
    <div style="font-family: sans-serif; font-size: 14px; color: #1e293b;">
      <h2 style="margin: 0 0 16px;">${params.subject}</h2>
      <table style="border-collapse: collapse; width: 100%;">
        ${params.rows
          .map(
            (row) => `
          <tr>
            <td style="padding: 6px 12px 6px 0; font-weight: 600; vertical-align: top; white-space: nowrap;">${row.label}</td>
            <td style="padding: 6px 0;">${row.value.replace(/\n/g, "<br/>")}</td>
          </tr>`
          )
          .join("")}
      </table>
    </div>
  `.trim();

  try {
    const resend = getResendClient();
    const { error } = await resend.emails.send({
      from: RESEND_FROM_EMAIL,
      to: primaryOffice.email,
      replyTo: params.replyTo,
      subject: params.subject,
      html,
    });
    if (error) {
      return { ok: false, error: error.message };
    }
    return { ok: true };
  } catch {
    return { ok: false, error: "RESEND_API_KEY is not configured" };
  }
}

const contactSchema = z.object({
  name: z.string().trim().min(1).max(200),
  email: z.string().trim().email(),
  subject: z.string().trim().min(1).max(50),
  message: z.string().trim().min(1).max(5000),
});

export async function submitContactInquiry(formData: FormData): Promise<InquiryResult> {
  if (isHoneypotTripped(formData.get("company"))) return { ok: true };

  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
  });
  if (!parsed.success) return { ok: false, error: "Invalid form data" };
  const d = parsed.data;

  return sendInquiryEmail({
    subject: `New contact form inquiry from ${d.name}`,
    replyTo: d.email,
    rows: [
      { label: "Name", value: d.name },
      { label: "Email", value: d.email },
      { label: "Subject", value: d.subject },
      { label: "Message", value: d.message },
    ],
  });
}

const quoteSchema = z.object({
  name: z.string().trim().min(1).max(200),
  email: z.string().trim().email(),
  wordCount: z.string().trim().max(20).optional(),
  documentType: z.string().trim().min(1).max(200),
  languagePair: z.string().trim().min(1).max(200),
  tier: z.string().trim().min(1).max(50),
  turnaround: z.string().trim().min(1).max(50),
  estimatedTotal: z.string().trim().max(50).optional(),
});

export async function submitQuoteRequest(formData: FormData): Promise<InquiryResult> {
  if (isHoneypotTripped(formData.get("company"))) return { ok: true };

  const parsed = quoteSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    wordCount: formData.get("wordCount") ?? undefined,
    documentType: formData.get("documentType"),
    languagePair: formData.get("languagePair"),
    tier: formData.get("tier"),
    turnaround: formData.get("turnaround"),
    estimatedTotal: formData.get("estimatedTotal") ?? undefined,
  });
  if (!parsed.success) return { ok: false, error: "Invalid form data" };
  const d = parsed.data;

  return sendInquiryEmail({
    subject: `New quote request from ${d.name}`,
    replyTo: d.email,
    rows: [
      { label: "Name", value: d.name },
      { label: "Email", value: d.email },
      { label: "Document type", value: d.documentType },
      { label: "Language pair", value: d.languagePair },
      { label: "Service tier", value: d.tier },
      { label: "Turnaround", value: d.turnaround },
      ...(d.wordCount ? [{ label: "Approx. word count", value: d.wordCount }] : []),
      ...(d.estimatedTotal ? [{ label: "Estimated total", value: d.estimatedTotal }] : []),
    ],
  });
}

const interpretationSchema = z.object({
  name: z.string().trim().min(1).max(200),
  email: z.string().trim().email(),
  mode: z.string().trim().min(1).max(200),
  eventDate: z.string().trim().min(1).max(50),
  duration: z.string().trim().min(1).max(20),
  languagePairs: z.string().trim().min(1).max(300),
  venue: z.string().trim().min(1).max(50),
  city: z.string().trim().max(100).optional(),
  attendees: z.string().trim().max(20).optional(),
  notes: z.string().trim().max(3000).optional(),
});

export async function submitInterpretationRequest(formData: FormData): Promise<InquiryResult> {
  if (isHoneypotTripped(formData.get("company"))) return { ok: true };

  const parsed = interpretationSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    mode: formData.get("mode"),
    eventDate: formData.get("eventDate"),
    duration: formData.get("duration"),
    languagePairs: formData.get("languagePairs"),
    venue: formData.get("venue"),
    city: formData.get("city") ?? undefined,
    attendees: formData.get("attendees") ?? undefined,
    notes: formData.get("notes") ?? undefined,
  });
  if (!parsed.success) return { ok: false, error: "Invalid form data" };
  const d = parsed.data;

  return sendInquiryEmail({
    subject: `New interpretation request from ${d.name}`,
    replyTo: d.email,
    rows: [
      { label: "Name", value: d.name },
      { label: "Email", value: d.email },
      { label: "Mode", value: d.mode },
      { label: "Event date", value: d.eventDate },
      { label: "Duration (hours)", value: d.duration },
      { label: "Language pairs", value: d.languagePairs },
      { label: "Venue", value: d.venue },
      ...(d.city ? [{ label: "City", value: d.city }] : []),
      ...(d.attendees ? [{ label: "Attendees", value: d.attendees }] : []),
      ...(d.notes ? [{ label: "Notes", value: d.notes }] : []),
    ],
  });
}

const equipmentSchema = z.object({
  name: z.string().trim().min(1).max(200),
  email: z.string().trim().email(),
  item: z.string().trim().min(1).max(200),
  quantity: z.string().trim().min(1).max(10),
  city: z.string().trim().max(100).optional(),
  startDate: z.string().trim().min(1).max(50),
  endDate: z.string().trim().min(1).max(50),
});

export async function submitEquipmentBooking(formData: FormData): Promise<InquiryResult> {
  if (isHoneypotTripped(formData.get("company"))) return { ok: true };

  const parsed = equipmentSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    item: formData.get("item"),
    quantity: formData.get("quantity"),
    city: formData.get("city") ?? undefined,
    startDate: formData.get("startDate"),
    endDate: formData.get("endDate"),
  });
  if (!parsed.success) return { ok: false, error: "Invalid form data" };
  const d = parsed.data;

  return sendInquiryEmail({
    subject: `New equipment booking request from ${d.name}`,
    replyTo: d.email,
    rows: [
      { label: "Name", value: d.name },
      { label: "Email", value: d.email },
      { label: "Item", value: d.item },
      { label: "Quantity", value: d.quantity },
      ...(d.city ? [{ label: "Delivery city", value: d.city }] : []),
      { label: "Start date", value: d.startDate },
      { label: "End date", value: d.endDate },
    ],
  });
}
