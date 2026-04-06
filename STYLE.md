# UnPuppet — Guía de Estilo y Diseño

Documento de referencia para el equipo. Describe el objetivo, el sistema de diseño y la implementación visual de cada sección de la web de UnPuppet.

---

## Objetivo del Proyecto

UnPuppet es una extensión de navegador (disponible en la Chrome Web Store) cuyo propósito es ayudar a los usuarios a recuperar el control de su tiempo digital. La landing page tiene un único objetivo de conversión: **lograr que el usuario instale la extensión** desde el Chrome Web Store.

El tono de la página es directo, serio y empático. No se usa lenguaje de marketing vacío — se habla de psicología, cifras reales y herramientas concretas. El diseño refuerza este mensaje mediante una estética **oscura, minimalista y premium**.

---

## Stack de Tecnologías de Diseño

| Tecnología | Versión | Rol |
|---|---|---|
| **React + TypeScript** | 19 / ~5.9 | Framework base |
| **Vite** | 8 | Dev server y bundler |
| **Tailwind CSS v4** | `^4.2.2` | Sistema de utilidades de estilo (vía `@tailwindcss/vite`) |
| **Framer Motion** | `^12.38` | Animaciones declarativas y transiciones de entrada |
| **Lucide React** | `^1.7` | Iconografía consistente y ligera |
| **React Router DOM** | `^7.13` | Navegación entre páginas |

---

## Sistema de Diseño Global (`src/index.css`)

### Paleta de colores (CSS Custom Properties)

Toda la paleta se define como variables CSS en `:root` para garantizar consistencia entre colaboradores.

```css
--color-bg:              #050505   /* Fondo principal — negro casi puro */
--color-surface:         #0d0d0d   /* Superficie ligeramente más clara */
--color-surface-2:       #141414   /* Segunda capa de superficie */
--color-border:          rgba(255,255,255,0.07)   /* Borde sutil */
--color-border-bright:   rgba(255,255,255,0.15)   /* Borde más visible */
--color-text-primary:    #ffffff   /* Texto principal — blanco puro */
--color-text-secondary:  #c0c0c0  /* Texto secundario — gris claro */
--color-text-muted:      #8a8a8a  /* Texto auxiliar — gris medio */
--color-accent:          #ffffff   /* Acento (blanco, sin color de marca) */
--color-glass-bg:        rgba(255,255,255,0.04)   /* Fondo tipo vidrio */
--color-glass-border:    rgba(255,255,255,0.08)   /* Borde tipo vidrio */
```

> **Regla de oro:** la paleta es monocromática. No existen colores de marca (azul, verde, etc.). El único "color" es el blanco contra negro. Esto es intencional y define la identidad visual.

### Tipografía

- **Familia:** `'Inter'`, `'SF Pro Display'`, `system-ui`, `-apple-system`, `sans-serif`
- **Anti-aliasing:** activado con `-webkit-font-smoothing: antialiased`
- **Escala de tamaños:** se usa `clamp()` para responsividad fluida sin breakpoints en los títulos grandes:
  - Hero H1: `clamp(3rem, 9vw, 7.5rem)`
  - H2 de secciones: `clamp(2rem, 5vw, 4.5rem)`
- **Letter-spacing** negativo en headings: `-0.035em` a `-0.04em` para el efecto de display compacto y de alta calidad.

### Clases utilitarias personalizadas

Además de las utilidades de Tailwind, se definen clases reutilizables en `@layer utilities`:

#### `.glass`
Efecto glassmorphism. Fondo semitransparente + `backdrop-filter: blur(20px)` + borde sutil. Al hacer hover, el elemento sube 2px y se ilumina levemente.

```css
background: rgba(255,255,255,0.04);
border: 1px solid rgba(255,255,255,0.08);
backdrop-filter: blur(20px);
transition: transform 0.3s, border-color 0.3s, box-shadow 0.3s;
```

