# Xbox Live Fix — Keenetic Edition

Интерактивная инструкция по восстановлению авторизации Xbox Live для владельцев роутеров Keenetic + актуальные DNS-адреса для ручной настройки на консоли.

## Что внутри

- **Пошаговая настройка Keenetic** за 5 шагов — статическая запись для `xsts.auth.xboxlive.com` через командную строку роутера (всё делается в браузере)
- **Тренажёр командной строки** — точная копия интерфейса Keenetic, где можно отрепетировать все три команды без риска
- **Актуальные DNS-адреса** для ручной настройки на Xbox (копирование в один клик)
- **FAQ** и чек-лист для консоли

## Команды для роутера

```
no ip host
ip host xsts.auth.xboxlive.com 164.90.228.248
system configuration save
```

## Стек

- React 19 + Vite
- Tailwind CSS v4
- Framer Motion
- Lucide Icons

## Запуск локально

```bash
npm install
npm run dev
```

## Сборка

```bash
npm run build
```

Результат — один самодостаточный файл `dist/index.html` (все стили, скрипты и изображения инлайнятся), который можно разместить на GitHub Pages, Netlify, Vercel или любом статическом хостинге.

## Ссылки

- Telegram: [t.me/spelonline](https://t.me/spelonline)
- Сайт: [xpbox.ru](https://xpbox.ru)
- Инструкция Xbox Live Fix: [xboxru.github.io/xbox-live-fix](https://xboxru.github.io/xbox-live-fix/)

---

Неофициальный проект. Не аффилирован с Microsoft и Keenetic.
