import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
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
