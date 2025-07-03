'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';

const SupportPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [responseMessage, setResponseMessage] = useState('');

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setResponseMessage('');

    try {
      const response = await fetch('/api/support', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        setResponseMessage(result.message);
      } else {
        setResponseMessage(result.error);
      }
    } catch {
      setResponseMessage('An error occurred.');
    }
  };

  return (
    <Card className="w-full max-w-md p-6 shadow-lg mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Support</h1>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <Input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleInputChange}
          className="border-gray-700 focus:ring-blue-500"
          required
        />
        <Input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleInputChange}
          className="border-gray-700 focus:ring-blue-500"
          required
        />
        <Textarea
          name="message"
          placeholder="How can we help you?"
          value={formData.message}
          onChange={handleInputChange}
          className="border-gray-700 focus:ring-blue-500"
          rows={4}
          required
        />
        <Button type="submit" variant="default" className="w-full">
          Submit
        </Button>
      </form>
      {responseMessage && (
        <p className="mt-4 text-center text-sm text-gray-400">
          {responseMessage}
        </p>
      )}
    </Card>
  );
};

export default SupportPage;
