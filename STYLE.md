# 🎨 Guía de Estilo — Zagua Grooming

Esta guía define el lenguaje visual de **Zagua Grooming**, un negocio de servicios de grooming (peluquería y cuidado de mascotas). El estilo es **tarjetas suaves y planas** sobre un lienzo claro con un velo de color difuso: superficies blancas sólidas, esquinas muy redondeadas y sombras suaves teñidas de tinta. Transmite frescura, higiene y cariño. La interfaz está pensada **mobile first**, con barra de navegación inferior y botón flotante en móvil.

**Principios rectores:**
- **Mobile First** — se diseña primero para móvil (incluida la barra inferior con FAB) y se escala hacia desktop (`md:`, `lg:`).
- **Superficies planas y suaves** — tarjetas `bg-surface` (blanco sólido), esquinas `rounded-2xl`/`rounded-3xl` y sombras tenues teñidas de tinta. **No** se usa glassmorphism en el contenido; el desenfoque (`backdrop-blur`) se reserva para las barras fijas (header y nav inferior).
- **Teal como acción principal** — el **teal** (`#2db3ac`) es el color de acción primaria: botones principales, FAB, estados activos, precios e íconos. El **rosado** (`#f76fa8`) es el acento secundario: CTA de confirmación, acciones destructivas (cancelar) y badges suaves.
- **Tokens semánticos** — los colores se consumen por su rol (`surface`, `canvas`, `ink`, `line`, `chip`, `teal`, `pink`…), no por su valor. Definidos con `@theme` en `index.css`.
- **Movimiento intencional** — animaciones discretas con Framer Motion y keyframes propios (`popIn`, `floatBub`, `fadeInUp`, `shimmer`) que guían, no distraen.
- **Iconografía de línea** — los íconos provienen de **Lucide** (SVG). Los logos de marca del footer son **SVG inline** (Simple Icons). Se evitan los emojis en la interfaz.

---

## 🎨 Paleta de colores

Todos los colores se declaran como tokens en `frontend/src/index.css` dentro de un bloque `@theme`, por lo que en el markup se usan como clases utilitarias de Tailwind (`bg-teal`, `text-ink-soft`, `border-line`…).

### Acentos
| Token | HEX | Uso |
|-------|-----|-----|
| `teal`      | `#2db3ac` | **Acción principal**: botones primarios, FAB, chips activos, precios, íconos. |
| `teal-deep` | `#1e8f8a` | Texto/íconos teal sobre fondos claros (versión legible). |
| `teal-soft` | `#e4f6f5` | Fondos suaves: tiles de ícono, badges, toasts de éxito, estados activos. |
| `teal-mist` | `#eaf6f9` | Fondos aún más tenues: pistas de tabs/segmented, botones secundarios. |
| `pink`      | `#f76fa8` | Acento secundario: CTA de confirmación, FAB alterno. |
| `pink-deep` | `#e25490` | Texto/íconos rosados sobre claro, mensajes de error, enlaces "ver todos". |
| `pink-soft` | `#fde7f1` | Fondos suaves rosados: badges, botón "Reservar", acciones de cancelar. |

### Superficies y texto
| Token | HEX | Uso |
|-------|-----|-----|
| `surface`     | `#ffffff` | Tarjetas, inputs, modales, píldoras activas. |
| `canvas`      | `#fafdfd` | Fondo base de la app, header y nav inferior. |
| `canvas-deep` | `#e6f2f5` | Variante de fondo más saturada (detalles). |
| `ink`         | `#28424c` | Texto principal, encabezados. |
| `ink-soft`    | `#7a949d` | Texto secundario, descripciones, labels, íconos inactivos. |
| `ink-faint`   | `#a9bfc7` | Texto terciario, placeholders, nav inactiva, notas al pie. |
| `line`        | `#e3eef1` | Bordes de tarjetas e inputs. |
| `line-soft`   | `#edf4f6` | Divisores, bordes de barras fijas, base de skeletons. |
| `chip`        | `#f1f7f9` | Fondo de chips informativos (p. ej. "45 min"). |

