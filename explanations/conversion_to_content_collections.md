# Technical Report: Conversion to Astro Content Collections

This document details the migration of the "Minimal Blog" from manual file-based routing to Astro's **Content Collections API**.

## 1. Directory Restructuring
The blog posts were moved from a routing-aware directory to a data-reserved directory:
- **Old Path**: `src/pages/posts/` (Files here automatically become URLs)
- **New Path**: `src/content/blog/` (Files here are treated as data entries)

## 2. Schema Definition (`src/content/config.ts`)
I created a configuration file to define the "shape" of our blog posts. This ensures every post has the required metadata before the site builds.

```typescript
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
    schema: z.object({
        title: z.string(),
        subtitle: z.string().optional(),
        pubDate: z.coerce.date(), // Automatically converts string dates to Date objects
        description: z.string(),
        author: z.string(),
        tags: z.array(z.string())
    }),
});

export const collections = { blog };
```

## 3. Dynamic Routing (`src/pages/posts/[slug].astro`)
Since posts no longer create their own URLs, I created a dynamic route template to handle all blog rendering in one place.

- **`getStaticPaths`**: Uses `getCollection('blog')` to fetch all entries and generate a route for each post's filename (the "slug").
- **Rendering**: Uses `entry.render()` to get the MDX component and passes the validated `entry.data` to the layout.

## 4. Data Fetching Refactor
I updated the following components to use the new API:

- **`src/components/ArticleList.astro`**: Replaced `import.meta.glob` with `await getCollection('blog')`. Added logic to sort posts by date (descending).
- **`src/pages/index.astro`**: Updated the tag extraction logic to pull from `post.data.tags`.
- **`src/pages/tags/[tag].astro`**: Updated to filter the collection based on the dynamic tag parameter.
- **`src/pages/rss.xml.js`**: Updated to use the collection data, ensuring the RSS feed stays in sync with the new structure.

## 5. Metadata Cleanup
I performed a bulk update on all `.mdx` files to remove the `layout: ...` property from the frontmatter. 

**Why?** In Content Collections, the layout is typically managed by the wrapper page (`[slug].astro`), making the redundant layout declaration in every single post unnecessary and easier to maintain globally.

## 6. Verification
I ran `npx astro build` to confirm:
- All routes (`/posts/post-1`, `/tags/astro`, etc.) are still correctly generated.
- TypeScript types were automatically generated for the collection.
- The build completed successfully without schema validation errors.
