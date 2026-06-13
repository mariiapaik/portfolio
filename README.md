# Portfolio

Личное портфолио на Next.js с современным интерфейсом, анимациями и интерактивными контактными элементами.

## Обзор

Проект представляет собой одностраничное портфолио, включающее:
- заголовок и краткую презентацию
- блоки "What I Build", "Client Work", "Case Study", "Projects" и "Tech Stack"
- контактный CTA с кнопкой "START A PROJECT"
- 3D-компонент на `three.js` / `@react-three/fiber`
- адаптивную навигацию и футер

## Технологии

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- Framer Motion
- Three.js / @react-three/fiber / @react-three/drei
- lucide-react
- ESLint

## Структура проекта

- `src/app/` — основной рутинг и глобальные стили
- `src/components/` — UI-компоненты сайта
- `src/lib/data.ts` — данные профиля, контактов и списка технологий
- `public/` — статические файлы и активы

## Запуск

```bash
npm install
npm run dev
```

Откройте в браузере: `http://localhost:3000`

## Сборка

```bash
npm run build
npm run start
```

## Контакты

Кнопка "START A PROJECT" и ссылки на email открывают Gmail в режиме создания нового письма.

## Заметки

- Проект использует App Router и статическую генерацию страниц.
- Контакты хранятся в `src/lib/data.ts`, что позволяет легко менять email, телефон и ссылки.
