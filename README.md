# Minimal Blog

A high-performance, typography-focused personal blog built with **Astro 5** and **Tailwind CSS 4**. Designed for clarity, readability, and a seamless writing experience using MDX and Content Collections.

## 🚀 Key Features

- **Astro 5**: The latest web framework for content-driven websites.
- **Tailwind CSS 4**: Utilizing the new Vite-based engine for ultra-fast styling.
- **MDX Support**: Write posts in Markdown with the power of Astro components.
- **Content Collections**: Fully type-safe data fetching for blog posts.
- **Advanced Typography**:
  - Optimized for readability with justified text and automatic hyphenation.
  - obsidian-style callouts for highlighted notes and insights.
  - Syntax highlighting using **Shiki** with the *Tokyo Night* theme.
- **Mathematical Support**: Full **KaTeX** integration for rendering LaTeX equations.
- **Dynamic Layouts**: 
  - Responsive Table of Contents (TOC) that appears only when headings are present.
  - Content-first design that preserves layout balance across different post lengths.

## 🛠️ Tech Stack

- **Framework**: [Astro 5](https://astro.build/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Content**: [MDX](https://mdxjs.com/) & [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/)
- **Icons**: [Astro Icon](https://github.com/natemoo-re/astro-icon)
- **Plugins**: 
  - `remark-math` & `rehype-katex` (Equations)
  - `rehype-callouts` (Obsidian-style callouts)

## 📂 Project Structure

```text
/
├── src/
│   ├── components/    # Reusable Astro components
│   ├── content/       # Blog posts (MDX) and collection config
│   ├── layouts/       # Page templates (Base, Post)
│   ├── pages/         # Routes and dynamic post generation
│   └── styles/        # Global CSS and Tailwind configuration
├── public/            # Static assets
└── astro.config.mjs   # Astro configuration and plugins
```

## 🧞 Commands

All commands are run from the root of the project:

| Command           | Action                                           |
| :---------------- | :----------------------------------------------- |
| `pnpm install`    | Installs dependencies                            |
| `pnpm dev`        | Starts local dev server at `localhost:4321`      |
| `pnpm build`      | Build your production site to `./dist/`          |
| `pnpm preview`    | Preview your build locally before deploying      |
| `pnpm exec astro check` | Run type and schema validation                |

## 📄 License

This project is open-source and available under the MIT License.
