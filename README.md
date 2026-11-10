# StudioCrea — website

Creative-studio website for **StudioCrea**, built with React + Vite, GSAP (ScrollTrigger + SplitText), Lenis smooth scroll and a custom WebGL brand shader.

## Scripts

| Command              | What it does                                   |
| -------------------- | ---------------------------------------------- |
| `npm run dev`        | Dev server on http://localhost:5173            |
| `npm run build`      | Production build → `dist/`                     |
| `npm run build:beta` | Build using `.env.beta`                        |
| `npm run preview`    | Serve the built `dist/` locally                |
| `npm run lint`       | ESLint                                         |

## Folder structure

```
.github/workflows   CI build (lint + build, uploads dist artifact)
lib/webgl           FieryRibs.js — raw-WebGL "fiery ribbed glass" brand shader
public              favicon, og-image, .htaccess (copied into dist on build)
src/
  assets/images     brand imagery (WebP)
  components        reusable UI: Button, RollText, RevealText, Marquee, Cursor, ArtCover, FieryCanvas…
  config            env + site settings (email, address, motion tokens)
  constants         routes, navigation, projects, services, locales (en / fr)
  features          page sections: home, about, projects, contact, menu, preloader, transition
  hooks             useLenis, useMagnetic, useApp, useMediaQuery, usePageTitle
  layout            MainLayout (app shell), SmoothScroll, Header, Footer
  pages             route components
  router            createBrowserRouter config
  services          api wrapper, contact + newsletter services
  utils             gsap registration, math, cn
  App.css           design tokens (brand colors, type, easing) + base styles
  i18n.js           i18next setup (EN / FR, auto-detected, switch in the menu)
```

Path aliases: `@`, `@lib`, `@assets`, `@components`, `@config`, `@constants`, `@features`, `@hooks`, `@layout`, `@pages`, `@services`, `@utils`.

## Brand colors (`src/App.css`)

| Token        | Hex       | Use                         |
| ------------ | --------- | --------------------------- |
| `--red`      | `#e8160a` | primary / accents / buttons |
| `--red-deep` | `#8f0a02` | shadows, gradients          |
| `--ember`    | `#ff6a13` | secondary accent            |
| `--amber`    | `#ffb347` | highlights                  |
| `--ink`      | `#140806` | dark sections, text         |
| `--paper`    | `#f5f0eb` | page background             |

## Editing content

- **Text** — `src/constants/locales/en.json` and `fr.json`
- **Projects** — `src/constants/projects.js` (add `image` for a real cover, or `art` colors for a generated one)
- **Contact details** — `src/config/site.js` and the `.env.*` files
- **Showreel video** — put `reel.mp4` in `public/` and set `REEL_SRC` in `src/features/home/ReelModal.jsx`
- **Forms** — `src/services/*`. In development they simulate success; in production they POST to `VITE_API_URL` (`/contact`, `/newsletter`).

## Deploying (Apache / cPanel)

Run `npm run build` and upload the contents of `dist/`. The `.htaccess` (included automatically from `public/`) rewrites all routes to `index.html` so deep links like `/projects/ember-coffee` work.
