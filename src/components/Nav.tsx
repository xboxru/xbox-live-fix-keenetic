import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import {
  ArrowUpRight,
  BookOpen,
  Globe,
  Menu,
  Send,
  Server,
  Terminal,
  X,
} from "lucide-react";
import logo from "../../public/images/logo.jpg";

const LINKS = [
  { href: "#steps", label: "Шаги" },
  { href: "#dns", label: "DNS" },
  { href: "#simulator", label: "Тренажёр" },
  { href: "#finish", label: "Финал" },
  { href: "#faq", label: "FAQ" },
];

const SOCIALS = [
  { href: "https://t.me/spelonline", label: "Telegram", icon: Send },
  { href: "https://xpbox.ru", label: "xpbox.ru", icon: Globe },
  { href: "https://xboxru.github.io/xbox-live-fix/", label: "Live Fix", icon: BookOpen },
];

export function Nav() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.4 });
  const [open, setOpen] = useState(false);

  // lock body scroll while the drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="border-b border-line/60 bg-void/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:px-8">
          <a href="#top" className="group flex min-w-0 items-center gap-3">
            <img
              src={logo}
              alt="Логотип"
              className="h-9 w-9 shrink-0 rounded-full object-cover shadow-[0_0_16px_rgba(155,240,11,0.3)] ring-2 ring-xbox/60 transition-all duration-300 group-hover:shadow-[0_0_26px_rgba(155,240,11,0.55)] group-hover:ring-xbox"
            />
            <span className="hidden min-w-0 flex-col leading-none sm:flex">
              <span className="font-display truncate text-[13px] font-semibold uppercase tracking-wide text-white">
                Xbox&nbsp;Live&nbsp;Fix
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ash">
                keenetic&nbsp;edition
              </span>
            </span>
          </a>

          <div className="ml-auto flex items-center gap-1.5 md:gap-2">
            {/* desktop nav */}
            <nav className="hidden items-center gap-0.5 md:flex">
              {LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="rounded-lg px-3 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.15em] text-fog transition-colors duration-300 hover:bg-xbox/10 hover:text-xbox xl:px-4"
                >
                  {l.label}
                </a>
              ))}
            </nav>

            <a
              href="#dns"
              className="hidden items-center gap-2 rounded-lg border border-xbox/40 bg-xbox/10 px-3.5 py-2.5 font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-xbox transition-all duration-300 hover:bg-xbox hover:text-void lg:inline-flex"
            >
              <Server className="h-3.5 w-3.5" />
              Настройка DNS
            </a>

            {/* desktop socials */}
            {SOCIALS.map((s) => (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden items-center gap-2 rounded-lg border border-line-2 bg-panel/70 px-3.5 py-2.5 font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-fog transition-all duration-300 hover:border-xbox/50 hover:text-xbox xl:inline-flex"
              >
                <s.icon className="h-3.5 w-3.5" />
                {s.label}
              </a>
            ))}

            <a
              href="#steps"
              className="inline-flex items-center gap-2 rounded-lg bg-xbox px-3.5 py-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.15em] text-void transition-all duration-300 hover:shadow-[0_0_30px_rgba(155,240,11,0.45)] sm:px-4"
            >
              <Terminal className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Начать</span>
              <span className="sm:hidden">Старт</span>
            </a>

            {/* burger — mobile & tablet */}
            <button
              onClick={() => setOpen(true)}
              aria-label="Открыть меню"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-line-2 bg-panel/70 text-mint transition-all duration-300 hover:border-xbox/50 hover:text-xbox xl:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <motion.div
        style={{ scaleX: progress }}
        className="h-[2px] origin-left bg-gradient-to-r from-xbox-deep via-xbox to-xbox"
      />

      {/* ---------- mobile drawer ---------- */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-void/80 backdrop-blur-sm xl:hidden"
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="fixed right-0 top-0 z-50 flex h-[100dvh] w-[86vw] max-w-sm flex-col border-l border-line-2 bg-panel shadow-[-24px_0_60px_rgba(0,0,0,0.6)] xl:hidden"
            >
              <div className="flex items-center gap-3 border-b border-line px-5 py-4">
                <img src={logo} alt="" className="h-9 w-9 rounded-full object-cover ring-2 ring-xbox/60" />
                <span className="flex flex-col leading-none">
                  <span className="font-display text-[13px] font-semibold uppercase text-white">
                    Xbox&nbsp;Live&nbsp;Fix
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-ash">
                    keenetic edition
                  </span>
                </span>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Закрыть меню"
                  className="ml-auto flex h-9 w-9 items-center justify-center rounded-lg border border-line-2 text-fog transition-colors hover:border-xbox/50 hover:text-xbox"
                >
                  <X className="h-4.5 w-4.5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-5 py-5">
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-ash">
                  разделы
                </p>
                <nav className="mt-3 space-y-1.5">
                  {LINKS.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between rounded-xl border border-line bg-panel-2 px-4 py-3.5 font-mono text-[12px] font-bold uppercase tracking-[0.15em] text-mint transition-all duration-300 hover:border-xbox/50 hover:text-xbox"
                    >
                      {l.label}
                      <ArrowUpRight className="h-3.5 w-3.5 text-ash" />
                    </a>
                  ))}
                </nav>

                <a
                  href="#dns"
                  onClick={() => setOpen(false)}
                  className="mt-4 flex items-center justify-center gap-2.5 rounded-xl border border-xbox/40 bg-xbox/10 px-4 py-3.5 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-xbox transition-all duration-300 hover:bg-xbox hover:text-void"
                >
                  <Server className="h-4 w-4" />
                  Настройка DNS
                </a>

                <p className="mt-7 font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-ash">
                  ссылки
                </p>
                <div className="mt-3 space-y-1.5">
                  {SOCIALS.map((s) => (
                    <a
                      key={s.href}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setOpen(false)}
                      className="group flex items-center gap-3 rounded-xl border border-line bg-panel-2 px-4 py-3.5 transition-all duration-300 hover:border-xbox/50"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-xbox/10 text-xbox ring-1 ring-xbox/30 transition-all group-hover:bg-xbox group-hover:text-void">
                        <s.icon className="h-4 w-4" />
                      </span>
                      <span className="flex-1 font-mono text-[12px] font-bold uppercase tracking-[0.12em] text-fog group-hover:text-xbox">
                        {s.label}
                      </span>
                      <ArrowUpRight className="h-3.5 w-3.5 text-ash" />
                    </a>
                  ))}
                </div>
              </div>

              <div className="border-t border-line px-5 py-4">
                <a
                  href="#steps"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2.5 rounded-xl bg-xbox px-5 py-4 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-void transition-all duration-300 hover:shadow-[0_0_30px_rgba(155,240,11,0.45)]"
                >
                  <Terminal className="h-4 w-4" />
                  Начать настройку
                </a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
