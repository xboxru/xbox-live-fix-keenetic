import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, Gamepad2, Globe, Minus, Plus, Send } from "lucide-react";
import { Reveal, SectionHeading } from "./kit";
import { cn } from "../utils/cn";

const FAQ = [
  {
    q: "«no such command» на шаге 3 — я всё сломал?",
    a: "Нет, всё в порядке. Так роутер отвечает, если статических записей хостов раньше не было. Красное окно с этой ошибкой — нормальная ситуация, просто переходите к команде из шага 4.",
  },
  {
    q: "Не открывается 192.168.1.1",
    a: "Попробуйте https://my.keenetic.net. Если Keenetic подключён вторым роутером после провайдерского — адрес может быть 192.168.2.1. А если вы когда-то меняли адрес панели вручную, используйте свой.",
  },
  {
    q: "Нужно ли перезагружать роутер?",
    a: "Нет. Команда system configuration save уже сохранила настройку. Перезагрузить нужно только консоль Xbox — и убедиться, что DNS на ней стоит «автоматически».",
  },
  {
    q: "Команду можно набрать вручную?",
    a: "Технически да, но лучше не стоит: одна опечатка в домене или адресе — и запись не сработает. Копируйте команды кнопками на этой странице и вставляйте в поле команды.",
  },
];

function FaqItem({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border transition-colors duration-300",
        open ? "border-xbox/40 bg-panel-2" : "border-line bg-panel hover:border-line-2"
      )}
    >
      <button
        onClick={onToggle}
        className="flex w-full cursor-pointer items-center gap-4 px-5 py-4.5 text-left"
      >
        <span className="flex-1 text-sm font-bold text-mint">{q}</span>
        <span
          className={cn(
            "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ring-1 transition-colors",
            open ? "bg-xbox text-void ring-xbox" : "bg-panel-2 text-fog ring-line-2"
          )}
        >
          {open ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="px-5 pb-5 text-[13px] leading-relaxed text-fog">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Footer() {
  const [openIdx, setOpenIdx] = useState<number>(0);

  return (
    <>
      <section id="faq" className="relative scroll-mt-20">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-line-2 to-transparent" />
        <div className="mx-auto max-w-3xl px-5 py-24 sm:px-8 lg:py-28">
          <SectionHeading
            kicker="[ faq ]"
            title={
              <>
                Если что-то
                <br />
                <span className="text-xbox">пошло не так</span>
              </>
            }
          />
          <div className="mt-12 space-y-3">
            {FAQ.map((f, i) => (
              <Reveal key={f.q} delay={i * 0.07}>
                <FaqItem
                  q={f.q}
                  a={f.a}
                  open={openIdx === i}
                  onToggle={() => setOpenIdx(openIdx === i ? -1 : i)}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-line bg-panel/60">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-xbox/15 text-xbox ring-1 ring-xbox/40">
                <Gamepad2 className="h-5 w-5" />
              </span>
              <div className="leading-tight">
                <p className="font-display text-[13px] font-semibold uppercase text-white">
                  Xbox Live Fix
                </p>
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-ash">
                  keenetic edition
                </p>
              </div>
            </div>

            <div className="flex flex-col items-start gap-4 lg:items-end">
              <div className="flex flex-wrap gap-2.5">
                <a
                  href="https://t.me/spelonline"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-line-2 bg-panel px-4 py-2.5 font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-fog transition-all duration-300 hover:border-xbox/50 hover:text-xbox"
                >
                  <Send className="h-3.5 w-3.5" />
                  t.me/spelonline
                </a>
                <a
                  href="https://xpbox.ru"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-line-2 bg-panel px-4 py-2.5 font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-fog transition-all duration-300 hover:border-xbox/50 hover:text-xbox"
                >
                  <Globe className="h-3.5 w-3.5" />
                  xpbox.ru
                </a>
                <a
                  href="https://xboxru.github.io/xbox-live-fix/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-line-2 bg-panel px-4 py-2.5 font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-fog transition-all duration-300 hover:border-xbox/50 hover:text-xbox"
                >
                  <BookOpen className="h-3.5 w-3.5" />
                  xbox live fix
                </a>
                <a
                  href="#dns"
                  className="inline-flex items-center gap-2 rounded-lg border border-xbox/40 bg-xbox/10 px-4 py-2.5 font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-xbox transition-all duration-300 hover:bg-xbox hover:text-void"
                >
                  настройка dns
                </a>
              </div>
              <div className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-[10px] text-ash">
                <span>no ip host</span>
                <span className="text-xbox/60">·</span>
                <span>ip host xsts.auth.xboxlive.com 164.90.228.248</span>
                <span className="text-xbox/60">·</span>
                <span>system configuration save</span>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-line/70 pt-6">
            <p className="font-mono text-[10px] leading-relaxed tracking-wide text-ash">
              Неофициальная инструкция для владельцев консолей Xbox и роутеров Keenetic.
              Проект не аффилирован с Microsoft и Keenetic. Все команды выполняются на
              вашем собственном оборудовании.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