### Compat de marca (legacy)
Para no romper código previo se conservan tokens antiguos que apuntan a la paleta nueva:
`brand-teal` `#2db3ac`, `brand-teal-light` `#e4f6f5`, `brand-pink` `#f76fa8`, `brand-pink-light` `#fde7f1`, `brand-pink-deep` `#e25490`.

> En componentes nuevos usá los tokens semánticos (`teal`, `pink`, `surface`…), no los `brand-*`.

### Jerarquía del color
| Rol | Token | Ejemplo en la UI |
|-----|-------|------------------|
| Acción principal (relleno) | `bg-teal text-white` | "Agendar cita", "Crear cuenta", "Continuar", FAB. |
| Acción secundaria (suave) | `bg-teal-mist text-teal-deep` | "Ver servicios", "Reprogramar". |
| CTA de confirmación | `bg-pink text-white` | "Confirmar cita" (último paso del wizard). |
| Acción suave / destructiva | `bg-pink-soft text-pink-deep` | "Reservar", "Cancelar". |
| Texto de acento legible | `text-teal-deep` / `text-pink-deep` | Enlaces, totales, mensajes. |
| Éxito | `text-teal-deep` + `bg-teal-soft` | Toast "Mascota actualizada", mensaje de cuenta creada. |
| Error | `text-pink-deep` + `bg-pink-soft` | "No se pudieron cargar los servicios" (Login usa `text-red-600`). |

---

## 🌫️ Fondo de la app

El `body` es un lienzo claro (`#fafdfd`) con **dos círculos de gradiente difusos** —teal arriba-izquierda y rosado abajo-derecha— fijos al viewport:

```css
body {
  background-color: #fafdfd;
  background-image:
    radial-gradient(620px circle at 8% 12%, rgba(45, 179, 172, 0.22), transparent 60%),
    radial-gradient(640px circle at 92% 88%, rgba(247, 111, 168, 0.20), transparent 62%);
  background-attachment: fixed;
  background-repeat: no-repeat;
}
```

Las tarjetas blancas (`bg-surface`) flotan sobre este velo. Placeholder global en `#a9bfc7` (`ink-faint`).

---

## 🔤 Tipografía

Dos familias de Google Fonts, importadas al inicio de `index.css`:

- **Display — `Baloo 2`** (`500/600/700`): títulos, precios, números destacados. Se aplica con la clase `.font-display` o el token `font-display`. Redondeada y amigable.
- **Sans — `Figtree`** (`400/500/600/700`): fuente por defecto del documento (`:root`). Texto de interfaz y cuerpo.

```html
<h1 class="font-display text-2xl sm:text-3xl font-semibold text-ink">Bienvenido de vuelta</h1>
<p class="text-sm text-ink-soft">Iniciá sesión para ver tus citas.</p>
```

**Escala observada (Mobile First):**

| Elemento | Móvil | Desktop | Familia / Peso |
|----------|-------|---------|----------------|
| Hero H1 | `text-3xl` | `sm:text-5xl` | display · `font-semibold` |
| Título de página (H1) | `text-2xl` | `sm:text-4xl` | display · `font-semibold` |
| Título de sección (H2) | `text-xl` | — | display · `font-semibold` |
| Nombre de tarjeta | `text-[15px]` | — | sans · `font-bold` |
| Precio | `text-base`/`text-xl` | — | display · `font-bold` · `text-teal` |
| Cuerpo | `text-sm` | — | sans · `400/500` |
| Caption / nota | `text-xs` · `text-[11px]` | — | sans · `text-ink-faint` |

---

## 🧱 Superficies, radios y sombras

- **Tarjeta estándar:** `bg-surface rounded-2xl p-4` + sombra suave teñida de tinta:
  `shadow-[0_4px_14px_rgba(36,80,90,0.06)]`.
