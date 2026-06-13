# Portfolio

A personal portfolio built with Next.js featuring a modern interface, animations, and interactive contact elements.

## Overview

This project is a single-page portfolio that includes:
- a hero section with a short introduction
- sections for "What I Build", "Client Work", "Case Study", "Projects", and "Tech Stack"
- a contact CTA with a "START A PROJECT" button
- a 3D component using `three.js` / `@react-three/fiber`
- responsive navigation and footer

## Technologies

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- Framer Motion
- Three.js / @react-three/fiber / @react-three/drei
- lucide-react
- ESLint

## Project Structure

- `src/app/` — main routing and global styles
- `src/components/` — UI components for the site
- `src/lib/data.ts` — profile, contact, and tech stack data
- `public/` — static assets and files

## Getting Started

```bash
npm install
npm run dev
```

Open your browser at: `http://localhost:3000`

## Build

```bash
npm run build
npm run start
```

## Contact

The "START A PROJECT" button and email links open Gmail compose for a new message.

## Notes

- The project uses the App Router and static page generation.
- Contact information is stored in `src/lib/data.ts`, making it easy to update email, phone, and links.
