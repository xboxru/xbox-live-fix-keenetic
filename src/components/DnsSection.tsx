import { Check, Copy, Info, ListOrdered, Send, Server } from "lucide-react";
import { Reveal, SectionHeading, useCopyText } from "./kit";
import { cn } from "../utils/cn";

const PRIMARY_DNS = [
  { label: "Основной", value: "111.88.96.54" },
  { label: "Дополнительный", value: "111.88.96.55" },
];

const BACKUP_DNS: { value: string | null; badge?: string }[] = [
  { value: "111.88.96.50" },
  { value: "111.88.96.51" },
  { value: null },
  { value: "201.79.94.91", badge: "стабильный" },
  { value: "195.123.210.89" },
  { value: "95.216.232.133" },
];

const GUIDE = [
  "Параметры → Сеть → Параметры сети",
  "Дополнительные настройки → Параметры DNS",
  "Выберите «Вручную» и введите адреса выше",
  "Перезагрузите консоль для применения",
];

function BadgeNew() {
  return (
    <span className="pulse-dot rounded-md bg-xbox px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-void">
      новый
    </span>
  );
}

function DnsRow({ label, value }: { label: string; value: string }) {
  const { copied, copy } = useCopyText(value);
  return (
    <button
      onClick={copy}
      className={cn(
        "group flex w-full cursor-pointer items-center gap-4 rounded-2xl border px-5 py-5 text-left transition-all duration-300 sm:px-6",
        copied
          ? "border-xbox/60 bg-xbox/10 shadow-[0_0_36px_rgba(155,240,11,0.12)]"
          : "border-line-2 bg-panel-2 hover:border-xbox/40 hover:bg-panel"
      )}
    >
      <span className="min-w-0 flex-1">
        <span className="mb-2 flex items-center gap-2.5">
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-xbox">
            {label}
          </span>
          <BadgeNew />
        </span>
        <code className="block font-mono text-2xl font-bold tracking-tight text-mint sm:text-3xl">
          {value}
        </code>
      </span>
      <span
        className={cn(
          "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ring-1 transition-all duration-300",
          copied
            ? "bg-xbox text-void ring-xbox"
            : "bg-void text-fog ring-line-2 group-hover:text-xbox group-hover:ring-xbox/50"
        )}
      >
        {copied ? <Check className="h-4.5 w-4.5" /> : <Copy className="h-4.5 w-4.5" />}
      </span>
    </button>
  );
}

function BackupTile({ value, badge }: { value: string | null; badge?: string }) {
  const { copied, copy } = useCopyText(value ?? "");
  if (!value) {
    return (
      <div className="flex items-center justify-center rounded-xl border border-dashed border-line/80 py-3.5 font-mono text-sm text-ash/50">
        —
      </div>
    );
  }
  return (
    <button
      onClick={copy}
      className={cn(
        "group flex cursor-pointer flex-col items-center justify-center gap-1.5 rounded-xl border py-3.5 font-mono text-sm transition-all duration-300",
        copied
          ? "border-xbox/60 bg-xbox/10 text-xbox"
          : "border-line bg-panel text-fog hover:border-xbox/40 hover:text-mint"
      )}
    >
      <span className="flex items-center gap-1.5">
        {copied ? <Check className="h-3.5 w-3.5" /> : null}
        {value}
      </span>
      {badge && (
        <span className="rounded bg-xbox/15 px-1.5 py-0.5 font-sans text-[9px] font-bold uppercase tracking-[0.15em] text-xbox ring-1 ring-xbox/30">
          {badge}
        </span>
      )}
    </button>
  );
}

export function DnsSection() {
  return (
    <section id="dns" className="relative scroll-mt-20">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-line-2 to-transparent" />
      <div className="pointer-events-none absolute right-10 top-32 h-72 w-72 rounded-full bg-xbox/[0.06] blur-[110px]" />

      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 lg:py-32">
        <SectionHeading
          kicker="[ актуальные dns ]"
          title={
            <>
              Адреса DNS
              <br />
              <span className="text-xbox">для xbox live</span>
            </>
          }
          sub="Альтернатива настройке роутера: пропишите эти адреса вручную на консоли. Нажмите на адрес, чтобы скопировать."
        />

        <div className="mx-auto mt-14 grid max-w-5xl items-start gap-8 lg:grid-cols-[1.15fr_1fr]">
          {/* left: addresses */}
          <Reveal className="space-y-4">
            <div className="glow-ring space-y-4 rounded-3xl border border-line-2 bg-panel p-5 sm:p-6">
              {PRIMARY_DNS.map((d) => (
                <DnsRow key={d.value} label={d.label} value={d.value} />
              ))}
            </div>

            <div>
              <p className="mb-3 flex items-center gap-2 px-1 font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-ash">
                <Server className="h-3.5 w-3.5" />
                запасные адреса
              </p>
              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                {BACKUP_DNS.map((d, i) => (
                  <BackupTile key={i} value={d.value} badge={d.badge} />
                ))}
              </div>
            </div>

            <div className="flex items-start gap-3.5 rounded-xl border border-xbox/20 bg-xbox/[0.05] px-4 py-4 sm:px-5">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-xbox" />
              <p className="text-[13px] leading-relaxed text-mint/90">
                Достаточно <b>одного способа</b>: если DNS прописан вручную на консоли,
                настройка роутера не требуется — и наоборот.
              </p>
            </div>
          </Reveal>

          {/* right: guide + telegram */}
          <Reveal delay={0.15} className="space-y-5">
            <div className="overflow-hidden rounded-2xl border border-line bg-panel">
              <div className="flex items-center gap-2.5 border-b border-line bg-panel-2 px-5 py-3.5">
                <ListOrdered className="h-4 w-4 text-xbox" />
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-fog">
                  как настроить на xbox
                </span>
              </div>
              <ol className="space-y-1 px-5 py-5">
                {GUIDE.map((g, i) => (
                  <li key={i} className="flex items-start gap-3.5 py-2">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-xbox font-mono text-[11px] font-bold text-void">
                      {i + 1}
                    </span>
                    <span className="text-[13.5px] leading-relaxed text-mint/90">{g}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* telegram subscribe — no lock, just a button */}
            <div className="relative overflow-hidden rounded-2xl border border-xbox/25 bg-gradient-to-b from-xbox/[0.08] to-panel p-6">
              <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-xbox/15 blur-2xl" />
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-xbox/15 text-xbox ring-1 ring-xbox/40">
                <Send className="h-5 w-5" />
              </span>
              <p className="font-display mt-4 text-[15px] font-semibold uppercase leading-snug text-white">
                Свежие адреса — первыми
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-fog">
                Обновления DNS и новости по Xbox Live публикуем в нашем Telegram-канале.
              </p>
              <a
                href="https://t.me/spelonline"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex w-full items-center justify-center gap-2.5 rounded-xl bg-xbox px-6 py-3.5 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-void transition-all duration-300 hover:shadow-[0_0_36px_rgba(155,240,11,0.45)]"
              >
                <Send className="h-4 w-4" />
                Подписаться на канал
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
