'use client';

import React from 'react';
import { motion } from 'framer-motion';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export default function AboutPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-20 space-y-8">
      <motion.h1 className="text-4xl font-bold" {...fadeIn}>
        About Me
      </motion.h1>
      <motion.p className="text-muted-foreground text-lg" {...fadeIn}>
        I&#39;m Damrongsak Samanras, a System Analyst with over 15 years of
        experience across architecture design, data engineering, and full-stack
        development. My work spans scalable systems, legacy integration, and
        enterprise-grade solutions for energy and logistics platforms like PTT,
        PTTOR, and NGV networks.
      </motion.p>
      <motion.ul
        className="list-disc pl-6 text-muted-foreground space-y-2"
        {...fadeIn}
      >
        <li>Expertise in Apache Airflow, Docker, Kubernetes</li>
        <li>Backend: Python, C#, SQL, Express.Js, Node.Js</li>
        <li>Frontend: ASP.NET MVC, React-router, Bootstrap</li>
        <li>Enterprise Systems: SAP HANA, Oracle, MS SQL</li>
      </motion.ul>
    </main>
  );
}