- **Variantes de sombra:** héroe `shadow-[0_6px_24px_rgba(36,80,90,0.08)]`, resumen `shadow-[0_4px_16px_rgba(36,80,90,0.07)]`, historial (más leve) `shadow-[0_3px_10px_rgba(36,80,90,0.04)]`. La sombra **siempre** es tinta (`rgba(36,80,90,…)`) translúcida, nunca negra dura.
- **Sombras de color** en botones: `shadow-lg shadow-teal/40`, `shadow-md shadow-teal/35`, `shadow-lg shadow-pink/40`.
- **Radios:**
  - Botones, chips, píldoras, avatares, FAB → `rounded-full`
  - Héroe, tarjetas grandes, modales → `rounded-3xl`
  - Tarjetas estándar, inputs → `rounded-2xl`
  - Tiles de ícono pequeños → `rounded-xl`
- **Espaciado:** sistema de Tailwind en múltiplos de `4px`. Separación vertical típica con `space-y-5` / `gap-3`.

---

## 🧩 Componentes

### Botón primario (teal sólido)
```html
<button class="bg-teal text-white rounded-full py-3.5 text-sm font-bold
               shadow-lg shadow-teal/40 active:scale-95
               hover:-translate-y-0.5 transition-transform">
  Agendar cita
</button>
```

### Botón secundario (teal suave)
```html
<button class="bg-teal-mist text-teal-deep rounded-full px-6 py-3 text-sm font-bold
               hover:bg-teal-soft transition-colors">
  Ver servicios
</button>
```

### CTA de confirmación (rosado sólido)
```html
<button class="bg-pink text-white rounded-full py-4 text-sm font-bold
               shadow-lg shadow-pink/40 active:scale-95
               hover:-translate-y-0.5 transition-transform">
  Confirmar cita
</button>
```

### Acción suave / destructiva (rosado suave)
```html
<button class="bg-pink-soft text-pink-deep rounded-full px-4 py-2 text-xs font-bold
               active:scale-95 hover:-translate-y-0.5 transition-transform">
  Reservar
</button>
```

### Tabs tipo píldora (segmented)
Contenedor `bg-teal-mist`, pestaña activa en blanco con sombra:
```html
<div class="w-full bg-teal-mist rounded-full p-1 flex gap-1">
  <button class="flex-1 rounded-full py-2.5 text-sm font-bold bg-surface text-teal-deep shadow-sm">
    Próximas
  </button>
  <button class="flex-1 rounded-full py-2.5 text-sm font-bold text-ink-soft">
    Historial
  </button>
</div>
```

### Chips de categoría (scroll horizontal)
Activo en teal sólido; inactivo en superficie con borde:
```html
<div class="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
  <button class="flex-shrink-0 rounded-full px-4 py-2 text-sm font-semibold border
                 bg-teal text-white border-teal shadow-md shadow-teal/35">Todos</button>
  <button class="flex-shrink-0 rounded-full px-4 py-2 text-sm font-semibold border
                 bg-surface text-ink-soft border-line
                 hover:border-teal-deep hover:text-teal-deep">Baños</button>
</div>
```

### Tarjeta de servicio
```html
<article class="bg-surface rounded-2xl p-4 shadow-[0_4px_14px_rgba(36,80,90,0.06)]
                flex gap-3 items-center animate-fade-in">
  <div class="w-12 h-12 rounded-2xl bg-teal-soft text-teal-deep grid place-items-center flex-shrink-0">
    <Droplets class="w-5 h-5" strokeWidth={2} />
  </div>
  <div class="flex-1 min-w-0">
    <h3 class="font-bold text-ink text-[15px] truncate">Baño completo</h3>
    <p class="text-[12.5px] text-ink-soft line-clamp-2">…</p>
    <div class="flex items-center gap-2 mt-1.5">
      <span class="text-xs text-ink-soft bg-chip rounded-full px-2.5 py-0.5">45 min</span>
      <span class="font-display text-base font-bold text-teal">₡8.000</span>
    </div>
  </div>
  <a class="rounded-full bg-pink-soft text-pink-deep px-4 py-2 text-xs font-bold">Reservar</a>
</article>
```

### Tile de ícono
Cuadrado redondeado con fondo de acento suave e ícono Lucide en el tono profundo:
```html
<div class="w-11 h-11 rounded-2xl bg-teal-soft text-teal-deep grid place-items-center">
  <PawPrint class="w-5 h-5" strokeWidth={2} />
</div>
<!-- variante rosada: bg-pink-soft text-pink-deep -->
```

