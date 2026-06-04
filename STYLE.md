# 🎨 Guía de Estilo

Esta guía define el lenguaje visual de la aplicación. El estilo principal es **Glassmorphism** (vidrio esmerilado), con una paleta limpia basada en **celeste** y **blanco**, transmitiendo frescura, higiene y cuidado — ideal para un negocio de grooming.

**Principios rectores:**
- **Mobile First** — diseñar primero para pantallas pequeñas y escalar hacia arriba.
- **Glassmorphism** — superficies translúcidas, desenfoque de fondo y bordes sutiles luminosos.
- **Aire y limpieza** — uso generoso del espacio en blanco, esquinas redondeadas y sombras suaves.
- **Movimiento intencional** — animaciones discretas con Framer Motion que guían, no distraen.

---

## 🎨 Paleta de colores

### Colores principales
| Rol            | Color        | HEX        | Uso                                       |
|----------------|--------------|------------|-------------------------------------------|
| Celeste primario | Sky          | `#38BDF8`  | Acentos, botones, enlaces, elementos activos. |
| Celeste claro    | Sky Light    | `#7DD3FC`  | Hover, gradientes, detalles.              |
| Celeste profundo | Sky Deep     | `#0EA5E9`  | Texto sobre claro, énfasis, focus.        |
| Blanco           | White        | `#FFFFFF`  | Color base de superficies y texto invertido. |
| Blanco hueso     | Off White    | `#F8FAFC`  | Fondo de la app.                          |

### Colores de apoyo
| Rol            | HEX        | Uso                                  |
|----------------|------------|--------------------------------------|
| Texto principal  | `#0F172A`  | Encabezados y cuerpo.                |
| Texto secundario | `#64748B`  | Subtítulos, descripciones, labels.   |
| Éxito            | `#22C55E`  | Mensajes de confirmación.            |
| Error            | `#EF4444`  | Validaciones y mensajes de error.    |
| Advertencia      | `#F59E0B`  | Avisos.                              |

### Gradiente de fondo (recomendado)
```css
background: linear-gradient(135deg, #E0F2FE 0%, #FFFFFF 50%, #F0F9FF 100%);
```

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
  box-shadow: 0 8px 32px rgba(14, 165, 233, 0.15);
}
```

Con clases de Tailwind:
```html
<div class="bg-white/55 backdrop-blur-xl border border-white/60 rounded-2xl shadow-lg shadow-sky-500/15">
  ...
</div>
```

**Reglas del vidrio:**
- Siempre sobre un fondo con gradiente o imagen — el efecto necesita algo que desenfocar.
- Opacidad de fondo entre `0.4` y `0.6`.
- Desenfoque entre `12px` y `20px`.
- Borde claro semitransparente (`white/40`–`white/60`) para simular el filo del vidrio.
- Sombra teñida de celeste (`shadow-sky-500/15`), nunca negra dura.

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

### Botón primario
```html
<button class="px-6 py-3 rounded-xl font-medium text-white
               bg-gradient-to-r from-sky-400 to-sky-500
               shadow-lg shadow-sky-500/30
               hover:from-sky-500 hover:to-sky-600
               transition-all duration-200 active:scale-95">
  Agendar cita
</button>
```

### Botón secundario (glass)
```html
<button class="px-6 py-3 rounded-xl font-medium text-sky-600
               bg-white/50 backdrop-blur-md border border-white/60
               hover:bg-white/70 transition-all duration-200">
  Cancelar
</button>
```

### Tarjeta de servicio (glass)
```html
<div class="bg-white/55 backdrop-blur-xl border border-white/60
            rounded-2xl shadow-lg shadow-sky-500/15 p-6
            hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
  ...
</div>
```

### Input
```html
<input class="w-full px-4 py-3 rounded-xl
              bg-white/60 backdrop-blur-md border border-white/60
              text-slate-800 placeholder:text-slate-400
              focus:outline-none focus:ring-2 focus:ring-sky-400
              transition-all duration-200" />
```

### Header (fijo + glass)
```html
<header class="fixed top-0 inset-x-0 z-50
               bg-white/40 backdrop-blur-xl border-b border-white/50
               shadow-sm shadow-sky-500/10">
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

```tsx
import { PawPrint, Calendar, Scissors, Bath, Clock, User } from "lucide-react";

<Scissors className="w-5 h-5 text-sky-500" strokeWidth={1.75} />
```

**Convenciones:**
- Tamaños: `w-4 h-4` (inline), `w-5 h-5` (botones), `w-6 h-6` (navegación).
- `strokeWidth` entre `1.5` y `2`.
- Color por defecto: celeste (`text-sky-500`) o heredado del texto.
- Iconos sugeridos por dominio: `PawPrint`, `Scissors`, `Bath`, `Calendar`, `Clock`, `User`, `Dog`, `Cat`.

---

## ♿ Accesibilidad

- Contraste mínimo **AA**: el texto celeste sobre blanco debe usar `#0EA5E9` o más oscuro.
- Estados de `focus` siempre visibles (`focus:ring-2 ring-sky-400`).
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
