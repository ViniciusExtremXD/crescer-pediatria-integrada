import React, { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, CaretDown, CheckCircle, WhatsappLogo } from "@phosphor-icons/react";
import { SPECIALTIES, buildWhatsAppUrl, pushEvent, trackLead } from "../data/site";
import { EASE_OUT } from "./motion";

const AGES = ["Gestante / bebê ainda não nasceu", "Recém-nascido (até 28 dias)", "Bebê (1 a 23 meses)", "Criança (2 a 11 anos)", "Adolescente (12 a 17 anos)"];
const TOPICS = [...SPECIALTIES.map((s) => s.title), "Exames (olhinho, linguinha, prick test…)", "Cursos para famílias", "Não sei, quero orientação"];

const inputCls =
  "mt-2 h-12 w-full rounded-2xl border border-pine-600/15 bg-cream-50 px-4 text-base text-pine-900 placeholder:text-pine-800/35 transition-colors focus:border-rose-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-rose-200/60";
const labelCls = "text-[12px] font-semibold uppercase tracking-[0.16em] text-pine-600";

/*
 * Formulário de agendamento. O site é estático: ao enviar, monta a mensagem e abre o
 * WhatsApp da clínica já preenchido. Dispara `form_submit` + `generate_lead` (method=form).
 * O nome e o telefone não vão para o dataLayer.
 */
export function ContactForm() {
  const [sent, setSent] = useState<string | null>(null);
  const [error, setError] = useState("");
  const started = useRef(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const data = new FormData(form);
    const phone = String(data.get("phone") ?? "");
    if (phone.replace(/\D/g, "").length < 10) {
      setError("Informe o WhatsApp com DDD, por exemplo (96) 98107-4126.");
      return;
    }
    setError("");
    const lines = [
      "Olá! Vim pelo site da Crescer e gostaria de agendar uma consulta.",
      `• Responsável: ${String(data.get("name")).trim()}`,
      `• WhatsApp: ${phone}`,
      `• Idade da criança: ${data.get("age")}`,
      data.get("topic") ? `• Assunto: ${data.get("topic")}` : "",
      String(data.get("message") ?? "").trim() ? `• Mensagem: ${String(data.get("message")).trim()}` : "",
    ].filter(Boolean);
    const url = buildWhatsAppUrl(lines.join("\n"));

    // Sem nome, telefone ou assunto no dataLayer: o assunto pode revelar informação de saúde.
    pushEvent("form_submit", { form_id: "agendamento" });
    trackLead("form", "formulario");
    setSent(url);
    const win = window.open(url, "_blank", "noopener,noreferrer");
    if (!win) window.location.href = url;
  }

  return (
    <AnimatePresence mode="wait">
      {sent ? (
        <motion.div
          key="ok"
          className="msg-sucesso flex flex-col items-start rounded-[2rem] bg-white p-8 sm:p-10"
          role="status"
          initial={{ y: 16, scale: 0.98 }}
          animate={{ y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: EASE_OUT }}
        >
          <CheckCircle weight="fill" className="h-12 w-12 text-pine-500" />
          <p className="font-display mt-5 text-3xl font-medium text-pine-700">Abrimos o WhatsApp para você</p>
          <p className="mt-2 text-pine-800/70">Sua mensagem já está escrita. É só tocar em enviar e a equipe da Crescer responde com os próximos horários.</p>
          <a href={sent} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex h-12 items-center gap-2 rounded-full bg-pine-600 px-6 font-semibold text-white">
            <WhatsappLogo weight="fill" className="h-5 w-5" /> Abrir o WhatsApp de novo
          </a>
          <button type="button" onClick={() => setSent(null)} className="mt-4 text-sm font-semibold text-pine-700 underline decoration-pine-600/30 underline-offset-4">
            Preencher outro pedido
          </button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          onSubmit={onSubmit}
          noValidate
          className="rounded-[2rem] bg-white p-6 shadow-float sm:p-9"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4, ease: EASE_OUT }}
          onFocus={() => {
            if (started.current) return;
            started.current = true;
            pushEvent("form_start", { form_id: "agendamento" });
          }}
        >
          <p className="font-display text-2xl font-medium text-pine-700">Agende sua consulta</p>
          <p className="mt-1 text-sm text-pine-800/60">Leva menos de um minuto. Respondemos pelo WhatsApp.</p>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className={labelCls}>Seu nome</span>
              <input name="name" type="text" required autoComplete="name" placeholder="Nome do responsável" className={inputCls} />
            </label>
            <label className="block">
              <span className={labelCls}>WhatsApp</span>
              <input name="phone" type="tel" required inputMode="tel" autoComplete="tel" placeholder="(96) 90000-0000" className={inputCls} />
            </label>
            <label className="block">
              <span className={labelCls}>Idade da criança</span>
              <span className="relative block">
                <select name="age" required defaultValue="" className={`${inputCls} appearance-none pr-11`}>
                  <option value="" disabled>
                    Selecione
                  </option>
                  {AGES.map((a) => (
                    <option key={a}>{a}</option>
                  ))}
                </select>
                <CaretDown weight="bold" className="pointer-events-none absolute bottom-[15px] right-4 h-4 w-4 text-pine-500" />
              </span>
            </label>
            <label className="block">
              <span className={labelCls}>Especialidade ou assunto</span>
              <span className="relative block">
                <select name="topic" defaultValue="" className={`${inputCls} appearance-none pr-11`}>
                  <option value="">Opcional</option>
                  {TOPICS.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
                <CaretDown weight="bold" className="pointer-events-none absolute bottom-[15px] right-4 h-4 w-4 text-pine-500" />
              </span>
            </label>
          </div>

          <label className="mt-5 block">
            <span className={labelCls}>Mensagem (opcional)</span>
            <textarea name="message" rows={3} placeholder="Conte brevemente o que você precisa" className={`${inputCls} h-auto resize-y py-3`} />
          </label>

          <AnimatePresence>
            {error && (
              <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-4 rounded-xl bg-rose-100 px-4 py-3 text-sm font-medium text-rose-700" role="alert">
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          <p className="mt-5 text-xs leading-relaxed text-pine-800/55">
            Ao enviar, abrimos o WhatsApp com a sua mensagem. Este site não armazena seus dados. Evite enviar informações de saúde detalhadas por aqui.
          </p>

          <button type="submit" className="group mt-6 flex h-14 w-full items-center justify-center gap-3 rounded-full bg-pine-600 text-base font-semibold text-white transition-[transform,background-color] hover:scale-[1.015] hover:bg-pine-800">
            <WhatsappLogo weight="fill" className="h-5 w-5" />
            Enviar pelo WhatsApp
            <ArrowUpRight weight="bold" className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
