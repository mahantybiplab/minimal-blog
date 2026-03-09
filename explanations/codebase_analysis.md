# Codebase Analysis: Minimal Blog (Astro)

This document provides an in-depth analysis of the "Minimal Blog" codebase, covering architecture, data flow, styling, and key patterns.

## 1. Project Structure
The project follows a standard Astro directory layout:

-   **`src/`**: The core source code.
    -   **`pages/`**: File-based routing. Includes `.astro` pages and `.mdx` blog posts.
    -   **`components/`**: Reusable UI elements (Header, Footer, Cards).
    -   **`layouts/`**: Wrappers for pages (BaseLayout, MarkdownPostLayout).
    -   **`styles/`**: Global CSS (`global.css`) containing Tailwind v4 configuration.
    -   **`icons/`**: Custom SVG icons.
    -   **`assets/`**: Images and static assets used within the source.
-   **`public/`**: Static assets like the `favicon.svg` served from the root.
-   **`astro.config.mjs`**: Configuration for Astro, Tailwind, and MDX integrations.
-   **`package.json`**: Project dependencies (Astro 5.18, Tailwind 4).

## 2. Routing & Pages
Astro's file-based routing is used extensively:

-   **Static Routes**: 
    -   `src/pages/index.astro` -> `/`
    -   `src/pages/about.astro` -> `/about`
    -   `src/pages/rss.xml.js` -> `/rss.xml` (RSS feed generation)
-   **Dynamic Routes**:
    -   `src/pages/tags/[tag].astro` -> `/tags/[tag]` (e.g., `/tags/astro`). Uses `getStaticPaths()` to generate routes for each unique tag found in posts.
-   **Content Routes**:
    -   `src/pages/posts/*.mdx` -> `/posts/*` (e.g., `/posts/post-1`). Each `.mdx` file in this folder automatically becomes a route.

## 3. Content Layer
The project currently manages blog content using **MDX files** located directly within the `src/pages/posts/` directory.

-   **Approach**: It does **not** use the Astro Content Collections API (`src/content/`). Instead, it relies on file-based routing and manual retrieval.
-   **Fetching**: Posts are fetched using Vite's `import.meta.glob('../pages/posts/*.mdx', { eager: true })` in components like `ArticleList.astro` and `index.astro`.
-   **Rendering**: Astro's `@astrojs/mdx` integration handles the conversion of MDX to HTML.

## 4. Layouts & Components
### Layouts
-   **`BaseLayout.astro`**: The root layout providing the HTML shell (`<html>`, `<head>`, `<body>`), global styles, and common components (Header, Footer).
-   **`MarkdownPostLayout.astro`**: Specifically for blog posts. It wraps the post content in `BaseLayout`, adds `PostMeta`, and applies `Prose` styling for typography.

### Key Components
-   **`ArticleList.astro`**: Fetches all posts and maps them to `ArticleCard` components.
-   **`ArticleCard.astro`**: Displays a summary of a blog post (title, description, link).
-   **`Prose.astro`**: A wrapper component that applies `@tailwindcss/typography` (`prose` classes) to ensure Markdown content is styled beautifully.
-   **`PostMeta.astro`**: Displays post metadata like author and publication date.
-   **`Header.astro` / `Footer.astro`**: Standard navigation and branding.

## 5. Data Flow
Tracing a blog post lifecycle:
1.  **Source File**: A developer creates `src/pages/posts/new-post.mdx`.
2.  **Layout Assignment**: The MDX frontmatter specifies `layout: ../../layouts/MarkdownPostLayout.astro`.
3.  **Discovery**: On the home page, `import.meta.glob` finds the file and extracts its frontmatter.
4.  **Routing**: Astro generates a URL based on the filename (`/posts/new-post`).
5.  **Rendering**: When visited, Astro passes the MDX content into the `MarkdownPostLayout`'s `<slot />`.

## 6. Styling Approach
The project uses **Tailwind CSS v4**.

-   **Integration**: Configured via `@tailwindcss/vite` in `astro.config.mjs`.
-   **Global Styles**: `src/styles/global.css` imports Tailwind and defines a custom theme.
-   **Theming**: Custom design tokens (e.g., `--color-logo-dark`, `--color-body`) are defined in the `@theme` block within `global.css`, allowing for easy color management.
-   **Typography**: Uses the `@tailwindcss/typography` plugin for styling Markdown content (via the `Prose` component).

## 7. Integrations & Config
-   **`icon()`**: `astro-icon` integration for handling icons efficiently.
-   **`mdx()`**: `@astrojs/mdx` enables writing posts in MDX (Markdown with JSX components).
-   **Tailwind**: Enabled via the Vite plugin for version 4 support.

## 8. Performance & SEO
-   **Performance**: Astro generates zero-client-side JavaScript by default, resulting in extremely fast page loads.
-   **Images**: Uses `sharp` for image processing.
-   **SEO**: Basic SEO is handled in `BaseLayout.astro` using metadata passed via props (`pageTitle`). A `rss.xml.js` endpoint provides an automated RSS feed.

## 9. Build & Deploy
-   **Output Mode**: Static (SSG). The entire site is pre-rendered at build time.
-   **Deployment**: Configured for **Netlify** (indicated by the `site` URL in `astro.config.mjs`). The `npm run build` command generates a `dist/` folder ready for hosting.

## 10. Key Patterns & Gotchas
-   **Frontmatter Layout**: Posts must explicitly set their layout in frontmatter.
-   **Manual Tag Management**: Tags are derived by scanning all posts manually in `getStaticPaths`, which is efficient for smaller blogs but might scale differently for very large sites.
-   **Tailwind v4**: The `@theme` syntax in `global.css` is specific to Tailwind v4 and differs from the older `tailwind.config.js` approach.