#### `.glass-bright`
Variante más luminosa del glassmorphism para elementos destacados.

#### `.text-gradient` / `.text-gradient-bright`
Gradientes de texto de gris a blanco, usando `background-clip: text`. Crea el efecto de texto que "emerge" de las sombras.

#### `.text-shimmer`
Variante del gradiente con rango más amplio (`#777` → `#ccc` → `#fff`) para los títulos principales.

#### `.text-glow`
`text-shadow` blanco para resaltar palabras clave dentro de un título (efecto "palabra brillante").

#### `.noise`
Pseudoelemento `::before` con un SVG de ruido fractal (`opacity: 0.03`) para añadir textura sutil a superficies.

#### `.section-padding`
Espaciado vertical consistente entre secciones: `8rem` vertical en móvil, `10rem` en desktop.

#### `.glow-line`
Línea separadora entre secciones: gradiente horizontal de `transparent → rgba(255,255,255,0.3) → transparent`, altura `1px`. Genera la ilusión de luz emitida entre secciones.

#### `.btn-primary`
Botón sólido blanco con texto negro. `border-radius: 9999px` (completamente redondeado). Pseudoelemento `::after` oscurece el fondo al hacer hover. Eleva el botón 1px y agrega `box-shadow` blanco en hover.

#### `.btn-ghost`
Botón fantasma con borde semitransparente. Texto en gris que se vuelve blanco al hover. Fondo casi invisible que aparece al hover.

---

## Estructura de Páginas y Rutas

```
/           → Home (landing page)
/contact    → Contacto
/privacy    → Política de Privacidad
/terms      → Términos de Servicio
*           → 404 Not Found
```

La Navbar y el Footer son **componentes compartidos** en `src/shared/`.

---

## Componente: Navbar (`src/shared/Navbar.tsx`)

### Objetivo
Navegación persistente fija en la parte superior. Dirige al usuario a las distintas secciones de la home y al Chrome Web Store.

### Comportamiento de scroll
- **Estado inicial:** fondo transparente, sin borde.
- **Tras 40px de scroll:** fondo `rgba(5,5,5,0.85)` + `backdrop-blur-xl` + borde inferior sutil. Se implementa con un listener de scroll y `useState`.

### Animación de entrada (Framer Motion)
```ts
initial={{ y: -20, opacity: 0, filter: 'blur(10px)' }}
animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
transition={{ duration: 1.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
```
La navbar aparece deslizándose suavemente desde arriba con un desenfoque que se disipa.

### Menú móvil (hamburger)
- Se anima con `AnimatePresence` de Framer Motion.
- Las tres líneas del icono se transforman en una X usando `transform` de CSS puro.
- El menú desplegable aparece con `height: 0 → auto` animado.

### Iconografía
No usa Lucide. Las líneas del hamburger son `<span>` con CSS.

### Links de navegación
- Problem, Solution, How it works, Benefits → anclas de secciones en la home.
- CTA "Get Extension" → botón `.btn-primary` que abre el Chrome Web Store en nueva pestaña.

---

## Sección 1: Hero (`HeroSection.tsx`)

### Objetivo
Primera impresión. Comunicar en menos de 3 segundos qué es UnPuppet y por qué instalarlo. Capturar el scroll del usuario hacia abajo.

### Layout
- Pantalla completa (`min-height: 100vh`), centrada vertical y horizontalmente.
- Máximo de contenido: `max-w-4xl`.

### Efectos de fondo
1. **Radial glow superior:** `radial-gradient(ellipse 70% 50% at 50% 0%, rgba(255,255,255,0.045), transparent)` — luz que emana desde arriba.
2. **Grid sutil:** cuadrícula de `60px × 60px` con líneas de 1px en blanco al 2.5% de opacidad, enmascarada por un gradiente radial para que desaparezca en los bordes.

### Animación de entrada (Framer Motion)
Se usa el patrón `container / item` con `staggerChildren`:

