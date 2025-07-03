'use client';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';

interface Post {
  id: string;
  title: string;
  author?: {
    name: string;
  };
  createdAt: string;
  content: string;
}

export function BlogList({ posts }: { posts: Post[] }) {
  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <motion.article
          key={post.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-4">{post.title}</h2>
            <p className="text-sm text-gray-500 mb-2">
              by {post.author?.name || 'Unknown'} on{' '}
              {new Date(post.createdAt).toLocaleDateString()}
            </p>
            <p className="text-neutral-800 dark:text-neutral-200">
              {post.content}
            </p>
          </Card>
        </motion.article>
      ))}
    </div>
  );
}
