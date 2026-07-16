# Nour Bamarouf Portfolio

Desktop-first luxury editorial portfolio for Nour Bamarouf, Graphic Designer.

## Local Development

```bash
npm install
npm run dev -- --port 5173
```

Local preview:

```text
http://localhost:5173
```

## Quality Checks

```bash
npm run lint
npm run typecheck
npm run build
```

## Content Notes

- Project content is centralized in `src/data/projects.ts`.
- English and Arabic interface copy is centralized in `src/data/content.ts`.
- The current project visuals are art-directed CSS/SVG placeholders.
- Replace the temporary web logo with an official transparent SVG or PNG when available.
- Contact/social values are placeholders and the form is frontend-only until a backend handler is added.

## Deployment

No Vercel deployment is connected from this project yet. `vercel.json` only provides a future SPA route fallback so direct URLs like `/work/flora` can resolve to the React app after hosting.