```ts
container: { staggerChildren: 0.25, delayChildren: 0.4 }
item: { opacity: 0→1, y: 28→0, filter: 'blur(12px)→blur(0px)', duration: 1.6 }
```

Los elementos aparecen en orden: Badge → H1 → Párrafo → CTAs → Stats.

### Palabra rotatoria (TypeScript vanilla)
El H1 dice **"Stop being [palabra]."**. La palabra cambia cada 2.2 segundos entre: `distracted`, `manipulated`, `consumed`, `addicted`, `lost`. La transición es fade-out + translateY hacia abajo, luego fade-in desde arriba. Implementado con `useRef` y `setTimeout` (sin Framer).

### Iconografía (Lucide)
- `<Download />` en el botón CTA primario.
- `<ChevronDown />` en el indicador de scroll animado (bounce infinito).

### Detección de navegador
El hook `useBrowserDetection` detecta si el usuario está en Chrome, Firefox, Edge, etc. y adapta el texto del CTA.

### Stats de credibilidad
Tres micro-stats bajo los botones: **$0 Cost · Instant Setup · 100% Private**. Sin bordes, solo texto bold + label.

### Indicador de scroll
`<ChevronDown>` animado con `animate={{ y: [0, 6, 0] }}` en loop infinito. Aparece con delay de 1.4s. Posición absoluta en la parte inferior de la sección.

---

## Sección 2: Problem (`ProblemSection.tsx`)

### Objetivo
Crear urgencia y empatía mostrando el impacto real del problema de la distracción digital.

### Activación por scroll (Framer Motion `useInView`)
Todas las animaciones de esta sección se disparan cuando el elemento entra en el viewport con `margin: "-100px"` (se activan antes de que el elemento sea completamente visible). Solo se reproducen **una vez** (`once: true`).

### Headline
Usa la combinación `.text-gradient-bright` + `.text-glow`:
- `"Your attention is a"` → gris a blanco (gradiente)
- `"product"` → blanco brillante con `text-shadow`

### Stats grid
3 tarjetas en columna (móvil) / fila de 3 (desktop). Clase `.glass` con `border-radius: 1rem`. Cada tarjeta muestra:
- **Valor grande** (ej. `"2.5h"`) en `text-4xl font-black`
- **Label** en gris medio
- **Descripción corta** en gris muted

### Visualización del Algoritmo (`AlgorithmLoop`)
Componente SVG + HTML híbrido. Un anillo orbital con 5 nodos ("Open app", "Scroll", "Like", "Dopamine", "Repeat") posicionados en ángulos equidistantes (72°). Cada nodo pulsa con `animate={{ scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }}` con delay escalonado. El centro tiene un círculo que respira. El SVG dibuja el anillo y líneas de conexión.

---

## Sección 3: Solution (`SolutionSection.tsx`)

### Objetivo
Presentar UnPuppet como la respuesta directa al problema planteado. Mostrar las funcionalidades clave.

### Layout
Grid de 2 columnas en desktop: texto a la izquierda, tarjetas de features a la derecha.

### Headline
- `"Cut the strings."` y `"Own your"` → `.text-gradient-bright`
- `"day"` → `.text-glow`

### Features (2×2 grid)
4 tarjetas con clase `.glass`. Cada tarjeta tiene:
- Icono en contenedor cuadrado redondeado (`.rounded-xl`), escala al 110% en hover del grupo.
- Título en blanco (`text-sm font-semibold`)
- Descripción en gris secundario (`text-sm`)

**Iconografía Lucide usada:**
| Feature | Icono |
|---|---|
| Smart Site Blocking | `<ShieldBan />` |
| Focus Timer | `<Timer />` |
| Strict Mode | `<Lock />` |
| Zero Data Collection | `<EyeOff />` |

Todos con `strokeWidth={1.3}` para una línea más delgada y elegante.

### Animación
Entrada escalonada con `delay: 0.2 + i * 0.1`. Las tarjetas también escalan de `0.97 → 1` al entrar.

