"use client";

import { useTranslations } from "next-intl";
import { MessageCircle } from "lucide-react";
import { primaryOffice } from "@/content/company";

export interface WhatsAppCTAProps {
  variant?: "floating" | "inline";
  contextMessage?: string;
  articleTitle?: string;
  serviceName?: string;
  documentName?: string;
  modeName?: string;
  equipmentName?: string;
  className?: string;
}

export function WhatsAppCTA({
  variant = "inline",
  contextMessage,
  articleTitle,
  serviceName,
  documentName,
  modeName,
  equipmentName,
  className = "",
}: WhatsAppCTAProps) {
  const t = useTranslations("WhatsApp");

  let prefilledText = t("defaultMessage");
  if (contextMessage) {
    prefilledText = contextMessage;
  } else if (articleTitle) {
    prefilledText = t("articleMessage", { title: articleTitle });
  } else if (serviceName) {
    prefilledText = t("serviceMessage", { service: serviceName });
  } else if (documentName) {
    prefilledText = t("documentMessage", { document: documentName });
  } else if (modeName) {
    prefilledText = t("modeMessage", { mode: modeName });
  } else if (equipmentName) {
    prefilledText = t("equipmentMessage", { item: equipmentName });
  }

  const href = `${primaryOffice.whatsappHref}?text=${encodeURIComponent(prefilledText)}`;

  if (variant === "floating") {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t("chatButton")}
        className={`group fixed bottom-6 end-6 z-50 flex items-center gap-2.5 rounded-full bg-[#25D366] p-3.5 text-white shadow-lg transition-all duration-300 hover:bg-[#20bd5a] hover:shadow-xl hover:scale-105 active:scale-95 ${className}`}
      >
        <MessageCircle className="size-6 shrink-0 fill-current text-white" aria-hidden />
        <span className="max-w-0 overflow-hidden whitespace-nowrap text-caption font-semibold transition-all duration-300 group-hover:max-w-xs group-hover:pe-2">
          {t("chatButton")}
        </span>
      </a>
    );
  }

  return (
    <div
      className={`rounded-2xl border border-emerald-200/80 bg-gradient-to-br from-emerald-50/90 via-teal-50/50 to-white p-6 shadow-sm md:p-8 ${className}`}
    >
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[#25D366] text-white shadow-sm">
            <MessageCircle className="size-6 fill-current text-white" aria-hidden />
          </div>
          <div>
            <h3 className="text-h3 font-bold text-slate-900">{t("bannerTitle")}</h3>
            <p className="mt-1 text-body text-slate-600 max-w-xl">{t("bannerDesc")}</p>
          </div>
        </div>

        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-3 text-body font-bold text-white shadow-sm transition-all hover:bg-[#20bd5a] hover:shadow-md active:scale-[0.98]"
        >
          <MessageCircle className="size-5 fill-current text-white" aria-hidden />
          <span>{t("chatButton")}</span>
        </a>
      </div>
    </div>
  );
}
