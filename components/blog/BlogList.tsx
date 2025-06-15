'use client';
import { motion } from 'framer-motion';

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
                    className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md"
                >
                    <h2 className="text-xl font-semibold">{post.title}</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        by {post.author?.name || 'Unknown'} on{' '}
                        {new Date(post.createdAt).toLocaleDateString()}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 mt-4">
                        {post.content}
                    </p>
                </motion.article>
            ))}
        </div>
    );
}
