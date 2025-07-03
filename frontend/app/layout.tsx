import './globals.css';
import { Inter } from 'next/font/google';
import { cn } from '@/lib/utils';
import ResponsiveHeader from '@/components/responsive-header';
import { AppProviders } from '@/components/providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'orignx.dev',
  description: 'Build what’s next.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          inter.className,
          'min-h-screen bg-background text-foreground',
        )}
      >
        <AppProviders>
          <ResponsiveHeader />
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
