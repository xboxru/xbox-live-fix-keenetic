import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Lock, Send } from "lucide-react";
import logo from "../../public/images/logo.jpg";

const STORAGE_KEY = "xlf_sub_gate_passed";

export function SubGate() {
  const [open, setOpen] = useState(false);
  const [checking, setChecking] = useState(false);
  const [passed, setPassed] = useState(false);

  // show the gate once per browser session
  useEffect(() => {
    let already = false;
    try {
      already = sessionStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      already = false;
    }
    if (!already) setOpen(true);
  }, []);

  // lock page scroll while the gate is visible
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const verify = () => {
    if (checking) return;
    setChecking(true);
    // fake verification delay
    setTimeout(() => {
      setChecking(false);
      setPassed(true);
      try {
        sessionStorage.setItem(STORAGE_KEY, "1");
      } catch {
        /* ignore */
      }
      setTimeout(() => setOpen(false), 850);
    }, 2000);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-void/85 px-4 backdrop-blur-xl"
        >
          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.97 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="glow-ring relative w-full max-w-sm overflow-hidden rounded-3xl border border-line-2 bg-panel p-7 text-center sm:p-9"
          >
            <div className="grid-bg pointer-events-none absolute inset-0 opacity-50" />
            <div className="pointer-events-none absolute -top-16 left-1/2 h-40 w-56 -translate-x-1/2 rounded-full bg-xbox/15 blur-[70px]" />

            <div className="relative">
              <AnimatePresence mode="wait">
                {passed ? (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-xbox text-void shadow-[0_0_40px_rgba(155,240,11,0.5)]">
                      <Check className="h-8 w-8" strokeWidth={3} />
                    </span>
                    <h2 className="font-display mt-6 text-xl font-semibold uppercase tracking-tight text-white">
                      Доступ разрешён
                    </h2>
                    <p className="mt-3 text-[13px] leading-relaxed text-fog">
                      Спасибо! Открываем инструкцию…
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="gate"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.25 }}
                  >
                    <span className="relative mx-auto flex h-16 w-16 items-center justify-center">
                      <img
                        src={logo}
                        alt=""
                        className="h-16 w-16 rounded-full object-cover ring-2 ring-xbox/50"
                      />
                      <span className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-xbox text-void ring-4 ring-panel">
                        <Lock className="h-3.5 w-3.5" />
                      </span>
                    </span>

                    <h2 className="font-display mt-6 text-xl font-semibold uppercase leading-snug tracking-tight text-white sm:text-2xl">
                      Доступ закрыт
                    </h2>
                    <p className="mx-auto mt-3 max-w-[18rem] text-[13.5px] leading-relaxed text-fog">
                      Для просмотра инструкции и актуальных DNS-адресов подпишитесь на наш
                      Telegram-канал.
                    </p>

                    <a
                      href="https://t.me/spelonline"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-7 flex w-full items-center justify-center gap-2.5 rounded-xl bg-xbox px-5 py-4 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-void transition-all duration-300 hover:shadow-[0_0_36px_rgba(155,240,11,0.5)]"
                    >
                      <Send className="h-4 w-4" />
                      Подписаться
                    </a>

                    <button
                      onClick={verify}
                      disabled={checking}
                      className="mt-3 flex h-[52px] w-full cursor-pointer items-center justify-center gap-2.5 rounded-xl border border-line-2 bg-panel-2 px-5 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-mint transition-all duration-300 hover:border-xbox/50 hover:text-xbox disabled:cursor-wait"
                    >
                      {checking ? (
                        <span className="h-5 w-5 animate-spin rounded-full border-2 border-xbox/30 border-t-xbox" />
                      ) : (
                        "Я подписался"
                      )}
                    </button>

                    <p className="mt-5 font-mono text-[9px] uppercase tracking-[0.25em] text-ash">
                      проверка занимает пару секунд
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
