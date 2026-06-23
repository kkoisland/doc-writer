# doc-writer

A markdown editor that exports to Word format.

## Resources

- Live Demo: https://www.kkoisland.com/doc-writer
- Slides: https://www.kkoisland.com/slides-slidev/slides/doc-writer/

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

## Resume Sample

```markdown
# <center>Name</center>

<center>email@example.com | City, State ZIP | 000-000-0000 | https://linkedin.com/in/yourname | https://yourwebsite.com</center>

## <center>Title</center>

Description of yourself paragraph 1.

Description of yourself paragraph 2.

**Skill Category A** – Skill1 | Skill2 | Skill3 | Skill4

**Skill Category B** – Skill1 | Skill2 | Skill3  
**Skill Category C** – Skill1 | Skill2 | Skill3

<p></p>

### EXPERIENCE
**Company A, City, State | 2020 - 2025**  
***Job Title***

Brief description of your role and responsibilities.

- Accomplishment 1 using Technology A and Technology B, achieving result X
- Accomplishment 2 with Technology C, improving outcome Y
- Accomplishment 3 using Tool D, delivering result Z

<p></p>

**Company B, City, State | 2019 - 2020**  
***Job Title***

Brief description of your role and responsibilities.

- Accomplishment 1 using Technology A and Framework B
- Accomplishment 2 improving coverage and reliability

<p></p>

**Company C, City, State | 2010 - 2019**  
***Job Title***

Brief description of your role and responsibilities.

- Accomplishment 1
- Accomplishment 2
- Accomplishment 3

<p></p>

### EDUCATION
**University A**, State — *Master's in Field*

**University B**, Country — *Bachelor's in Field*

<p></p>

### AWARDS
- Award or recognition 1
- Award or recognition 2
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
