'use client';
import React from 'react';
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function ProfilePage() {
    const [formData, setFormData] = useState({ name: '', email: '', bio: '' });
    const [message, setMessage] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setMessage('');

        try {
            const response = await fetch('/api/profile/update', {
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
        <main className="max-w-4xl mx-auto px-4 py-20 space-y-8">
            <Card className="w-full max-w-md p-6 shadow-lg mx-auto">
                <h1 className="text-3xl font-bold mb-6 text-center">Your Profile</h1>
                <form onSubmit={handleUpdateProfile} className="flex flex-col space-y-4">
                    <Input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="border-gray-700 focus:ring-blue-500"
                        required
                    />
                    <Input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="border-gray-700 focus:ring-blue-500"
                        required
                    />
                    <Textarea
                        name="bio"
                        placeholder="Bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                        className="border-gray-700 focus:ring-blue-500"
                        rows={4}
                    />
                    <Button type="submit" variant="default" className="w-full">
                        Update Profile
                    </Button>
                </form>
                {message && <p className="mt-4 text-center text-sm text-gray-400">{message}</p>}
            </Card>
        </main>
    );
}
