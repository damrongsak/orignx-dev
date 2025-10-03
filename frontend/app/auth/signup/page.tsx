'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

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
      console.log('Form data submitted:', formData);
      const response = await fetch('/api/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
            });

      console.log('Response received:', response);

      const result = await response.json();
      console.log('Parsed response JSON:', result);

      if (response.ok) {
        setMessage(result.message);
      } else {
        setMessage(result.error);
      }
    } catch (error) {
      console.log('Error occurred during signup:', error);
      setMessage(`An error occurred! Please try again later.`);
    }
  };

  return (
    <main className="max-w-4xl mx-auto px-4 py-20 space-y-8">
      <Card className="w-full max-w-md p-6 shadow-lg mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Create Your Account
        </h1>
        <form onSubmit={handleSignUp} className="flex flex-col space-y-4">
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            className="border-gray-700 focus:ring-blue-500"
            required
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            className="border-gray-700 focus:ring-blue-500"
            required
          />
          <Button type="submit" variant="default" className="w-full">
            Sign Up
          </Button>
        </form>
        {message && (
          <p className="mt-4 text-center text-sm text-gray-400">{message}</p>
        )}
        <p className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{' '}
          <Link href="/auth/signin" className="text-blue-400 hover:underline">
            Sign In
          </Link>
        </p>
      </Card>
    </main>
  );
}
