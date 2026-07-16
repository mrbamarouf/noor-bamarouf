# Design

## Theme

Nour Bamarouf uses a warm editorial identity with soft off-white, dusty rose, sage, olive grey, and deep muted charcoal. The visual world should feel like printed stationery, botanical still life, quiet art books, and refined brand systems photographed in natural light.

## Color

- `--color-ivory`: soft off-white foundation.
- `--color-paper`: warm paper surface for tactile editorial sections.
- `--color-rose`: muted blush for logo and key actions.
- `--color-sage`: soft sage for identity balance.
- `--color-olive`: olive grey for grounded surfaces.
- `--color-ink`: deep muted charcoal for readable text.
- `--color-line`: fine separators and rules.

Colors are written as OKLCH tokens in CSS. Ivory must not become pure white, rose must stay muted, sage must stay soft, and black should be replaced with charcoal.

## Typography

- Display and wordmark: `Bodoni Moda`, with Georgia fallback.
- Body and interface: `Manrope`, with system sans fallback.
- Arabic: `Noto Naskh Arabic`, with system Arabic fallbacks.

Headings use large editorial scale without negative letter spacing. Body copy remains readable and concise, with no tiny text and no broken Arabic letters.

## Layout

Desktop-first composition uses full-width editorial bands with large inner containers, asymmetrical grids, deliberate overlap, fine rules, and varied image ratios. Repeated identical card grids are avoided. Mobile remains a clean temporary fallback, not the final mobile art direction.

## Motion

Motion is calm and title-sequence inspired: intro reveal, text masks, subtle image scale, clip reveals, line drawing, restrained cursor labels, and smooth hover responses. All motion respects `prefers-reduced-motion`.

## Components

- `BrandMark`: temporary web implementation of the NB monogram, wordmark, descriptor, and botanical branch.
- `Intro`: first-session logo reveal with skip and reduced-motion handling.
- `Header`: minimal desktop navigation with language switcher and scroll refinement.
- `ProjectVisual`: file-based raster portfolio imagery renderer for local Behance-style demonstration presentations stored in `public/demo-projects`.
- `ArtFrame`: supporting studio/service atmosphere only. Do not use it as the primary visual for fictional project work.
- `Footer`: sage editorial footer with navigation, services, socials, and back to top.
- Pages use centralized content and project data for later replacement.
