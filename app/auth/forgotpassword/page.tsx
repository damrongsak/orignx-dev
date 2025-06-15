'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';

const ResetPasswordForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            alert('Please enter a valid email address.');
            setIsLoading(false);
            return;
        }

        try {
            // Replace with actual API call
            await new Promise((resolve) => setTimeout(resolve, 1000));
            alert('A reset password link has been sent to your email.');
        } catch (error) {
            console.error(error);
            alert('Failed to send reset password email. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="max-w-6xl mx-auto px-4 py-20 space-y-12">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md"
        >
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">Reset Password</h1>
                
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <Label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Email
                    </Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="mt-1 w-full"
                    />
                </div>
                <Button type="submit" disabled={isLoading} className="w-full">
                    {isLoading ? 'Sending...' : 'Send Reset Link'}
                </Button>
            </form>
        </motion.div>
        </main>
    );
};

export default ResetPasswordForm;
