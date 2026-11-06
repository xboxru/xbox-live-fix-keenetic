import { motion, useScroll, useSpring } from "framer-motion";
import { BookOpen, Globe, Send, Server, Terminal } from "lucide-react";
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

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="border-b border-line/60 bg-void/75 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-5 sm:px-8">
          <a href="#top" className="group flex items-center gap-3">
            <img
              src={logo}
              alt="Логотип"
              className="h-9 w-9 shrink-0 rounded-full object-cover ring-2 ring-xbox/60 shadow-[0_0_16px_rgba(155,240,11,0.3)] transition-all duration-300 group-hover:shadow-[0_0_26px_rgba(155,240,11,0.55)] group-hover:ring-xbox"
            />
            <span className="hidden flex-col leading-none sm:flex">
              <span className="font-display text-[13px] font-semibold uppercase tracking-wide text-white">
                Xbox&nbsp;Live&nbsp;Fix
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ash">
                keenetic&nbsp;edition
              </span>
            </span>
          </a>

          <div className="ml-auto flex items-center gap-1.5 md:gap-2">
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

            {/* DNS section anchor — pill on desktop, icon on mobile */}
            <a
              href="#dns"
              className="hidden items-center gap-2 rounded-lg border border-xbox/40 bg-xbox/10 px-3.5 py-2.5 font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-xbox transition-all duration-300 hover:bg-xbox hover:text-void lg:inline-flex"
            >
              <Server className="h-3.5 w-3.5" />
              Настройка DNS
            </a>
            <a
              href="#dns"
              aria-label="Настройка DNS"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-xbox/40 bg-xbox/10 text-xbox transition-all duration-300 hover:bg-xbox hover:text-void lg:hidden"
            >
              <Server className="h-4 w-4" />
            </a>

            {/* social links — pill variant on wide desktop */}
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

            {/* social links — compact icon variant below wide desktop */}
            {SOCIALS.map((s) => (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-line-2 bg-panel/70 text-fog transition-all duration-300 hover:border-xbox/50 hover:text-xbox xl:hidden"
              >
                <s.icon className="h-4 w-4" />
              </a>
            ))}

            <a
              href="#steps"
              className="inline-flex items-center gap-2 rounded-lg bg-xbox px-4 py-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.15em] text-void transition-all duration-300 hover:shadow-[0_0_30px_rgba(155,240,11,0.45)]"
            >
              <Terminal className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Начать</span>
              <span className="sm:hidden">Старт</span>
            </a>
          </div>
        </div>
      </div>
      <motion.div
        style={{ scaleX: progress }}
        className="h-[2px] origin-left bg-gradient-to-r from-xbox-deep via-xbox to-xbox"
      />
    </header>
  );
}
