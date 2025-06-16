'use client';

import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';

const fadeUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
};

export default function ProjectsPage() {
    return (
        <main className="max-w-6xl mx-auto px-4 py-20 space-y-12">
            <motion.h1 className="text-4xl font-bold text-center" {...fadeUp}>
                Featured Projects
            </motion.h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="rounded-2xl shadow-md">
                    <CardContent className="p-6">
                        <h3 className="text-xl font-semibold mb-2">
                            Service Tracking System
                        </h3>
                        <p className="text-muted-foreground">
                            Enterprise web app used by PTT and PTTOR for oil/gas
                            service station tracking. Developed with full-loop
                            architecture and ERP interface.
                        </p>
                    </CardContent>
                </Card>

                <Card className="rounded-2xl shadow-md">
                    <CardContent className="p-6">
                        <h3 className="text-xl font-semibold mb-2">
                            PTTOR POS Data Pipeline
                        </h3>
                        <p className="text-muted-foreground">
                            Built ETL pipeline using Apache Airflow with Docker
                            and Kubernetes to automate closed-shift POS data
                            from retail platforms.
                        </p>
                    </CardContent>
                </Card>

                <Card className="rounded-2xl shadow-md">
                    <CardContent className="p-6">
                        <h3 className="text-xl font-semibold mb-2">
                            NGV Scheduling Platform
                        </h3>
                        <p className="text-muted-foreground">
                            Designed system to manage logistics scheduling for
                            NGV distribution, integrating station-level data and
                            SAP automation.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </main>
    );
}
