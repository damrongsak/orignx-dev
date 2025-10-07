import { prisma } from '@/lib/db';
import { BlogList } from '@/components/blog/BlogList';

// Ensure the page revalidates to show new posts
export const dynamic = 'force-dynamic';

export default async function BlogPage() {
  const posts = (
    await prisma.posts.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
      include: { author: true },
    })
  ).map((posts) => ({
    ...posts,
    createdAt: posts.createdAt.toISOString(),
    author: posts.author ? { name: posts.author.name || '' } : undefined,
    category: posts.category || undefined,
  }));

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Blog</h1>
      <BlogList posts={posts} />
    </div>
  );
}
