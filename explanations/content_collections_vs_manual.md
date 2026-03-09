# Content Collections API vs. Manual File Management

The "Minimal Blog" currently uses **Manual File Management** via `import.meta.glob`. Here is how it compares to Astro's **Content Collections API**.

## 1. Current Approach: Manual File Management
In this project, posts are stored in `src/pages/posts/` and fetched using Vite's `import.meta.glob`.

### Pros
-   **Automatic Routing**: Every `.mdx` file in `src/pages/` automatically becomes a URL (e.g., `/posts/post-1`).
-   **Simplicity**: No extra configuration or schemas are required to get started.

### Cons
-   **No Validation**: If you forget a `title` or `pubDate` in the frontmatter, the build might fail or the UI might break silently.
-   **Lack of Type Safety**: You have to manually cast post data (e.g., `post: any`), which leads to poor autocompletion and potential runtime errors.
-   **Manual Layouts**: You must specify the `layout` property in every single MDX file's frontmatter.

---

## 2. The Content Collections API
This is Astro's modern way to manage content. Files are moved to a reserved `src/content/` directory.

### Key Differences

| Feature | Manual (Current) | Content Collections API |
| :--- | :--- | :--- |
| **Directory** | `src/pages/posts/` | `src/content/blog/` |
| **Validation** | None (Manual checks) | **Strict Schema** (via Zod) |
| **Type Safety** | Low (`any`) | **High** (Auto-generated TypeScript types) |
| **Routing** | Automatic (File-based) | Manual (Requires `[slug].astro`) |
| **Frontmatter** | Flexible/Messy | Structured and Validated |

### Why use Content Collections?

1.  **Schema Validation**: You define a schema in `src/content/config.ts`. If a blog post is missing a required field or uses the wrong data type (e.g., a string instead of a Date), Astro will throw a descriptive error during development or build.
2.  **Intellisense**: Because Astro generates types based on your schema, you get full autocompletion in your `.astro` components when accessing `post.data`.
3.  **Separation of Concerns**: Content is strictly separated from the routing logic. This makes the project easier to maintain as it grows.
4.  **Querying**: You use specialized functions like `getCollection('blog')` or `getEntry('blog', 'my-post')` which are more powerful and optimized than `import.meta.glob`.

## Summary: Should you switch?
For a **small blog** like this one, the current manual approach is fine and requires less boilerplate. However, for **production-scale projects** or sites with multiple contributors, **Content Collections** are highly recommended to ensure data integrity and a better developer experience.
