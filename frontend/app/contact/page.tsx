'use client';

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Github, Linkedin } from 'lucide-react';

export default function ContactPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-20 space-y-10">
      <motion.h1
        className="text-4xl font-bold text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Contact
      </motion.h1>

      <motion.p
        className="text-muted-foreground text-center text-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Interested in working together or just want to say hi? Drop me a line.
      </motion.p>

      <div className="text-center">
        <a href="mailto:damrongsak.sam@gmail.com">
          <Button size="lg" className="rounded-2xl text-base px-6">
            📧 damrongsak.sam@gmail.com
          </Button>
        </a>
      </div>

      {/* Social Links */}
      <motion.div
        className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com/in/damrongsak-samanras-56190525/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="outline" className="rounded-xl">
            <Linkedin className="w-4 h-4 mr-2" />
            LinkedIn
          </Button>
        </a>

        {/* GitHub */}
        <a
          href="https://github.com/damrongsak"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="outline" className="rounded-xl">
            <Github className="w-4 h-4 mr-2" />
            GitHub
          </Button>
        </a>
      </motion.div>
    </main>
  );
}