---

## Sección 4: How It Works (`HowItWorksSection.tsx`)

### Objetivo
Reducir la fricción de instalación explicando el proceso en 3 pasos simples.

### Header centrado
Título: `"Three steps to"` (gradiente) + `"focus"` (glow).

### Steps grid (3 columnas en desktop)
Cada paso tiene una tarjeta `.glass` con:
- **Badge numérico** en `font-mono` (`01`, `02`, `03`) con borde sutil.
- **Ícono** en contenedor cuadrado, escala al 110% en hover de grupo.
- **Título** `text-lg font-semibold`
- **Descripción** `text-sm`

**Iconografía Lucide:**
| Paso | Icono |
|---|---|
| 01 — Install | `<Download />` |
| 02 — Add distractions | `<PlusSquare />` |
| 03 — Reclaim focus | `<ShieldCheck />` |

**Línea conectora (desktop):** línea horizontal absoluta de 1px con gradiente de opacidad, posicionada sobre los íconos para dar sensación de flujo.

### Mockup de navegador
Bloque `.glass` que simula una ventana de navegador:
- **Chrome decorativo:** tres círculos de opacidades decrecientes + barra de URL con `instagram.com` en `font-mono`.
- **Página bloqueada:** ícono `<X />` centrado, texto `"Site blocked by UnPuppet"`.

Este componente es totalmente estático pero visualmente comunica el funcionamiento del producto de manera inmediata.

---

## Sección 5: Benefits (`BenefitsSection.tsx`)

### Objetivo
Reforzar el valor del producto con beneficios tangibles agrupados por categoría, más prueba social con testimonios.

### Benefits grid (3 tarjetas)
Cada tarjeta `.glass` representa una categoría:
- **Productivity**
- **Mental Clarity**
- **Digital Wellbeing**

Dentro de cada una, lista de items con un bullet custom: círculo pequeño con borde sutil y punto interior blanco.

**Iconografía:** no hay ícono de Lucide en las tarjetas de beneficios (el punto visual es el bullet custom).

### Testimonials grid (3 tarjetas)
Tarjetas `.glass` con:
- **5 estrellas:** `<Star />` de Lucide con `fill="rgba(255,255,255,0.5)"` y `strokeWidth={0}`.
- **Cita** en itálicas implícitas, gris al 60%.
- **Nombre** blanco, `text-sm font-medium`.
- **Rol** gris muted, `text-xs`.

---

## Sección 6: Final CTA (`FinalCtaSection.tsx`)

### Objetivo
Último empuje hacia la conversión. Resumir la propuesta de valor en un titular impactante y reiterar que es gratuito.

### Fondo
Radial glow invertido (desde el fondo de la sección, no desde arriba): `radial-gradient(ellipse 60% 80% at 50% 100%, rgba(255,255,255,0.04), transparent)`. Crea un efecto de escenario iluminado.

### Badge superior
Pill redondeado con el texto `"Free forever. No account. No data sharing."` — refuerza la eliminación de barreras.

### Headline
`"Your time"` / `"belongs to"` → `.text-gradient-bright`, `"you"` → `.text-glow`. Tamaño máximo: `6rem`.

### Botón CTA grande
`.btn-primary` con `padding: 1rem 2.5rem` (más grande que el estándar). Icono `<Download />` de Lucide.

### Trust signals
Fila de 4 indicadores con ícono + texto:

| Ícono Lucide | Texto |
|---|---|
| `<Lock />` | 100% Private |
| `<Zap />` | 30s Setup |
| `<Globe />` | [nombre del navegador detectado] |
| `<Sparkles />` | No account needed |

Todos con `strokeWidth={1.3}`, color gris muted, alineados en flex-wrap centrado.

---

## Componente: Footer (`src/shared/Footer.tsx`)

### Objetivo
Cierre institucional. Links a Privacy, Terms y Contact. Copyright dinámico.

