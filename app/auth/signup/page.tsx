'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Signup() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [message, setMessage] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setMessage('');

        try {
            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const result = await response.json();
            if (response.ok) {
                setMessage(result.message);
            } else {
                setMessage(result.error);
            }
        } catch {
            setMessage('An error occurred.');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
            <form onSubmit={handleSignUp} className="flex flex-col space-y-4">
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="px-4 py-2 border rounded"
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="px-4 py-2 border rounded"
                    required
                />
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    Sign Up
                </button>
            </form>
            {message && <p className="mt-4 text-center text-sm text-gray-600">{message}</p>}
            <p className="mt-4 text-center text-sm text-gray-600">
                Already have an account?{' '}
                <Link href="/auth/signin" className="text-blue-500 hover:underline">
                    Log In
                </Link>
            </p>
        </div>
    );
}