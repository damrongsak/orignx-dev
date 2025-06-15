import { prisma } from "@/lib/db";
import { BlogList } from "@/components/blog/BlogList";

export default async function BlogPage() {
    const posts = await prisma.post.findMany({
        where: { published: true },
        orderBy: { createdAt: 'desc' },
        include: { author: true },
    });

    return (
        <div className="max-w-6xl mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Blog</h1>
            <BlogList posts={posts} />
        </div>
    );
}
