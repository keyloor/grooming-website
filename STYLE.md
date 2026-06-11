# 🎨 Guía de Estilo — Zagua Grooming

Esta guía define el lenguaje visual de **Zagua Grooming**, un negocio de servicios de grooming (peluquería y cuidado de mascotas). El estilo principal es **Glassmorphism** (vidrio esmerilado), con una paleta limpia basada en **blanco**, **celeste** y **rosado** — los colores del logo — transmitiendo frescura, higiene y cuidado.

**Principios rectores:**
- **Mobile First** — diseñar primero para pantallas pequeñas y escalar hacia arriba.
- **Glassmorphism** — superficies translúcidas, desenfoque de fondo y bordes sutiles luminosos.
- **Aire y limpieza** — uso generoso del espacio en blanco, esquinas redondeadas y sombras suaves.
- **Color contenido** — el fondo es sobrio (blanco/off-white con un velo teal sutil). El **celeste (teal) es el acento principal** y el **rosado se usa con moderación**, solo como acento puntual. Se **evita el degradado celeste↔rosado tipo "cotton candy"** como fondo o como relleno por defecto de botones e íconos.
- **Movimiento intencional** — animaciones discretas con Framer Motion que guían, no distraen.
- **Sin emojis** — está **prohibido usar emojis** en la interfaz (texto, botones, títulos, etc.). Todos los íconos provienen **exclusivamente de Lucide (SVG)**.

---

## 🎨 Paleta de colores

La paleta se deriva del **logo de Zagua Grooming**: blanco, el celeste del texto "Zagua" y el rosado del texto "Grooming".

### Colores de marca (logo)
| Rol            | Color        | HEX        | Uso                                       |
|----------------|--------------|------------|-------------------------------------------|
| Blanco           | White        | `#FFFFFF`  | Color base de superficies y fondo.        |
| Celeste de marca | Zagua Teal   | `#7AD3D5`  | Color del texto "Zagua" del logo. Acentos primarios. |
| Celeste claro    | Zagua Light  | `#B4FFFF`  | Brillo/highlight del celeste, gradientes. |
| Rosado de marca  | Grooming Pink | `#FF76B2` | Color del texto "Grooming" del logo. Acento secundario, llamados a la acción especiales. |
| Rosado claro     | Pink Light   | `#FFC2DC`  | Hover y detalles suaves del rosado.       |

Tokens disponibles en Tailwind (definidos en `index.css` con `@theme`):
`brand-teal` `#7AD3D5`, `brand-teal-light` `#B4FFFF`, `brand-pink` `#FF76B2`, `brand-pink-light` `#FFC2DC`.

### Reparto del color (jerarquía)
| Rol               | Token / HEX            | Uso                                                          |
|-------------------|------------------------|--------------------------------------------------------------|
| Acento principal  | `brand-teal` `#7AD3D5` | Botones primarios, enlaces, íconos, estados activos, sombras teñidas. |
| Acento puntual    | `brand-pink` `#FF76B2` | **Solo con moderación**: 1 elemento destacado por vista (un badge, un dato clave, un detalle de hover). Nunca como relleno por defecto. |
| Fondo de app      | Off White `#F6F8FA`    | Base sobria con un velo teal muy sutil arriba (ver abajo).   |
| Superficie glass  | `white/55`             | Tarjetas, header, footer, modales.                           |

### Colores de apoyo
| Rol            | HEX        | Uso                                  |
|----------------|------------|--------------------------------------|
| Texto principal  | `#0F172A`  | Encabezados y cuerpo.                |
| Texto secundario | `#64748B`  | Subtítulos, descripciones, labels.   |
| Éxito            | `#22C55E`  | Mensajes de confirmación.            |
| Error            | `#EF4444`  | Validaciones y mensajes de error.    |
| Advertencia      | `#F59E0B`  | Avisos.                              |

### Fondo de la app (sobrio)
Base off-white con un velo teal sutil; **sin** el degradado celeste↔rosado. El glass necesita algo que desenfocar, pero el fondo debe ser tranquilo y no competir con el contenido:
```css
background:
  radial-gradient(1100px 520px at 50% -12%, rgba(122, 211, 213, 0.18) 0%, rgba(122, 211, 213, 0) 60%),
  #f6f8fa;
```

> **Sobre los degradados:** el degradado `from-brand-teal to-brand-pink` queda reservado para **un único acento de marca** (p. ej. una línea o un detalle decorativo aislado), nunca como fondo de página ni como relleno por defecto de todos los botones e íconos. Por defecto usa **colores sólidos**.

---

## 🧊 Glassmorphism

Las tarjetas, modales, el header y los paneles usan superficies de vidrio. Receta base:

```css
.glass {
  background: rgba(255, 255, 255, 0.55);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 1.25rem;
  box-shadow: 0 8px 32px rgba(122, 211, 213, 0.18);
}
```

Con clases de Tailwind:
```html
<div class="bg-white/55 backdrop-blur-xl border border-white/60 rounded-2xl shadow-lg shadow-brand-teal/15">
  ...
</div>
```

**Reglas del vidrio:**
- Siempre sobre un fondo con velo o imagen — el efecto necesita algo que desenfocar.
- Opacidad de fondo entre `0.4` y `0.6`.
- Desenfoque entre `12px` y `20px`.
- Borde claro semitransparente (`white/40`–`white/60`) para simular el filo del vidrio.
- Sombra teñida de teal (`shadow-brand-teal/15`), nunca negra dura.

---

## 🔤 Tipografía

- **Familia:** `Poppins` o `Inter` (sans-serif, redondeada y moderna).
- **Escala (Mobile First):**

