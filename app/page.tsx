// Updated app/page.tsx with About Me Section from CV

'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import Link from  'next/link';	

const fadeUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
};

export default function Home() {

    return (
        <main className="min-h-screen bg-background text-foreground px-4 md:px-8">
            {/* Hero Section */}
            <section className="text-center py-20 max-w-4xl mx-auto space-y-6">
                <motion.h2
                    className="text-5xl font-bold tracking-tight"
                    {...fadeUp}
                >
                    Build what&#39;s next.
                </motion.h2>
                <motion.p
                    className="text-lg text-muted-foreground"
                    {...{
                        ...fadeUp,
                        transition: { duration: 0.6, delay: 0.2 },
                    }}
                >
                    The modern toolkit for scalable ideas. Powered by Next.js
                    15, TypeScript, and shadcn/ui.
                </motion.p>
                <motion.div
                    className="flex justify-center gap-4"
                    {...{
                        ...fadeUp,
                        transition: { duration: 0.6, delay: 0.4 },
                    }}
                >
            <Link href="/about">
            <Button className="px-6 py-3 rounded-2xl">
                        Get Started
                    </Button>
            </Link>
                    <Link href="/projects">
                    <Button variant="outline" className="px-6 py-3 rounded-2xl">
                        Learn More
              </Button>
              </Link>
                </motion.div>
            </section>

            {/* About Me Section */}
            <section className="max-w-4xl mx-auto py-20 space-y-8">
                <motion.h2
                    className="text-3xl font-bold text-center"
                    {...fadeUp}
                >
                    Meet the Builder Behind orignx.dev
                </motion.h2>
                <motion.p
                    className="text-muted-foreground text-center text-lg"
                    {...{ ...fadeUp, transition: { delay: 0.2 } }}
                >
                    I&#39;m Damrongsak Samanras — a System Analyst with over 15
                    years of experience in software architecture, data
                    pipelines, and full-stack development. I help businesses
                    transform ideas into scalable, production-grade systems.
                </motion.p>
            </section>

            {/* Experience Cards */}
            <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 py-12">
                <Card className="rounded-2xl shadow-md hover:shadow-xl transition">
                    <CardContent className="p-6">
                        <h3 className="text-xl font-semibold mb-2">
                            System Architect
                        </h3>
                        <p className="text-muted-foreground">
                            Designed enterprise systems for PTT using
                            microservices, Airflow pipelines, and DevOps tools
                            like Docker & Kubernetes.
                        </p>
                    </CardContent>
                </Card>
                <Card className="rounded-2xl shadow-md hover:shadow-xl transition">
                    <CardContent className="p-6">
                        <h3 className="text-xl font-semibold mb-2">
                            ETL & Data Flow
                        </h3>
                        <p className="text-muted-foreground">
                            Built data integration pipelines using Apache
                            Airflow for legacy and SAP HANA systems across oil
                            and gas projects.
                        </p>
                    </CardContent>
                </Card>
                <Card className="rounded-2xl shadow-md hover:shadow-xl transition">
                    <CardContent className="p-6">
                        <h3 className="text-xl font-semibold mb-2">
                            Full-Loop Developer
                        </h3>
                        <p className="text-muted-foreground">
                            Hands-on experience from requirement gathering to
                            deployment, covering frontend (ASP.NET, React-router)
                            to backend (Python, C#, SQL, Express.Js, Node.Js).
                        </p>
                    </CardContent>
                </Card>
            </section>

            {/* Feature Cards */}
            <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 py-12">
                <Card className="rounded-2xl shadow-md hover:shadow-xl transition">
                    <CardContent className="p-6">
                        <h3 className="text-xl font-semibold mb-2">
                            Developer Tools
                        </h3>
                        <p className="text-muted-foreground">
                            From local dev to edge deployment, orignx.dev gives
                            you tools for rapid delivery.
                        </p>
                    </CardContent>
                </Card>
                <Card className="rounded-2xl shadow-md hover:shadow-xl transition">
                    <CardContent className="p-6">
                        <h3 className="text-xl font-semibold mb-2">
                            Next-gen UI
                        </h3>
                        <p className="text-muted-foreground">
                            Use powerful components with full accessibility,
                            theme support, and design flexibility.
                        </p>
                    </CardContent>
                </Card>
                <Card className="rounded-2xl shadow-md hover:shadow-xl transition">
                    <CardContent className="p-6">
                        <h3 className="text-xl font-semibold mb-2">
                            Production Ready
                        </h3>
                        <p className="text-muted-foreground">
                            Launch confidently with battle-tested tech and best
                            practices built-in.
                        </p>
                    </CardContent>
                </Card>
            </section>

            {/* Footer */}
            <footer className="mt-20 text-center text-sm text-muted-foreground py-10">
                &copy; {new Date().getFullYear()} orignx.dev — All rights
                reserved.
            </footer>
        </main>
    );
}
