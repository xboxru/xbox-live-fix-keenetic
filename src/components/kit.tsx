import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { Check, Copy, CornerDownLeft, TerminalSquare } from "lucide-react";
import { cn } from "../utils/cn";

/* ---------------- useCopyText ---------------- */

export function useCopyText(text: string, timeoutMs = 1800) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), timeoutMs);
  };

  return { copied, copy };
}

/* ---------------- CopyButton ---------------- */

export function CopyButton({
  text,
  className,
  withLabel = false,
}: {
  text: string;
  className?: string;
  withLabel?: boolean;
}) {
  const { copied, copy } = useCopyText(text);

  return (
    <button
      onClick={copy}
      aria-label="Скопировать"
      className={cn(
        "group/btn relative inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-lg border transition-all duration-300",
        copied
          ? "border-xbox/60 bg-xbox/15 text-xbox"
          : "border-line-2 bg-panel-2 text-fog hover:border-xbox/50 hover:text-xbox",
        withLabel ? "px-4 py-2.5 text-xs font-bold uppercase tracking-widest" : "h-10 w-10",
        className
      )}
    >
      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      {withLabel && (copied ? "Скопировано" : "Копировать")}
    </button>
  );
}

/* ---------------- CommandCard ---------------- */

export function CommandCard({
  command,
  caption = "Вставьте в поле команды и нажмите «Отправить запрос (Send Request)»",
}: {
  command: string;
  caption?: string;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-line bg-panel">
      <div className="flex items-center gap-2 border-b border-line bg-panel-2 px-4 py-2.5">
        <TerminalSquare className="h-3.5 w-3.5 text-xbox" />
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ash">
          поле команды
        </span>
        <span className="ml-auto hidden items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-ash sm:flex">
          <CornerDownLeft className="h-3 w-3" />
          send request
        </span>
      </div>
      <div className="flex items-center gap-3 px-4 py-4 sm:px-5">
        <span className="select-none font-mono text-xbox/70">&gt;</span>
        <code className="min-w-0 flex-1 [overflow-wrap:anywhere] font-mono text-[12.5px] leading-relaxed text-mint sm:text-[15px]">
          {command}
        </code>
        <CopyButton text={command} />
      </div>
      <div className="border-t border-line/70 bg-panel-2/50 px-4 py-2.5 sm:px-5">
        <p className="text-xs leading-relaxed text-fog">{caption}</p>
      </div>
    </div>
  );
}

/* ---------------- ResponseBlock ---------------- */

export function ResponseBlock({
  tone,
  text,
  caption,
}: {
  tone: "ok" | "err";
  text: string;
  caption: string;
}) {
  const ok = tone === "ok";
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border",
        ok ? "border-xbox/25 bg-xbox/[0.04]" : "border-alert/30 bg-alert/[0.05]"
      )}
    >
      <div className="flex items-center gap-2.5 px-4 py-2.5">
        <span
          className={cn(
            "h-2 w-2 rounded-full",
            ok ? "bg-xbox pulse-dot" : "bg-alert"
          )}
        />
        <span
          className={cn(
            "font-mono text-[10px] font-bold uppercase tracking-[0.25em]",
            ok ? "text-xbox" : "text-alert"
          )}
        >
          {ok ? "ответ роутера · ок" : "ответ роутера · ошибка"}
        </span>
      </div>
      <div className="px-4 pb-3">
        <code
          className={cn(
            "block [overflow-wrap:anywhere] font-mono text-[11.5px] leading-relaxed sm:text-sm",
            ok ? "text-xbox terminal-glow" : "text-alert"
          )}
        >
          {text}
        </code>
      </div>
      <div
        className={cn(
          "border-t px-4 py-2.5",
          ok ? "border-xbox/15" : "border-alert/20"
        )}
      >
        <p className="text-xs leading-relaxed text-fog">{caption}</p>
      </div>
    </div>
  );
}

/* ---------------- Reveal ---------------- */

export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ---------------- SectionHeading ---------------- */

export function SectionHeading({
  kicker,
  title,
  sub,
}: {
  kicker: string;
  title: ReactNode;
  sub?: string;
}) {
  return (
    <Reveal className="mx-auto max-w-3xl text-center">
      <p className="font-mono text-[11px] font-bold uppercase tracking-[0.35em] text-xbox">
        {kicker}
      </p>
      <h2 className="font-display mt-4 text-3xl font-semibold uppercase leading-[1.08] tracking-tight text-white sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {sub && <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-fog sm:text-base">{sub}</p>}
    </Reveal>
  );
}