### Animación
`whileInView={{ opacity: 1 }}` con `viewport={{ once: true }}` — aparece cuando entra en vista.

### Links
Usa `react-router-dom <Link>` para navegación interna. Hover cambia de `--color-text-muted` a `--color-text-secondary` mediante `onMouseEnter/Leave`.

---

## Página: Contact (`src/features/contact/index.tsx`)

### Objetivo
Canal de soporte minimalista. No hay formulario; se dirige al usuario a escribir un email directamente.

### Layout
Central, `max-w-xl`, flex vertical centrado con la Navbar y el Footer de shared.

### Animación de entrada
`initial={{ opacity: 0, y: 20 }} → animate={{ opacity: 1, y: 0 }}` — simple y limpia.

### Contenido
Tarjeta `.glass` con:
- Ícono `<Mail />` de Lucide en contenedor cuadrado.
- Título `"Email Us"`.
- Descripción de tiempo de respuesta (24-48h).
- Botón `.btn-primary` con el email como texto (`hello@unpuppet.app`).
- Footer interno con nota de soporte separado por borde.

---

## Páginas Legales (`Privacy.tsx` / `Terms.tsx`)

### Objetivo
Cumplimiento legal. Diseño neutro que no distrae.

### Estilo
Texto largo en columna `max-w-3xl`. Sin animaciones elaboradas. Tipografía `leading-relaxed`. Separadores con `glow-line`.

---

## Patrones de Animación Recurrentes

### Patrón 1 — Entrada staggered (Hero)
```ts
// Container: staggerChildren + delayChildren
// Item: opacity+y+filter
transition: { duration: 1.6, ease: [0.22, 1, 0.36, 1] }
```
La curva `[0.22, 1, 0.36, 1]` es una cubic-bezier de tipo "ease out exponencial" — arranca rápido y desacelera suavemente. Se usa en todos los títulos principales.

### Patrón 2 — Entrada por scroll (secciones)
```ts
useInView(ref, { once: true, margin: "-80px" })
// Luego: animate={inView ? { opacity: 1, y: 0 } : {}}
```
Se activa antes de que el elemento sea completamente visible. `once: true` garantiza que no se repita al hacer scroll arriba.

### Patrón 3 — Delay escalonado en grids
```ts
transition={{ delay: 0.2 + i * 0.1 }}  // Problem stats, Solution features
transition={{ delay: 0.2 + i * 0.12 }} // Benefits categories
transition={{ delay: 0.2 + i * 0.15 }} // How it works steps
```
Cada tarjeta del grid entra con un pequeño delay adicional para dar sensación de cascada.

### Patrón 4 — Loop infinito (elementos vivos)
```ts
animate={{ y: [0, 6, 0] }}           // Scroll hint (ChevronDown)
animate={{ scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }} // AlgorithmLoop nodes
```
Sutiles, no invasivos. Comunican "algo está vivo aquí" sin distraer.

---

## Convenciones de Código para el Equipo

1. **Variables CSS sobre valores hard-coded:** usar `var(--color-text-primary)` en lugar de `#ffffff` siempre que corresponda a un token del sistema.
2. **`strokeWidth={1.3}` en Lucide:** es el grosor estándar del proyecto. No usar `strokeWidth={2}` (demasiado grueso) salvo excepciones justificadas.
3. **Ease curve estándar:** `[0.22, 1, 0.36, 1]` para animaciones importantes. `"easeInOut"` para loops.
4. **`font-black` para headings:** peso 900. No usar `font-bold` (700) en títulos principales.
5. **Glassmorphism vía `.glass`:** no repetir los estilos de glassmorphism manualmente. Usar la clase utilitaria.
6. **`section-padding` para consistencia de espaciado:** todas las secciones usan esta clase para mantener el ritmo vertical.
7. **`glow-line` al top de cada sección:** separador visual estándar entre secciones. Es un elemento `<div className="glow-line absolute top-0 left-0 right-0" />`.
