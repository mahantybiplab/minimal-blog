// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";
import mdx from "@astrojs/mdx";
import remarkMath from "remark-math";
import rehypeMathjax from "rehype-mathjax";
import rehypeCallouts from "rehype-callouts";


export default defineConfig({
  site: "https://biplabmahanty.netlify.app",
  markdown: {
    shikiConfig: { theme: "tokyo-night", wrap: true },
    remarkPlugins: [remarkMath],
    rehypePlugins: [
      rehypeMathjax,
      [rehypeCallouts, { theme: "obsidian" }]
    ],
  },
  vite: { plugins: [tailwindcss()] },
  integrations: [
    icon(),
    mdx({
      remarkPlugins: [remarkMath],
      rehypePlugins: [
        rehypeMathjax,
        [rehypeCallouts, { theme: "obsidian" }]
      ],
    }),
  ],
});
