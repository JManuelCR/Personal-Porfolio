# Diccionario Técnico y Stack

## [cite_start]Frontend & UX [cite: 14, 20]
- [cite_start]**Frameworks:** Angular v17+ (RxJS) y React v19 / Next.js[cite: 6, 20].
- [cite_start]**Estándares:** Clean Code, Pixel Perfect, Componentes reutilizables desde Figma[cite: 17, 28].
- **Estética:** Cyber-Analytic Dark Theme con Tailwind CSS.

## [cite_start]Data & Backend [cite: 15, 21]
- [cite_start]**Lenguajes:** Node.js (TypeScript), Python (FastAPI/Pandas/NumPy)[cite: 20, 21].
- [cite_start]**Bases de Datos:** PostgreSQL para relacional, Neo4j para Graph DB (especialidad en xChange GmbH)[cite: 22, 49].
- [cite_start]**Infraestructura:** Azure (Redis, App Services) y Vercel para despliegue Frontend[cite: 23, 51].

## Regla de Oro de Assets
- **Prohibido:** Almacenamiento local de videos o imágenes pesadas.
- **Obligatorio:** Referenciar via URL a Firebase Storage para delegar carga al contenedor cliente.

## Arquitectura de Componentes: Atomic Design
- **Metodología:** Segregación estricta de componentes para crear una librería interna reutilizable.
- **Estructura de Carpetas:**
  - [cite_start]`atoms/`: Componentes básicos (botones, inputs, iconos de marcas como React/Angular)[cite: 20].
  - [cite_start]`molecules/`: Combinación de átomos (search bars, tabs de categorías de datos)[cite: 42].
  - [cite_start]`organisms/`: Secciones complejas (ProjectCards con hover de video, Timeline de experiencia)[cite: 48, 50].
  - [cite_start]`templates/`: Layouts de página basados en el diseño Pixel-Perfect de Figma[cite: 17, 28].
- **Principio:** Los componentes deben ser agnósticos a los datos (puros) y recibir props para máxima reutilización.

## Quality Assurance & Documentation
- **Storybook:** Obligatorio para cada componente en `atoms/`, `molecules/` y `organisms/`.
  - Debe incluir "Controls" para testear variantes de datos (ej. diferentes estados de carga de videos de Firebase).
  - Estética: El preview de Storybook debe respetar el Dark Theme y el Grid de diseño.
- **Testing Framework:** Vitest (para Next.js/React) o Jest.
- **Testing Strategy:**
  - [cite_start]**Unit Testing:** Cobertura en funciones de transformación de datos (Python/JS)[cite: 7, 15].
  - **Component Testing:** Verificar que el hover de imagen-a-video se active correctamente.
  - **Visual Regression:** Asegurar que el diseño "Pixel Perfect" no se rompa en actualizaciones.

  ## UI State & Internationalization (i18n)
- **Theme Management:**
  - Implementar `next-themes` para un cambio de tema fluido.
  - [cite_start]**Dark Mode (Default):** Basado en la estética "Cyber-Analytic"[cite: 24].
  - [cite_start]**Light Mode:** Debe mantener el rigor visual (Pixel Perfect) con contrastes limpios para lectura de datos[cite: 17].
- **Localization (i18n):**
  - **Librería:** `next-intl` o `react-i18next`.
  - [cite_start]**Idiomas:** Inglés (Advanced) y Español (Native) como base.
  - **Estrategia:** Delegar los textos a archivos JSON de traducción (`en.json`, `es.json`) para mantener los componentes "puros".

  ## Advanced Visual Effects (Parallax)
- **Library:** Framer Motion (useScroll, useTransform) o Lenis para Smooth Scroll.
- **Implementation:** - **Layered Parallax:** Desplazamiento de elementos decorativos (nodos de grafos, líneas de código, grids de datos) a diferentes velocidades.
  - **Scroll-Linked Animations:** Revelado de secciones de texto y gráficos de "Business Analytics" conforme el usuario hace scroll.
  - **Performance:** Forzar el uso de GPU (translate3d) y evitar el cambio de propiedades que disparen el "layout reflow".

  ## Folder Structure & Export Pattern (Barrel Exports)
- **Component Encapsulation:** Cada componente DEBE tener su propia subcarpeta.
- **Estructura por Componente:**
  - `components/[atomic-level]/[ComponentName]/`
    - `index.ts` (Archivo de exportación)
    - `[ComponentName].tsx` (Lógica y estructura)
    - `[ComponentName].test.tsx` (Pruebas unitarias)
    - `[ComponentName].stories.tsx` (Documentación Storybook)
    - `[ComponentName].module.css` (Si aplica estilos locales)
- **Barrel Indexing:** Cada nivel de Atomic Design (atoms, molecules, etc.) debe tener un `index.ts` que centralice y re-exporte todos los componentes de sus subcarpetas.
- **Import Rules:** Prohibido importar directamente desde el archivo `.tsx`. Siempre se debe importar desde el `index` de la carpeta del componente o del nivel atómico.

## Interaction & Motion Patterns
- **Slider/Carousel:**
  - **Engine:** Framer Motion `AnimatePresence` y `drag` gestures para soporte táctil.
  - **Performance:** Uso de `layout` prop para transiciones suaves.
  - **Responsiveness:** Debe ser adaptativo (1 slide en mobile, 3 en desktop).
  - **Accessibility:** Navegación por teclado (flechas) y soporte para lectores de pantalla (ARIA roles).

  # Section: My Profile (Narrative)
- **Constraint:** Do NOT use static cards. The narrative must be continuous.
- **Implementation:** MUST use sticky containers (`100vh`) with absolute layered assets. Text must transition via opacity based on scroll progress (useTransform).