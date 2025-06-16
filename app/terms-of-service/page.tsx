import { Metadata } from 'next';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export const metadata: Metadata = {
    title: 'Terms of Service | orignx.dev',
    description: 'Terms and conditions for using orignx.dev.',
};

export default function TermsOfService() {
    return (
        <main className="flex flex-col items-center px-4 py-8 md:py-16 min-h-[80vh]">
            <Card className="w-full max-w-2xl shadow-lg border-muted bg-background">
                <CardContent className="p-6 md:p-10">
                    <h1 className="text-3xl font-bold mb-6 tracking-tight">
                        Terms of Service
                    </h1>
                    <p className="mb-6 text-muted-foreground">
                        Welcome to <strong>orignx.dev</strong>. By accessing or
                        using our website, you agree to comply with and be bound
                        by the following terms and conditions. Please read them
                        carefully.
                    </p>
                    <Separator className="mb-6" />

                    <h2 className="text-xl font-semibold mt-8 mb-3">
                        1. Acceptance of Terms
                    </h2>
                    <p className="mb-4">
                        By using this website, you agree to these Terms of
                        Service. If you do not agree, please do not use the
                        website.
                    </p>

                    <h2 className="text-xl font-semibold mt-8 mb-3">
                        2. Use of the Website
                    </h2>
                    <p className="mb-4">
                        You agree to use the website for lawful purposes only.
                        You must not use the website in any way that may harm,
                        disrupt, or interfere with its functionality or
                        security.
                    </p>

                    <h2 className="text-xl font-semibold mt-8 mb-3">
                        3. Intellectual Property
                    </h2>
                    <p className="mb-4">
                        All content, designs, and code on this website are the
                        intellectual property of <strong>orignx.dev</strong>.
                        Unauthorized use, reproduction, or distribution is
                        prohibited.
                    </p>

                    <h2 className="text-xl font-semibold mt-8 mb-3">
                        4. Limitation of Liability
                    </h2>
                    <p className="mb-4">
                        We are not liable for any damages or losses resulting
                        from your use of this website or reliance on its
                        content.
                    </p>

                    <h2 className="text-xl font-semibold mt-8 mb-3">
                        5. Changes to Terms
                    </h2>
                    <p className="mb-4">
                        We reserve the right to update these Terms of Service at
                        any time. Changes will be posted on this page, and your
                        continued use of the website constitutes acceptance of
                        the updated terms.
                    </p>

                    <h2 className="text-xl font-semibold mt-8 mb-3">
                        6. Contact Information
                    </h2>
                    <p className="mb-4">
                        If you have any questions about these Terms of Service,
                        please contact us via the{' '}
                        <a href="/contact" className="underline">
                            Contact
                        </a>{' '}
                        page.
                    </p>
                </CardContent>
            </Card>
        </main>
    );
}
