import type { ReactNode } from "react";
import {
  AlertTriangle,
  Globe,
  Info,
  MousePointerClick,
  Settings,
  Terminal,
} from "lucide-react";
import { CommandCard, CopyButton, ResponseBlock, Reveal, SectionHeading } from "./kit";

/* ---------------- step shell ---------------- */

function Step({
  num,
  title,
  desc,
  children,
  id,
}: {
  num: string;
  title: string;
  desc: string;
  children: ReactNode;
  id: string;
}) {
  return (
    <div id={id} className="scroll-mt-28">
      <div className="grid gap-8 border-t border-line/70 py-14 lg:grid-cols-[0.85fr_1.35fr] lg:gap-16 lg:py-20">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <p className="font-display text-stroke text-7xl font-extrabold leading-none sm:text-8xl">
            {num}
          </p>
          <h3 className="font-display mt-5 text-xl font-semibold uppercase leading-snug tracking-tight text-white sm:text-2xl">
            {title}
          </h3>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-fog">{desc}</p>
        </Reveal>
        <Reveal delay={0.12} className="space-y-5">
          {children}
        </Reveal>
      </div>
    </div>
  );
}

/* ---------------- step 1 visuals ---------------- */

function AddressCard({ url, hint }: { url: string; hint: string }) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-line bg-panel px-4 py-4 sm:px-5">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-xbox/10 text-xbox ring-1 ring-xbox/30">
        <Globe className="h-4.5 w-4.5" />
      </span>
      <div className="min-w-0 flex-1">
        <code className="block truncate font-mono text-sm text-mint sm:text-[15px]">{url}</code>
        <p className="mt-0.5 text-[11px] text-ash">{hint}</p>
      </div>
      <CopyButton text={url} />
    </div>
  );
}

/* ---------------- step 2 mock ---------------- */

function KeeneticMenuMock() {
  return (
    <div className="overflow-hidden rounded-xl border border-line bg-panel">
      <div className="flex items-center gap-2 border-b border-line bg-panel-2 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-alert/60" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#f7b955]/60" />
        <span className="h-2.5 w-2.5 rounded-full bg-xbox/70" />
        <span className="ml-3 rounded-md bg-void/70 px-3 py-1 font-mono text-[11px] text-fog ring-1 ring-line">
          http://192.168.1.1
        </span>
      </div>
      <div className="relative px-5 py-5 sm:px-7">
        <div className="flex items-center justify-between">
          <span className="font-display text-[13px] font-semibold lowercase tracking-wide text-fog">
            keenetic
          </span>
          <div className="relative">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-xbox/15 text-xbox ring-1 ring-xbox/50">
              <Settings className="h-5 w-5" />
            </span>
            <MousePointerClick className="absolute -bottom-2 -right-2 h-4 w-4 text-xbox" />
          </div>
        </div>
        {/* dropdown */}
        <div className="absolute right-4 top-[64px] z-10 w-60 overflow-hidden rounded-xl border border-line-2 bg-panel-2 shadow-[0_24px_60px_rgba(0,0,0,0.6)] sm:right-7">
          {["Общие настройки", "Пользователи и доступ"].map((i) => (
            <p key={i} className="px-4 py-2.5 text-xs text-fog/70">
              {i}
            </p>
          ))}
          <p className="flex items-center gap-2.5 border-y border-xbox/25 bg-xbox/10 px-4 py-3 text-xs font-bold text-xbox">
            <Terminal className="h-3.5 w-3.5" />
            Командная строка
          </p>
          {["Диагностика", "Перезагрузка"].map((i) => (
            <p key={i} className="px-4 py-2.5 text-xs text-fog/70">
              {i}
            </p>
          ))}
        </div>
        <div className="mt-6 space-y-2.5 pb-16">
          <div className="h-3 w-2/3 rounded-full bg-line/60" />
          <div className="h-3 w-1/2 rounded-full bg-line/40" />
          <div className="h-3 w-3/5 rounded-full bg-line/50" />
        </div>
      </div>
    </div>
  );
}

/* ---------------- note ---------------- */

function Note({ icon: Icon = Info, children }: { icon?: typeof Info; children: ReactNode }) {
  return (
    <div className="flex items-start gap-3.5 rounded-xl border border-xbox/20 bg-xbox/[0.05] px-4 py-4 sm:px-5">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-xbox" />
      <p className="text-[13px] leading-relaxed text-mint/90">{children}</p>
    </div>
  );
}

