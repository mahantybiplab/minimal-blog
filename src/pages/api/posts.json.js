import { getCollection } from 'astro:content';

export async function GET() {
  const allPosts = await getCollection('blog');
  allPosts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  const posts = allPosts.map((post, i) => ({
    index: i,
    url: `/posts/${post.slug}`,
    title: post.data.title,
    subtitle: post.data.subtitle ?? null,
    description: post.data.description,
  }));

  return new Response(JSON.stringify(posts), {
    headers: { 'Content-Type': 'application/json' },
  });
}
