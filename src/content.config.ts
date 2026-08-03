import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const blog = defineCollection({
	loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
	schema: z.object({
		title: z.string(),
		subtitle: z.string().optional(),
		pubDate: z.coerce.date(),
		description: z.string(),
		author: z.string(),
		tags: z.array(z.string())
	}),
});

export const collections = { blog };
