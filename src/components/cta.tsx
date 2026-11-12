import React from "react";
import { ArrowUpRight, Phone, WhatsappLogo } from "@phosphor-icons/react";
import { COMPANY, buildWhatsAppUrl, trackLead } from "../data/site";
import { Magnetic } from "./motion";

/*
 * Todo CTA de contato é um <a href="https://wa.me/..."> ou <a href="tel:..."> de verdade,
 * para que gatilhos de clique em link do GTM funcionem. Cada clique também envia
 * `lead_click` + `generate_lead` ao dataLayer (ver TRACKING.md).
 */

type AnchorProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">;
type TrackProps = { location: string; detail?: string };

export function WhatsAppLink({ message, location, detail, children, onClick, ...rest }: AnchorProps & TrackProps & { message?: string }) {
  return (
    <a
      href={buildWhatsAppUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      data-lead-channel="whatsapp"
      data-lead-location={location}
      onClick={(e) => {
        // Recalcula na hora do clique para incluir a origem do anúncio (utm) que só existe no navegador.
        e.currentTarget.href = buildWhatsAppUrl(message);
        trackLead("whatsapp", location, detail);
        onClick?.(e);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}

export function PhoneLink({ location, detail, children, onClick, ...rest }: AnchorProps & TrackProps) {
  return (
    <a
      href={COMPANY.phoneTel}
      data-lead-channel="phone"
      data-lead-location={location}
      onClick={(e) => {
        trackLead("phone", location, detail);
        onClick?.(e);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}

/* Pílula principal: preenchimento que varre da esquerda e seta que troca de lugar. */
export function PrimaryCta({
  message,
  location,
  detail,
  children,
  size = "lg",
  tone = "pine",
  className,
}: TrackProps & {
  message?: string;
  children: React.ReactNode;
  size?: "md" | "lg";
  tone?: "pine" | "rose" | "cream";
  className?: string;
}) {
  const pad = size === "lg" ? "h-14 pl-6 pr-2 text-[15px]" : "h-12 pl-5 pr-1.5 text-sm";
  const dot = size === "lg" ? "h-10 w-10" : "h-9 w-9";
  const colors = {
    pine: { base: "bg-pine-600 text-white shadow-pine", sweep: "bg-pine-800", dot: "bg-cream-50 text-pine-700" },
    rose: { base: "bg-rose-500 text-white shadow-rose", sweep: "bg-rose-600", dot: "bg-white text-rose-600" },
    cream: { base: "bg-cream-50 text-pine-800 shadow-float", sweep: "bg-white", dot: "bg-pine-600 text-white" },
  }[tone];
  return (
    <Magnetic strength={0.22}>
      <WhatsAppLink
        message={message}
        location={location}
        detail={detail}
        className={`group relative inline-flex items-center gap-4 overflow-hidden whitespace-nowrap rounded-full font-semibold ${colors.base} ${pad} ${className ?? ""}`}
      >
        <span className={`absolute inset-0 origin-left scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100 ${colors.sweep}`} />
        <WhatsappLogo weight="fill" className="relative h-5 w-5 shrink-0" />
        <span className="relative">{children}</span>
        <span className={`relative grid place-items-center overflow-hidden rounded-full ${colors.dot} ${dot}`}>
          <ArrowUpRight weight="bold" className="h-4 w-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-6 group-hover:translate-x-6" />
          <ArrowUpRight weight="bold" className="absolute h-4 w-4 -translate-x-6 translate-y-6 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0 group-hover:translate-y-0" />
        </span>
      </WhatsAppLink>
    </Magnetic>
  );
}

export function PhoneCta({ location, tone = "light", className }: { location: string; tone?: "dark" | "light"; className?: string }) {
  const colors =
    tone === "dark"
      ? "border-white/20 text-cream-50 hover:border-white/50 hover:bg-white/5"
      : "border-pine-600/20 text-pine-800 hover:border-pine-600/50 hover:bg-pine-600/5";
  return (
    <Magnetic strength={0.18}>
      <PhoneLink location={location} className={`group inline-flex h-14 items-center gap-3 rounded-full border px-6 text-[15px] font-semibold transition-colors ${colors} ${className ?? ""}`}>
        <Phone weight="fill" className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
        {COMPANY.phoneDisplay}
      </PhoneLink>
    </Magnetic>
  );
}
