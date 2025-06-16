import { Metadata } from 'next';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export const metadata: Metadata = {
    title: 'Privacy Policy | orignx.dev',
    description:
        'How orignx.dev collects, uses, and protects your information.',
};

export default function PrivacyPolicy() {
    return (
        <main className="flex flex-col items-center px-4 py-8 md:py-16 min-h-[80vh]">
            <Card className="w-full max-w-2xl shadow-lg border-muted bg-background">
                <CardContent className="p-6 md:p-10">
                    <h1 className="text-3xl font-bold mb-6 tracking-tight">
                        Privacy Policy
                    </h1>
                    <p className="mb-6 text-muted-foreground">
                        Welcome to orignx.dev! Your privacy is important to us.
                        This Privacy Policy explains how we collect, use, and
                        protect your information when you use our website.
                    </p>
                    <Separator className="mb-6" />

                    <h2 className="text-xl font-semibold mt-8 mb-3">
                        Information We Collect
                    </h2>
                    <ul className="list-disc list-inside mb-6 space-y-2">
                        <li>
                            <span className="font-medium">
                                Personal Information:
                            </span>{' '}
                            If you contact us via the contact form or email, we
                            may collect your name, email address, and any other
                            information you provide.
                        </li>
                        <li>
                            <span className="font-medium">Usage Data:</span> We
                            may collect information about how you interact with
                            our website, including IP address, browser type,
                            pages visited, and time spent on the site.
                        </li>
                    </ul>

                    <h2 className="text-xl font-semibold mt-8 mb-3">
                        How We Use Your Information
                    </h2>
                    <ul className="list-disc list-inside mb-6 space-y-2">
                        <li>
                            To respond to your inquiries and provide support.
                        </li>
                        <li>
                            To improve the functionality and user experience of
                            our website.
                        </li>
                        <li>To analyze website traffic and usage patterns.</li>
                    </ul>

                    <h2 className="text-xl font-semibold mt-8 mb-3">
                        Third-Party Services
                    </h2>
                    <p className="mb-6">
                        We may use third-party services, such as analytics
                        tools, to help us understand how users interact with our
                        website. These services may collect and process your
                        data according to their own privacy policies.
                    </p>

                    <h2 className="text-xl font-semibold mt-8 mb-3">
                        Data Security
                    </h2>
                    <p className="mb-6">
                        We take reasonable measures to protect your information
                        from unauthorized access, disclosure, or misuse.
                        However, please note that no method of transmission over
                        the internet is completely secure.
                    </p>

                    <h2 className="text-xl font-semibold mt-8 mb-3">
                        Your Rights
                    </h2>
                    <p className="mb-6">
                        You have the right to access, update, or delete your
                        personal information. If you have any concerns about
                        your data, please contact us at{' '}
                        <a
                            href="mailto:damrongsak.sam@gmail.com"
                            className="underline"
                        >
                            Support team
                        </a>
                        .
                    </p>

                    <h2 className="text-xl font-semibold mt-8 mb-3">
                        Changes to This Privacy Policy
                    </h2>
                    <p className="mb-6">
                        We may update this Privacy Policy from time to time. Any
                        changes will be posted on this page, and the &quot;Last
                        Updated&quot; date will be revised accordingly.
                    </p>

                    <h2 className="text-xl font-semibold mt-8 mb-3">
                        Contact Us
                    </h2>
                    <p>
                        If you have any questions about this Privacy Policy,
                        please contact us at{' '}
                        <span className="underline">
                            <a
                                href="mailto:damrongsak.sam@gmail.com"
                                className="underline"
                            >
                                Support team
                            </a>
                        </span>
                        .
                    </p>
                </CardContent>
            </Card>
        </main>
    );
}