### Input
Borde `line`, foco que **cambia el borde a teal** (sin ring):
```html
<input class="rounded-2xl border border-line bg-surface px-4 py-3.5 text-sm
              focus:outline-none focus:border-teal"
       placeholder="Correo electrónico" />
```
> En formularios sobre tarjeta (p. ej. editar mascota) el fondo del input es `bg-canvas`.

### Precio (formato CRC)
Siempre en colones, fuente display, color teal:
```tsx
<span className="font-display text-base font-bold text-teal">
  ₡{Number(price ?? 0).toLocaleString("es-CR")}
</span>
```

### Botón "agregar" (borde discontinuo)
```html
<a class="w-full border-2 border-dashed border-teal/45 text-teal-deep
          rounded-2xl p-3.5 text-sm font-bold block text-center
          hover:bg-teal-soft transition-colors">
  + Registrar otra mascota
</a>
```

### Skeletons de carga (shimmer)
Bloque base con barrido luminoso; existen variantes `ServiceCardSkeleton`, `ServiceRowSkeleton`, `PetCardSkeleton`.
```tsx
<div className="relative overflow-hidden bg-line-soft rounded-md">
  <div className="absolute inset-0 -translate-x-full
                  bg-gradient-to-r from-transparent via-surface/70 to-transparent
                  animate-shimmer" />
</div>
```

### Toast de éxito
```html
<div class="bg-teal-soft text-teal-deep rounded-2xl px-4 py-3 text-sm font-semibold">
  Mascota actualizada
</div>
```

### Modal (overlay + spring)
```tsx
<motion.div className="fixed inset-0 bg-ink/45 grid place-items-center z-50 px-7" …>
  <motion.div
    initial={{ scale: 0.6, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ type: "spring", bounce: 0.4, duration: 0.4 }}
    className="w-full max-w-sm bg-surface rounded-3xl p-6 text-center"
  >
    …
  </motion.div>
</motion.div>
```

---

## 🧭 Navegación

### Header (fijo, con desenfoque)
Única superficie que usa `backdrop-blur`. Enlaces tipo píldora; el activo va en `teal-soft`.
```html
<header class="fixed top-0 inset-x-0 z-40 bg-canvas/85 backdrop-blur-xl border-b border-line-soft">
  <!-- NavLink activo -->
  <a class="px-3 py-2 rounded-full text-sm font-semibold bg-teal-soft text-teal-deep">Servicios</a>
  <!-- NavLink inactivo -->
  <a class="px-3 py-2 rounded-full text-sm font-semibold text-ink-soft
            hover:text-teal-deep hover:bg-teal-mist">Mascotas</a>
</header>
```
El avatar de login (arriba a la derecha) es el **único uso del degradado** `bg-gradient-to-br from-teal to-pink`, con un punto de estado y `ring-2 ring-surface`.

### Barra inferior + FAB (solo móvil)
`md:hidden`, fija abajo, 5 columnas con el FAB teal elevado en el centro (→ `/book`). Respeta `env(safe-area-inset-bottom)`.
```html
<nav class="md:hidden fixed bottom-0 inset-x-0 z-40 bg-canvas/92 backdrop-blur-xl border-t border-line-soft">
  <button class="w-14 h-14 rounded-full bg-teal text-white -mt-7 shadow-lg shadow-teal/45 grid place-items-center">
    <Plus class="w-6 h-6" strokeWidth={2.4} />
  </button>
  <!-- NavItem activo: text-teal-deep · inactivo: text-ink-faint -->
</nav>
```
El `<main>` lleva `pt-20 pb-28 md:pb-12` para dejar espacio a las barras. El footer solo se muestra en `/` (home).

### Asistente de reserva (wizard)
`/book` es un flujo de 4 pasos (servicio → mascota → fecha/hora → confirmar) más pantalla de éxito. Barra de progreso con segmentos `flex-1 h-1.5 rounded-full`: completados en `bg-teal`, pendientes en `bg-line-soft`. Transiciones entre pasos con `AnimatePresence mode="wait"` (deslizamiento horizontal).

