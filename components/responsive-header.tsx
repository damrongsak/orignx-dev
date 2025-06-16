'use client';

import { useState, useEffect } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { LogIn, Menu, Moon, Sun, X } from 'lucide-react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import Image from 'next/image';

export default function ResponsiveHeader() {
    const [open, setOpen] = useState(false);
    const { theme, setTheme } = useTheme();
    const { data: session } = useSession();

    // Fix hydration mismatch by waiting until the component is mounted
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <header className="w-full border-b border-border py-4">
            <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
                {/* Logo */}
                <Link href="/" className="text-4xl font-bold tracking-tight">
                    ORIGNX.DEV
                </Link>

                {/* Desktop Menu */}
                <nav className="hidden md:flex gap-6 text-sm text-muted-foreground items-center">
                    <Link
                        href="/about"
                        className="hover:text-foreground transition"
                    >
                        About
                    </Link>
                    <Link
                        href="/projects"
                        className="hover:text-foreground transition"
                    >
                        Projects
                    </Link>
                    <Link
                        href="/contact"
                        className="hover:text-foreground transition"
                    >
                        Contact
                    </Link>
                    <Link
                        href="/blog"
                        className="hover:text-foreground transition"
                    >
                        Blog
                    </Link>
                    {session?.user?.role === 'ADMIN' && (
                        <Link
                            href="/dashboard"
                            className="hover:text-foreground transition"
                        >
                            Dashboard
                        </Link>
                    )}
                    {mounted && (
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                                setTheme(theme === 'dark' ? 'light' : 'dark')
                            }
                        >
                            {theme === 'dark' ? (
                                <Sun className="h-5 w-5" />
                            ) : (
                                <Moon className="h-5 w-5" />
                            )}
                        </Button>
                    )}
                    {session?.user ? (
                        <div className="flex items-center gap-2">
                            <Image
                                src={session.user.image || '/assets/images/avatar.png'}
                                alt={session.user.name || 'User'}
                                width={32}
                                height={32}
                                className="rounded-full"
                            />
                            <span className="text-sm">{session.user.name}</span>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => signOut({ callbackUrl: '/' })}
                            >
                                Log out
                            </Button>
                        </div>
                    ) : (
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => (window.location.href = '/auth/signin')}
                        >
                            <LogIn className="w-4 h-4 mr-1" /> Sign In
                        </Button>
                    )}
                </nav>

                {/* Mobile Menu Icon */}
                <div className="md:hidden">
                    <button
                        onClick={() => setOpen(!open)}
                        className="text-muted-foreground"
                    >
                        {open ? (
                            <X className="h-6 w-6" />
                        ) : (
                            <Menu className="h-6 w-6" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Drawer */}
            {open && (
                <div className="md:hidden px-4 pt-4 pb-6 space-y-4 bg-background border-t border-border">
                    <Link
                        href="/about"
                        className="block text-sm hover:text-foreground transition"
                    >
                        About
                    </Link>
                    <Link
                        href="/projects"
                        className="block text-sm hover:text-foreground transition"
                    >
                        Projects
                    </Link>
                    <Link
                        href="/contact"
                        className="block text-sm hover:text-foreground transition"
                    >
                        Contact
                    </Link>
                    <Link
                        href="/blog"
                        className="block text-sm hover:text-foreground transition"
                    >
                        Blog
                    </Link>
                    {session?.user?.role === 'ADMIN' && (
                        <Link
                            href="/dashboard"
                            className="block text-sm hover:text-foreground transition"
                        >
                            Dashboard
                        </Link>
                    )}
                    <div className="flex gap-2 pt-4 items-center">
                        {mounted && (
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() =>
                                    setTheme(
                                        theme === 'dark' ? 'light' : 'dark'
                                    )
                                }
                            >
                                {theme === 'dark' ? (
                                    <Sun className="h-5 w-5" />
                                ) : (
                                    <Moon className="h-5 w-5" />
                                )}
                            </Button>
                        )}
                        {session?.user ? (
                            <div className="flex items-center gap-2">
                                <Image
                                    src={session.user.image || '/assets/images/avatar.png'}
                                    alt={session.user.name || 'User'}
                                    width={32}
                                    height={32}
                                    className="rounded-full"
                                />
                                <span className="text-sm">
                                    {session.user.name}
                                </span>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() =>
                                        signOut({ callbackUrl: '/' })
                                    }
                                >
                                    Log out
                                </Button>
                            </div>
                        ) : (
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                    (window.location.href = '/auth/signin')
                                }
                            >
                                Sign in
                            </Button>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}
