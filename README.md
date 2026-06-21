# doc-writer

A markdown editor that exports to Word format.

## Resources

- Live Demo: https://www.kkoisland.com/doc-writer
- Slides: TBD

## Features

- Write documents in Markdown (resume, cover letter, etc.)
- Export to Word format
- Save/open local `.md` files via File System Access API
- No server required — runs entirely in the browser

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Biome (formatter & linter)
- File System Access API

## Local Development

```bash
git clone https://github.com/kkoisland/doc-writer.git
cd doc-writer
pnpm i
pnpm dev
```

Open http://localhost:5173/

## Project Structure

```
src/
  App.tsx           — entry point
  Editor.tsx        — textarea + header (new / open / save)
  useDocument.ts    — file read/write logic (File System Access API)
  index.css         — global styles
```

## Deploy

Deployed to GitHub Pages via GitHub Actions.  
Push to `main` triggers auto build & deploy.

Settings → Pages → Source: GitHub Actions
