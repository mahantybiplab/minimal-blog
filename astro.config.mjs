import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";
import mdx from "@astrojs/mdx";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeCallouts from "rehype-callouts";
import { unified } from "@astrojs/markdown-remark";
export default defineConfig({
  site: "https://biplabmahanty.com",
  markdown: {
    shikiConfig: { theme: "tokyo-night", wrap: true },
    processor: unified({
      remarkPlugins: [
        remarkMath
      ],
      rehypePlugins: [
        [rehypeCallouts, { theme: "obsidian" }],
        rehypeKatex, 
      ],
    }),
  },
  vite: { plugins: [tailwindcss()] },
  integrations: [icon(), mdx()],
});