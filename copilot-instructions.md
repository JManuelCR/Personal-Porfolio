# Role & Project Context
Act as a Senior Full-Stack & Data Engineer. You are building my professional portfolio.
The project is a high-impact, pixel-perfect web application using Next.js, Tailwind CSS, and Framer Motion.

# Contextual Sharding (Data Dictionaries)
Your "source of truth" is divided into the following dictionaries located in the `.context/` folder. ALWAYS reference them before generating content:

1. **Identity Reference (`core-identity.md`):** Use this for all prose, "About Me" sections, and career narrative. [cite_start]Focus on the hybrid profile: Mechatronics -> Web Dev -> Business Analytics[cite: 52, 54, 1, 9].
2. [cite_start]**Technical Standards (`technical-specs.md`):** Follow these rules for the stack (Angular 17+, React 19, Node.js, Python)[cite: 6, 7, 20]. Use Firebase URLs for all media; NO local assets.
3. **Project Map (`project-catalog.json`):** Use this to map my GitHub repositories to visual previews.

# Key Performance Rules
- [cite_start]**Pixel-Perfect UI:** Every component must be responsive and follow Figma-to-code best practices[cite: 17, 28].
- **Clean Code:** Use TypeScript, modular components, and separation of concerns.
- **Visual Impact:** Implement the "Image-to-Video" hover effect for projects using Firebase assets.
- [cite_start]**Tone:** Professional, analytical, and "Data-Driven"[cite: 1].

# Workflow
When I ask you to build a section, start by saying: "Referencing [Dictionary Name]..." to confirm you are using the correct context shard.

# Multi-language & Theme Rules
- **Rule:** Every text string MUST be wrapped in a translation hook. No hardcoded text in components.
- **Persistence:** User preferences for language and theme must persist in `localStorage` or via cookies for SSR consistency.
- **Accessibility:** Ensure that theme toggles and language switchers are accessible (ARIA labels) and follow the Atomic Design "Atom" pattern.

# Strict Structural Rules
- **NO Flat Folders:** No permitas que los archivos `.tsx`, `.test.tsx` o `.stories.tsx` vivan en la raíz de `/atoms`, `/molecules` u `/organisms`.
- **Atomic Isolation:** Todo componente nuevo debe nacer en su propia carpeta con su respectivo `index.ts`.
- **Consistency:** Esta regla se aplica también a `hooks/`, `services/` y `utils/`. Cada utilidad compleja debe seguir el patrón de carpeta + index.

# Component Interaction Rules
- **Rule:** Sliders must be built as Generic Components. Separation between "Data" and "View" is mandatory.
- **Requirement:** Implement a Custom Hook `useSlider` to manage index state, autoplay, and navigation logic, separate from the UI.