| Elemento     | Tamaño móvil | Tamaño desktop | Peso |
|--------------|--------------|----------------|------|
| H1           | `1.875rem`   | `3rem`         | 700  |
| H2           | `1.5rem`     | `2.25rem`      | 600  |
| H3           | `1.25rem`    | `1.5rem`       | 600  |
| Cuerpo       | `1rem`       | `1rem`         | 400  |
| Caption      | `0.875rem`   | `0.875rem`     | 400  |

---

## 📐 Espaciado y radios

- **Escala de espaciado:** múltiplos de `4px` (sistema de Tailwind: `2`, `4`, `6`, `8`...).
- **Radios de borde:**
  - Botones / inputs: `rounded-xl` (`0.75rem`)
  - Tarjetas / modales: `rounded-2xl` (`1.25rem`)
  - Avatares / chips: `rounded-full`
- **Sombras:** suaves y teñidas de celeste. Evitar sombras negras intensas.

---

## 🧱 Componentes

### Botón primario (sólido)
```html
<button class="px-6 py-3 rounded-xl font-medium text-white
               bg-brand-teal shadow-lg shadow-brand-teal/30
               hover:bg-[#5fc4c6]
               transition-all duration-200 active:scale-95">
  Agendar cita
</button>
```

### Botón secundario (glass)
```html
<button class="px-6 py-3 rounded-xl font-medium text-brand-teal
               bg-white/50 backdrop-blur-md border border-white/60
               hover:bg-white/70 transition-all duration-200">
  Cancelar
</button>
```

### Tarjeta de servicio (glass)
```html
<div class="bg-white/55 backdrop-blur-xl border border-white/60
            rounded-2xl shadow-lg shadow-brand-teal/15 p-6
            hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
  ...
</div>
```

### Tile de ícono (sólido, tono suave)
```html
<span class="grid place-items-center w-12 h-12 rounded-xl
             bg-brand-teal/12 text-brand-teal">
  <Scissors class="w-6 h-6" strokeWidth="1.75" />
</span>
```

### Input
```html
<input class="w-full px-4 py-3 rounded-xl
              bg-white/60 backdrop-blur-md border border-white/60
              text-slate-800 placeholder:text-slate-400
              focus:outline-none focus:ring-2 focus:ring-brand-teal
              transition-all duration-200" />
```

### Header (fijo + glass)
```html
<header class="fixed top-0 inset-x-0 z-50
               bg-white/40 backdrop-blur-xl border-b border-white/50
               shadow-sm shadow-brand-teal/10">
  ...
</header>
```

---

## ✨ Animaciones (Framer Motion)

Animaciones sutiles que refuerzan la sensación de fluidez y ligereza.

### Entrada de elementos (fade + slide)
```tsx
import { motion } from "framer-motion";

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4, ease: "easeOut" }}
>
  ...
</motion.div>
```

### Listas escalonadas (stagger)
```tsx
<motion.ul
  variants={{ show: { transition: { staggerChildren: 0.08 } } }}
  initial="hidden"
  animate="show"
>
  {items.map((item) => (
    <motion.li
      key={item.id}
      variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
    >
      ...
    </motion.li>
  ))}
</motion.ul>
```

### Hover en tarjetas
```tsx
<motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
  ...
</motion.div>
```

**Guías de movimiento:**
- Duración: `0.2s`–`0.5s`. Nada lento ni dramático.
- Easing: `easeOut` para entradas, `easeInOut` para transiciones.
- Respetar `prefers-reduced-motion` para accesibilidad.

---

## 🔣 Iconografía (Lucide React)

Todos los SVG provienen de **`lucide-react`**. Estilo de línea fino y consistente.

> ⛔ **Regla estricta:** queda **prohibido el uso de emojis** en cualquier parte de la interfaz. Todo símbolo o ícono debe ser un componente de Lucide. Si un emoji parece necesario, existe un ícono equivalente en Lucide.

```tsx
import { PawPrint, Calendar, Scissors, Bath, Clock, User } from "lucide-react";

<Scissors className="w-5 h-5 text-brand-teal" strokeWidth={1.75} />
```

**Convenciones:**
- Tamaños: `w-4 h-4` (inline), `w-5 h-5` (botones), `w-6 h-6` (navegación).
- `strokeWidth` entre `1.5` y `2`.
- Color por defecto: celeste (`text-brand-teal`) o heredado del texto.
- Iconos sugeridos por dominio: `PawPrint`, `Scissors`, `Bath`, `Calendar`, `Clock`, `User`, `Dog`, `Cat`.

---

## ♿ Accesibilidad

- Contraste mínimo **AA**: el `brand-teal` (`#7AD3D5`) es claro; para **texto** sobre blanco usa un teal más oscuro (p. ej. `#0E7C7E`) o `text-slate-700`. Reserva `brand-teal` para íconos, fondos y bordes.
- Estados de `focus` siempre visibles (`focus:ring-2 ring-brand-teal`).
- Áreas táctiles de al menos `44×44px` en móvil.
- Texto alternativo en imágenes y `aria-label` en botones de solo icono.

---

## 📱 Breakpoints (Tailwind, Mobile First)

| Prefijo | Ancho mínimo | Dispositivo            |
|---------|--------------|------------------------|
| (base)  | `0px`        | Móvil (diseño inicial) |
| `sm`    | `640px`      | Móvil grande           |
| `md`    | `768px`      | Tablet                 |
| `lg`    | `1024px`     | Desktop                |
| `xl`    | `1280px`     | Desktop grande         |

Diseñar siempre primero la versión móvil y añadir variantes hacia arriba (`md:`, `lg:`).
