@AGENTS.md

# Cineclub Butaca — Web

Sitio web para el cine-club Butaca. Muestra próximas funciones en carrusel y un calendario anual navegable. Las páginas de login, perfil, comunidad y funciones están vacías (trabajo futuro).

## Stack

- **Next.js 16.2.6** — App Router (no Pages Router)
- **React 19 / React DOM 19**
- **TypeScript 5** — strictMode habilitado; los archivos `.js` coexisten con `.ts/.tsx`
- **Tailwind CSS v4** — plugin: `@tailwindcss/postcss` (NO el `tailwind.config.js` clásico)
- **Framer Motion 12** — instalado, pendiente de uso
- **CSS Modules** — coexisten con Tailwind para estilos de componente

## Comandos

```bash
npm run dev      # servidor de desarrollo
npm run build    # build de producción
npm run lint     # ESLint (flat config, v9)
```

## Estructura

```
app/                      # App Router
  layout.tsx              # Layout raíz (fuente Inter, metadata, globals.css)
  page.js                 # Home: <ProxFuncionesSection> + <CalendarioClubSection>
  home/
    ProxFuncionesSection/ # Carrusel de próximas funciones
    CalendarioClubSection/# Calendario con 12 meses y scroll-snap
  community/ functions/ login/ profile/ signup/ singleMovie/  # vacíos

shared/
  ui/
    card/                 # Card, CardImage, CardText, CardDetails, CardsSection
    button/               # Button polimórfico (Link si hay href, button si no)
  components/
    icon/                 # Icon.js — carga SVGs desde /public/icons/
    section-title/        # SectionTitleIcon
    detailIcon/           # DetailIcon
    carrouselHandler/     # CarrouselHandler (prev/next + paginador)
  hooks/
    useCarousel.js        # activeIndex, navegación, scroll-into-view
    useMediaQuery.js      # listener de media query, retorna boolean

public/
  icons/                  # Convención: i-[nombre]-[variante].svg
  imgs/                   # Imágenes estáticas
```

## CSS

Estrategia híbrida:

1. **Tailwind v4** para utilidades (importado en `app/globals.css` con `@import "tailwindcss"`)
2. **CSS Modules** (`.module.css`) para estilos de componente con scope
3. **globals.css** para variables CSS, resets y tipografía base

Variables de color (definidas en `globals.css`):

- `--primary`: `#48250b` (marrón oscuro)
- `--secondary`: `#cad7e8` (azul grisáceo claro)
- `--white`: `#fff8f2` (crema)
- `--touchable`: `#0445af` (azul interactivo)

Breakpoint móvil: `max-width: 600px`

## Convenciones de componentes

- Carpeta por componente con archivo homónimo (ej. `Card/Card.js`)
- CSS Module junto al componente en la misma carpeta
- Path alias `@/` apunta a la raíz del proyecto
- No hay estado global — todo es local con `useState`/`useRef` o custom hooks

## Íconos

Usar el componente `<Icon>` de `shared/components/icon/Icon.js`.
Los SVGs deben guardarse en `/public/icons/` con el formato `i-[nombre]-[variante].svg`.

```jsx
<Icon name="search" variant="default" />
// carga /public/icons/i-search-default.svg
```
