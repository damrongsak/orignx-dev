'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setMessage('');
        setIsLoading(true);

        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            setMessage('Please enter a valid email address.');
            setIsLoading(false);
            return;
        }

        try {
            // Replace with actual API call
            const response = await fetch('/api/auth/forgotpassword', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const result = await response.json();
            if (response.ok) {
                setMessage(result.message || 'A reset password link has been sent to your email.');
            } else {
                setMessage(result.error || 'Failed to send reset password email. Please try again.');
            }
        } catch {
            setMessage('An error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="max-w-4xl mx-auto px-4 py-20 space-y-8">
            <Card className="w-full max-w-md p-6 shadow-lg mx-auto">
                <h1 className="text-3xl font-bold mb-6 text-center">Reset Password</h1>
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                    <Input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border-gray-700 focus:ring-blue-500"
                        required
                    />
                    <Button type="submit" variant="default" className="w-full" disabled={isLoading}>
                        {isLoading ? 'Sending...' : 'Send Reset Link'}
                    </Button>
                </form>
                {message && <p className="mt-4 text-center text-sm text-gray-400">{message}</p>}
                <p className="mt-6 text-center text-sm text-gray-400">
                    Remember your password?{' '}
                    <Link href="/auth/signin" className="text-blue-400 hover:underline">
                        Log In
                    </Link>
                </p>
            </Card>
        </main>
    );
}
