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
- Project visuals are local raster case-study assets stored in `public/concept-projects`.
- Official logo assets are transparent PNGs generated from `public/brand-reference/nour-logo-reference.png`.
- The contact form prepares a mail draft with the submitted project details.

## Deployment

No Vercel deployment is connected from this project yet. `vercel.json` only provides a future SPA route fallback so direct URLs like `/work/flora` can resolve to the React app after hosting.
