import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  ChevronRight,
  ClipboardPaste,
  FlaskConical,
  Lock,
  PartyPopper,
  RotateCcw,
  Settings,
} from "lucide-react";
import { Reveal, SectionHeading } from "./kit";
import { cn } from "../utils/cn";

const SCRIPT: { cmd: string; ok: string; note?: string }[] = [
  {
    cmd: "no ip host",
    ok: "cleared all records",
    note: "// в реальном роутере здесь может быть красное «no such command» — это норма",
  },
  {
    cmd: "ip host xsts.auth.xboxlive.com 164.90.228.248",
    ok: 'added static record for "xsts.auth.xboxlive.com", address 164.90.228.248',
  },
  {
    cmd: "system configuration save",
    ok: "saving (http/rci).",
  },
];

type Entry = { kind: "cmd" | "ok" | "err" | "note" | "win"; text: string };

const norm = (s: string) => s.trim().replace(/\s+/g, " ").toLowerCase();

export function Simulator() {
  const [entries, setEntries] = useState<Entry[]>([
    { kind: "note", text: "// введите первую команду — подсказка слева" },
  ]);
  const [stage, setStage] = useState(0);
  const [input, setInput] = useState("");
  const [shake, setShake] = useState(false);
  const [done, setDone] = useState(false);
  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const el = logRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [entries]);

  const push = (...items: Entry[]) => setEntries((p) => [...p, ...items]);

  const send = () => {
    if (done) return;
    const v = norm(input);
    if (!v) return;
    const expected = SCRIPT[stage];
    if (v === expected.cmd) {
      const next: Entry[] = [
        { kind: "cmd", text: expected.cmd },
        { kind: "ok", text: expected.ok },
      ];
      if (expected.note) next.push({ kind: "note", text: expected.note });
      push(...next);
      setInput("");
      if (stage === SCRIPT.length - 1) {
        setDone(true);
        setTimeout(
          () =>
            push({
              kind: "win",
              text: "конфигурация сохранена — вы справились",
            }),
          650
        );
      }
      setStage((s) => s + 1);
    } else {
      push({ kind: "cmd", text: input.trim() }, { kind: "err", text: "no such command" });
      setShake(true);
      setTimeout(() => setShake(false), 450);
    }
  };

  const fill = () => {
    if (done) return;
    setInput(SCRIPT[Math.min(stage, SCRIPT.length - 1)].cmd);
    inputRef.current?.focus();
  };

  const reset = () => {
    setEntries([{ kind: "note", text: "// симулятор сброшен — начнём заново" }]);
    setStage(0);
    setInput("");
    setDone(false);
  };

  return (
    <section id="simulator" className="relative scroll-mt-20">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-line-2 to-transparent" />
      <div className="pointer-events-none absolute left-1/2 top-24 h-72 w-72 -translate-x-1/2 rounded-full bg-xbox/[0.07] blur-[110px]" />

      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 lg:py-32">
        <SectionHeading
          kicker="[ тренажёр ]"
          title={
            <>
              Отрепетируйте
              <br />
              <span className="text-xbox">без риска</span>
            </>
          }
          sub="Точная копия командной строки Keenetic. Прогоните все три команды здесь — в настоящем роутере всё будет выглядеть один в один."
        />

        <div className="mx-auto mt-14 grid max-w-5xl items-start gap-10 lg:grid-cols-[0.7fr_1.3fr]">
          {/* side info */}
          <Reveal className="min-w-0 space-y-5 lg:sticky lg:top-28">
            <div className="rounded-xl border border-line bg-panel p-5">
              <p className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-xbox">
                <FlaskConical className="h-3.5 w-3.5" />
                как это работает
              </p>
              <ul className="mt-4 space-y-3">
                {[
                  "Нажмите «Вставить» — команда попадёт в поле",
                  "Отправьте её кнопкой «Отправить запрос»",
                  "Роутер ответит — как в настоящей панели",
                  "Ошибётесь — увидите красное «no such command»",
                ].map((t, i) => (
                  <li key={i} className="flex items-start gap-3 text-[13px] leading-relaxed text-fog">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-xbox/10 font-mono text-[10px] font-bold text-xbox ring-1 ring-xbox/30">
                      {i + 1}
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            {/* stage tracker */}
            <div className="space-y-2">
              {SCRIPT.map((s, i) => {
                const state = i < stage || done ? "done" : i === stage ? "current" : "locked";
                return (
                  <button
                    key={s.cmd}
                    onClick={state === "current" ? fill : undefined}
                    className={cn(
                      "flex w-full min-w-0 items-center gap-3 rounded-lg border px-3.5 py-2.5 text-left font-mono text-[10.5px] transition-all duration-300 sm:text-[11px]",
                      state === "done" && "border-xbox/25 bg-xbox/[0.06] text-xbox/80",
                      state === "current" &&
                        "border-xbox/50 bg-xbox/10 text-mint cursor-pointer hover:bg-xbox/15",
                      state === "locked" && "border-line bg-panel/60 text-ash"
                    )}
                  >
                    {state === "done" ? (
                      <Check className="h-3.5 w-3.5 shrink-0" />
                    ) : state === "current" ? (
                      <ChevronRight className="h-3.5 w-3.5 shrink-0 animate-pulse" />
                    ) : (
                      <Lock className="h-3 w-3 shrink-0" />
                    )}
                    <span className="min-w-0 flex-1 [overflow-wrap:anywhere]">{s.cmd}</span>
                  </button>
                );
              })}
            </div>
          </Reveal>

          {/* terminal frame */}
          <Reveal delay={0.15} className="min-w-0">
            <div className="glow-ring min-w-0 overflow-hidden rounded-2xl border border-line-2 bg-panel">
              {/* chrome */}
              <div className="flex items-center gap-3 border-b border-line bg-panel-2 px-4 py-3.5 sm:px-5">
                <span className="font-display text-[12px] font-semibold lowercase text-fog">
                  keenetic
                </span>
                <span className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-ash sm:inline">
                  / система / командная строка
                </span>
                <span className="ml-auto flex items-center gap-3">
                  <button
                    onClick={reset}
                    title="Сбросить симулятор"
                    className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-line-2 text-fog transition-colors hover:border-xbox/50 hover:text-xbox"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                  </button>
                  <Settings className="h-4 w-4 text-ash" />
                </span>
              </div>

              {/* log */}
              <div
                ref={logRef}
                className="relative h-[260px] overflow-y-auto overflow-x-hidden scroll-smooth px-3.5 py-4 font-mono text-[11px] leading-[1.75] sm:h-[300px] sm:px-5 sm:text-[13px] sm:leading-[2]"
              >
                <AnimatePresence initial={false}>
                  {entries.map((e, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={cn(
                        "min-w-0 [overflow-wrap:anywhere]",
                        e.kind === "cmd" && "text-mint",
                        e.kind === "ok" && "text-xbox terminal-glow",
                        e.kind === "err" && "text-alert",
                        e.kind === "note" && "text-ash",
                        e.kind === "win" &&
                          "mt-2 flex items-center gap-2 rounded-lg border border-xbox/40 bg-xbox/10 px-3 py-2 font-sans text-xs font-bold uppercase tracking-widest text-xbox"
                      )}
                    >
                      {e.kind === "cmd" && <span className="select-none text-xbox/60">&gt; </span>}
                      {e.kind === "win" && <PartyPopper className="h-4 w-4 shrink-0" />}
                      {e.text}
                    </motion.p>
                  ))}
                </AnimatePresence>
              </div>

              {/* input row */}
              <div className={cn("border-t border-line bg-panel-2/60 px-3.5 py-4 sm:px-5", shake && "animate-shake")}>
                <div className="flex min-w-0 flex-col gap-2.5 sm:flex-row">
                  <div className="flex min-w-0 flex-1 items-center gap-2 rounded-xl border border-line-2 bg-void px-3 focus-within:border-xbox/60 sm:gap-2.5 sm:px-4">
                    <span className="shrink-0 select-none font-mono text-sm text-xbox/70">&gt;</span>
                    <input
                      ref={inputRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && send()}
                      disabled={done}
                      size={1}
                      placeholder={done ? "готово" : "вставьте команду…"}
                      spellCheck={false}
                      autoComplete="off"
                      className="h-12 w-full min-w-0 bg-transparent font-mono text-[12px] text-mint placeholder:text-ash/70 focus:outline-none disabled:opacity-50 sm:text-[13px]"
                    />
                  </div>
                  <div className="flex min-w-0 gap-2.5">
                    <button
                      onClick={fill}
                      disabled={done}
                      className="inline-flex min-w-0 flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border border-line-2 bg-panel px-3 py-3 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-fog transition-all hover:border-xbox/50 hover:text-xbox disabled:opacity-40 sm:flex-none sm:px-4 sm:tracking-[0.15em]"
                    >
                      <ClipboardPaste className="h-3.5 w-3.5 shrink-0" />
                      Вставить
                    </button>
                    <button
                      onClick={send}
                      disabled={done}
                      className="inline-flex min-w-0 flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-xbox px-3 py-3 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-void transition-all hover:shadow-[0_0_30px_rgba(155,240,11,0.4)] disabled:opacity-40 sm:flex-none sm:px-5 sm:tracking-[0.15em]"
                    >
                      <span className="sm:hidden">Отправить</span>
                      <span className="hidden sm:inline">Отправить запрос</span>
                    </button>
                  </div>
                </div>
                <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-ash">
                  {done
                    ? "симуляция пройдена · в роутере всё то же самое"
                    : `команда ${Math.min(stage + 1, 3)} из 3 · опечатались? не страшно — это тренажёр`}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