---

## ✨ Animaciones

Combinación de **Framer Motion** (en componentes) y **keyframes CSS** (en `index.css`).

### Entrada de secciones (Framer Motion)
Patrón repetido en casi todas las páginas:
```tsx
<motion.section
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.35 }}
>
  …
</motion.section>
```

### Keyframes propios (`index.css`)
| Nombre | Clase | Uso |
|--------|-------|-----|
| `fadeInUp` | `.animate-fade-in` | Aparición suave de contenido recién cargado (tarjetas de servicio con `animationDelay` escalonado). |
| `shimmer` | `.animate-shimmer` | Barrido de los skeletons de carga. |
| `popIn` | (inline `animation`) | Check de confirmación, modales (escala con rebote). |
| `floatBub` | (inline `animation`) | Burbujas decorativas del héroe que flotan. |
| `screenIn`, `toastIn` | — | Entradas de pantalla/toast heredadas del diseño. |

### Microinteracciones
- Botones: `active:scale-95` y, en primarios, `hover:-translate-y-0.5 transition-transform`.
- Tarjetas de acceso rápido: `hover:-translate-y-1 hover:shadow-lg transition-all`.

**Guías de movimiento:** duraciones `0.2s`–`0.5s`, nada lento; respetar `prefers-reduced-motion`.

---

## 🔣 Iconografía

- **Lucide React** para toda la iconografía de interfaz. Estilo de línea consistente.
  - Tamaños: `w-4 h-4` (inline), `w-5 h-5` (botones/nav), `w-6 h-6` (FAB).
  - `strokeWidth` entre `2` y `2.4`.
  - Color heredado del contenedor (p. ej. tile `text-teal-deep`).
  - Íconos del dominio en uso: `PawPrint`, `Scissors`, `CalendarHeart`, `Droplets`, `Sparkles`, `Plus`, `Check`, `Repeat`, `User`, `ArrowRight`, `ArrowLeft`, `MapPin`, `Phone`, `Mail`, `Clock`, `AlertCircle`, `Home`.
- **Logos de marca (footer):** SVG **inline** con los paths oficiales de Simple Icons (Facebook, Instagram, WhatsApp). Botón circular `bg-teal-mist text-teal-deep` que al hover toma el color de cada marca y `text-white`.

```tsx
import { PawPrint } from "lucide-react";
<PawPrint className="w-5 h-5 text-teal-deep" strokeWidth={2} />
```

> Se evitan los emojis en la interfaz; la iconografía vive en Lucide y en los SVG de marca.

---

## ♿ Accesibilidad

- **Contraste de texto:** para texto de acento sobre claro usá los tonos *deep* (`text-teal-deep`, `text-pink-deep`), no `teal`/`pink` plenos ni los tonos *soft*. Reservá `teal`/`pink` para rellenos sólidos (con texto blanco), e íconos/badges para los *soft*.
- **Texto secundario:** `ink-soft`; terciario/placeholder: `ink-faint`. No bajar de ahí para texto legible.
- **Áreas táctiles** de al menos `44×44px` en móvil (botones de nav e íconos cumplen con `w-11 h-11` / `w-14 h-14`).
- **`aria-label`** en botones de solo ícono (avatar de login, FAB, atrás, sociales) y `alt` en imágenes.
- Foco visible: el borde del input cambia a `teal` en `:focus`.

---

## 📱 Breakpoints (Tailwind, Mobile First)

| Prefijo | Ancho mínimo | Dispositivo |
|---------|--------------|-------------|
| (base)  | `0px`   | Móvil (diseño inicial, con barra inferior + FAB) |
| `sm`    | `640px` | Móvil grande |
| `md`    | `768px` | Tablet (aparece nav del header; se oculta la barra inferior) |
| `lg`    | `1024px`| Desktop |
| `xl`    | `1280px`| Desktop grande |

Diseñá siempre primero la versión móvil y añadí variantes hacia arriba (`md:`, `lg:`). El contenedor principal se centra con `mx-auto max-w-6xl px-4 sm:px-6`.
