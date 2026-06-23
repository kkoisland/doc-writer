# doc-writer

A markdown editor that exports to Word format.

## Resources

- Live Demo: https://www.kkoisland.com/doc-writer
- Slides: TBD

## Features

- Write documents in Markdown (resume, cover letter, etc.)
- Export to Word (.docx) — downloads instantly, no save dialog
- Save/open local `.md` files via File System Access API
- No server required — runs entirely in the browser

## Markdown Syntax

### Headings

```markdown
# Heading 1
## Heading 2
### Heading 3
```

### Text formatting

```markdown
**bold**
*italic*
***bold + italic***
```

### Lists

```markdown
- item 1
- item 2
```

### Centering

```markdown
# <center>Keiko Higuchi</center>
<center>contact info</center>
```

### Right-align

```markdown
<right>2020 - 2025</right>
```

### Blank line (spacer)

```markdown
<p></p>
```

### Line break within a paragraph

Add two spaces at the end of a line:

```markdown
**Company Name**  
***Job Title***
```

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Biome (formatter & linter)
- File System Access API
- [docx](https://www.npmjs.com/package/docx) — generate .docx in browser
- [marked](https://www.npmjs.com/package/marked) — Markdown parser

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
  Editor.tsx        — textarea + header (new / open / save / word export)
  useDocument.ts    — file read/write logic (File System Access API)
  useWordExport.ts  — Markdown → .docx conversion logic
  index.css         — global styles
```

## Deploy

Deployed to GitHub Pages via GitHub Actions.  
Push to `main` triggers auto build & deploy.

Settings → Pages → Source: GitHub Actions