/* ---------------- section ---------------- */

export function StepsSection() {
  return (
    <section id="steps" className="relative scroll-mt-20">
      <div className="mx-auto max-w-6xl px-5 pb-6 pt-24 sm:px-8 lg:pt-32">
        <SectionHeading
          kicker="[ план действий ]"
          title={
            <>
              Пять шагов
              <br />
              <span className="text-xbox">до победы</span>
            </>
          }
          sub="Все настройки производятся в браузере. Не набирайте команды вручную — копируйте и вставляйте, чтобы исключить опечатки."
        />

        <Reveal delay={0.15} className="mx-auto mt-10 max-w-3xl">
          <div className="flex items-start gap-3.5 rounded-xl border border-[#f7b955]/25 bg-[#f7b955]/[0.06] px-5 py-4">
            <AlertTriangle className="mt-0.5 h-4.5 w-4.5 shrink-0 text-[#f7b955]" />
            <p className="text-[13px] leading-relaxed text-[#f2d9a4]">
              Каждую команду отправляйте кнопкой <b>«Отправить запрос (Send&nbsp;Request)»</b> и
              дожидайтесь ответа роутера, прежде чем вводить следующую.
            </p>
          </div>
        </Reveal>

        <div className="mt-6">
          {/* -------- STEP 1 -------- */}
          <Step
            id="step-1"
            num="01"
            title="Откройте панель роутера"
            desc="Перейдите в браузере по адресу веб-интерфейса Keenetic. Это стандартные адреса — если вы когда-то меняли адрес роутера, введите свой."
          >
            <AddressCard url="http://192.168.1.1" hint="стандартный адрес панели" />
            <AddressCard url="https://my.keenetic.net" hint="фирменный адрес Keenetic" />
            <Note>
              Если Keenetic стоит <b>вторым роутером</b> после провайдерского, адрес может
              быть <code className="font-mono text-xbox">192.168.2.1</code>. Введите его в
              адресную строку и авторизуйтесь в панели.
            </Note>
          </Step>

          {/* -------- STEP 2 -------- */}
          <Step
            id="step-2"
            num="02"
            title="Перейдите в командную строку"
            desc="В правом верхнем углу панели нажмите на иконку шестерёнки и в выпавшем меню выберите раздел «Командная строка»."
          >
            <KeeneticMenuMock />
            <Note icon={MousePointerClick}>
              Меню находится <b>в правом верхнем углу</b> веб-интерфейса. Искомый пункт —
              <b> «Командная строка»</b>.
            </Note>
          </Step>

          {/* -------- STEP 3 -------- */}
          <Step
            id="step-3"
            num="03"
            title="Очистите старые записи"
            desc="Удалите ранее добавленные статические записи хостов, чтобы не было конфликтов. Вставьте команду и нажмите «Отправить запрос»."
          >
            <CommandCard command="no ip host" />
            <div className="grid gap-4 sm:grid-cols-2">
              <ResponseBlock
                tone="ok"
                text="cleared all records"
                caption="Если запись уже была прописана ранее — роутер подтвердит очистку."
              />
              <ResponseBlock
                tone="err"
                text="no such command"
                caption="Красное окно с такой ошибкой — это нормально: значит, хостов не было. Идём дальше."
              />
            </div>
          </Step>

          {/* -------- STEP 4 -------- */}
          <Step
            id="step-4"
            num="04"
            title="Добавьте статическую запись"
            desc="Пропишите адрес сервиса авторизации Xbox Live напрямую. Вставьте команду и снова нажмите «Отправить запрос»."
          >
            <CommandCard command="ip host xsts.auth.xboxlive.com 164.90.228.248" />
            <ResponseBlock
              tone="ok"
              text='added static record for "xsts.auth.xboxlive.com", address 164.90.228.248'
              caption="Роутер подтвердил: статическая запись добавлена. Осталось её сохранить."
            />
          </Step>

          {/* -------- STEP 5 -------- */}
          <Step
            id="step-5"
            num="05"
            title="Сохраните конфигурацию"
            desc="Последняя команда фиксирует настройку в памяти роутера, чтобы запись не пропала. Отправьте её той же кнопкой."
          >
            <CommandCard command="system configuration save" />
            <ResponseBlock
              tone="ok"
              text="saving (http/rci)."
              caption="Конфигурация сохранена. Настройка роутера завершена — остался Xbox."
            />
          </Step>
        </div>
      </div>
    </section>
  );
}
