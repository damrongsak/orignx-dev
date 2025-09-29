'use client';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import ReactMarkdown from 'react-markdown';
import { useState } from 'react';

interface Post {
  id: string;
  title: string;
  author?: {
    name: string;
  };
  createdAt: string;
  content: string;
  category?: string;
}

function BlogPost({ post }: { post: Post }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const CONTENT_LIMIT = 200; // Characters to show when collapsed

  const shouldShowToggle = post.content.length > CONTENT_LIMIT;
  const displayContent = !isExpanded && shouldShowToggle
    ? post.content.substring(0, CONTENT_LIMIT) + '...'
    : post.content;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-4">{post.title}</h2>
        <div className="flex flex-wrap items-center gap-2 mb-2">
          {post.category && (
            <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium">
              {post.category}
            </span>
          )}
          <p className="text-sm text-gray-500">
            by {post.author?.name || 'Unknown'} on{' '}
            {new Date(post.createdAt).toLocaleDateString()}
          </p>
        </div>
        <div className="text-neutral-800 dark:text-neutral-200 prose prose-neutral dark:prose-invert max-w-none">
          <ReactMarkdown>{displayContent}</ReactMarkdown>
        </div>
        {shouldShowToggle && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-3 text-primary hover:text-primary/80 text-sm font-medium transition-colors"
          >
            {isExpanded ? 'Show less' : 'Show more'}
          </button>
        )}
      </Card>
    </motion.article>
  );
}

export function BlogList({ posts }: { posts: Post[] }) {
  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <BlogPost key={post.id} post={post} />
      ))}
    </div>
  );
}
