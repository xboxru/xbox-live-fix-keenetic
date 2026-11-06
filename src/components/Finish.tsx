import { Network, Power, Router, Sparkles } from "lucide-react";
import { Reveal, SectionHeading } from "./kit";

const CARDS = [
  {
    icon: Network,
    title: "DNS на Xbox — автоматически",
    desc: "В настройках сети консоли обязательно установите получение DNS «автоматически» — иначе статическая запись роутера не сработает.",
    tag: "обязательно",
    tagTone: "xbox" as const,
  },
  {
    icon: Power,
    title: "Перезагрузите консоль",
    desc: "Полностью перезапустите Xbox, чтобы он подхватил новую запись и прошёл авторизацию в Xbox Live.",
    tag: "обязательно",
    tagTone: "xbox" as const,
  },
  {
    icon: Router,
    title: "Роутер не трогаем",
    desc: "Перезагружать Keenetic не требуется — конфигурация уже сохранена последней командой.",
    tag: "не требуется",
    tagTone: "dim" as const,
  },
];

export function Finish() {
  return (
    <section id="finish" className="relative scroll-mt-20">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-line-2 to-transparent" />
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 lg:py-32">
        <SectionHeading
          kicker="[ финальный рывок ]"
          title={
            <>
              Осталось
              <br />
              <span className="text-xbox">настроить xbox</span>
            </>
          }
          sub="Роутер готов. Теперь пара действий на самой консоли — и можно возвращаться в игру."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {CARDS.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.12}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-line bg-panel p-6 transition-all duration-500 hover:border-xbox/40 hover:bg-panel-2">
                <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-xbox/[0.06] blur-2xl transition-all duration-500 group-hover:bg-xbox/[0.14]" />
                <div className="flex items-start justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-xbox/10 text-xbox ring-1 ring-xbox/30 transition-all duration-500 group-hover:bg-xbox group-hover:text-void">
                    <c.icon className="h-5 w-5" />
                  </span>
                  <span
                    className={
                      c.tagTone === "xbox"
                        ? "rounded-md bg-xbox/10 px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-xbox ring-1 ring-xbox/30"
                        : "rounded-md bg-line/50 px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-fog ring-1 ring-line-2"
                    }
                  >
                    {c.tag}
                  </span>
                </div>
                <h3 className="font-display mt-5 text-[15px] font-semibold uppercase leading-snug text-white">
                  {c.title}
                </h3>
                <p className="mt-3 text-[13px] leading-relaxed text-fog">{c.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* success banner */}
        <Reveal delay={0.2} className="mt-16">
          <div className="glow-ring relative overflow-hidden rounded-3xl border border-xbox/30 bg-gradient-to-b from-xbox/[0.09] to-panel px-6 py-14 text-center sm:px-12 lg:py-20">
            <div className="grid-bg absolute inset-0 opacity-60" />
            <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-[130%] -translate-x-1/2 rounded-full bg-xbox/15 blur-[100px]" />
            <div className="relative">
              <span className="inline-flex items-center gap-2 rounded-full border border-xbox/40 bg-void/60 px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-xbox">
                <Sparkles className="h-3.5 w-3.5" />
                mission complete
              </span>
              <p className="font-display mt-7 text-4xl font-extrabold uppercase tracking-tight text-white sm:text-6xl lg:text-7xl">
                Готово<span className="text-xbox">.</span>
              </p>
              <p className="mx-auto mt-5 max-w-lg text-sm leading-relaxed text-fog sm:text-base">
                Авторизация Xbox Live должна пройти без ошибок. Если что-то пошло не так —
                проверьте FAQ ниже или прогоните команды ещё раз в тренажёре.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3 font-mono text-[10px] font-bold uppercase tracking-[0.2em]">
                <a
                  href="#simulator"
                  className="rounded-lg border border-xbox/40 bg-void/60 px-5 py-3 text-xbox transition-all duration-300 hover:bg-xbox hover:text-void"
                >
                  Повторить в тренажёре
                </a>
                <a
                  href="#top"
                  className="rounded-lg border border-line-2 bg-void/60 px-5 py-3 text-fog transition-all duration-300 hover:border-xbox/40 hover:text-xbox"
                >
                  Вернуться наверх
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
