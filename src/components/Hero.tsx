import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowDown,
  ChevronRight,
  ClipboardPaste,
  Globe,
  ListChecks,
  RefreshCwOff,
  Timer,
  Wifi,
} from "lucide-react";
import heroBg from "../../public/images/hero-bg.jpg";

const SCENARIO: { tone: "cmd" | "ok"; text: string }[] = [
  { tone: "cmd", text: "no ip host" },
  { tone: "ok", text: "cleared all records" },
  { tone: "cmd", text: "ip host xsts.auth.xboxlive.com 164.90.228.248" },
  { tone: "ok", text: 'added static record for "xsts.auth.xboxlive.com", address 164.90.228.248' },
  { tone: "cmd", text: "system configuration save" },
  { tone: "ok", text: "saving (http/rci)." },
];

function useTypedTerminal() {
  const [lines, setLines] = useState<{ tone: "cmd" | "ok"; text: string }[]>([]);
  const [typing, setTyping] = useState("");

  useEffect(() => {
    let alive = true;
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
    (async () => {
      await sleep(900);
      while (alive) {
        setLines([]);
        for (const step of SCENARIO) {
          if (step.tone === "cmd") {
            for (let i = 1; i <= step.text.length; i++) {
              if (!alive) return;
              setTyping(step.text.slice(0, i));
              await sleep(30);
            }
            await sleep(460);
            setTyping("");
            setLines((p) => [...p, step]);
            await sleep(320);
          } else {
            setLines((p) => [...p, step]);
            await sleep(700);
          }
        }
        await sleep(4200);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  return { lines, typing };
}

const STATS = [
  { icon: ListChecks, label: "5 шагов" },
  { icon: Timer, label: "≈ 2 минуты" },
  { icon: RefreshCwOff, label: "роутер перезагружать не нужно" },
];

const MARQUEE = ["xsts.auth.xboxlive.com", "164.90.228.248", "no ip host", "system configuration save"];

export function Hero() {
  const { lines, typing } = useTypedTerminal();

  return (
    <section id="top" className="relative overflow-hidden pt-16">
      {/* backdrop */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt=""
          className="h-full w-full object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-void/70 via-void/55 to-void" />
        <div className="grid-bg absolute inset-0" />
        <div className="absolute -left-32 top-24 h-96 w-96 rounded-full bg-xbox/10 blur-[130px]" />
        <div className="absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-xbox-deep/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-14 px-5 pb-20 pt-16 sm:px-8 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:pt-24">
        {/* left — copy */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2.5 rounded-full border border-xbox/30 bg-xbox/[0.07] px-4 py-2"
          >
            <Wifi className="h-3.5 w-3.5 text-xbox" />
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-xbox">
              keenetic × xbox · инструкция
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="font-display mt-7 text-[34px] font-extrabold uppercase leading-[1.04] tracking-tight text-white sm:text-5xl lg:text-[56px] xl:text-[64px]"
          >
            Xbox Live
            <br />
            <span className="text-xbox terminal-glow">снова в сети</span>
            <span className="mt-2 block text-[0.42em] font-medium normal-case tracking-normal text-fog sm:text-[0.38em]" style={{ fontFamily: "var(--font-sans)" }}>
              чиним авторизацию xsts.auth.xboxlive.com
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-xl text-sm leading-relaxed text-fog sm:text-base"
          >
            Прописываем статическую DNS-запись на роутере Keenetic — три команды в
            браузере, без прошивок и сторонних программ. Копируйте команды кнопкой,
            вставляйте в поле — так не будет опечаток.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.36, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <a
              href="#steps"
              className="group inline-flex items-center gap-3 rounded-xl bg-xbox px-7 py-4 font-mono text-xs font-bold uppercase tracking-[0.15em] text-void transition-all duration-300 hover:shadow-[0_0_44px_rgba(155,240,11,0.5)]"
            >
              Начать настройку
              <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-1" />
            </a>
            <a
              href="#simulator"
              className="inline-flex items-center gap-3 rounded-xl border border-line-2 bg-panel/80 px-7 py-4 font-mono text-xs font-bold uppercase tracking-[0.15em] text-mint backdrop-blur transition-all duration-300 hover:border-xbox/50 hover:text-xbox"
            >
              Открыть тренажёр
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.48, ease: [0.22, 1, 0.36, 1] }}
            className="mt-9 flex flex-wrap gap-2.5"
          >
            {STATS.map((s) => (
              <span
                key={s.label}
                className="inline-flex items-center gap-2 rounded-lg border border-line bg-panel/70 px-3.5 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-fog backdrop-blur"
              >
                <s.icon className="h-3.5 w-3.5 text-xbox" />
                {s.label}
              </span>
            ))}
          </motion.div>
        </div>

        {/* right — live terminal */}
        <motion.div
          initial={{ opacity: 0, y: 40, rotate: 1.5 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="animate-float"
        >
          <div className="glow-ring overflow-hidden rounded-2xl border border-line-2 bg-panel/90 backdrop-blur">
            <div className="flex items-center gap-2 border-b border-line bg-panel-2 px-5 py-3.5">
              <span className="h-3 w-3 rounded-full bg-alert/70" />
              <span className="h-3 w-3 rounded-full bg-[#f7b955]/70" />
              <span className="h-3 w-3 rounded-full bg-xbox/80" />
              <span className="ml-3 flex items-center gap-2 font-mono text-[11px] text-ash">
                <Globe className="h-3 w-3" />
                192.168.1.1 · командная строка
              </span>
              <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.25em] text-xbox">
                live
              </span>
            </div>
            <div className="relative min-h-[280px] overflow-hidden px-3.5 py-5 font-mono text-[11px] leading-[1.8] [overflow-wrap:anywhere] sm:min-h-[300px] sm:px-5 sm:text-[13.5px] sm:leading-[1.9]">
              <div className="scanline pointer-events-none absolute left-0 top-0 h-10 w-full bg-gradient-to-b from-transparent via-xbox/[0.05] to-transparent" />
              {lines.map((l, i) =>
                l.tone === "cmd" ? (
                  <p key={i} className="text-mint">
                    <span className="select-none text-xbox/70">&gt; </span>
                    {l.text}
                  </p>
                ) : (
                  <p key={i} className="text-xbox terminal-glow">
                    {l.text}
                  </p>
                )
              )}
              <p className="text-mint">
                <span className="select-none text-xbox/70">&gt; </span>
                {typing}
                <span className="caret-blink ml-0.5 inline-block h-[1.1em] w-[7px] translate-y-[3px] bg-xbox" />
              </p>
            </div>
            <div className="flex items-center gap-2 border-t border-line bg-panel-2/60 px-5 py-3">
              <ClipboardPaste className="h-3.5 w-3.5 text-xbox" />
              <p className="text-[11px] leading-snug text-fog">
                Так будет выглядеть панель роутера, когда всё получится
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* marquee */}
      <div className="relative overflow-hidden border-y border-line/70 bg-panel/60 py-3.5 backdrop-blur">
        <div className="animate-marquee flex w-max items-center gap-8 whitespace-nowrap">
          {[...MARQUEE, ...MARQUEE, ...MARQUEE, ...MARQUEE].map((m, i) => (
            <span key={i} className="flex items-center gap-8 font-mono text-[11px] font-bold uppercase tracking-[0.3em] text-ash">
              <span className={i % 2 === 0 ? "text-fog" : "text-xbox/80"}>{m}</span>
              <ChevronRight className="h-3.5 w-3.5 text-xbox/50" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
