import React from 'react';

const SupportForm = () => (
    <form className="space-y-4">
        <input
            type="text"
            placeholder="Your Name"
            className="w-full border rounded px-3 py-2"
        />
        <input
            type="email"
            placeholder="Your Email"
            className="w-full border rounded px-3 py-2"
        />
        <textarea
            placeholder="How can we help you?"
            className="w-full border rounded px-3 py-2"
            rows={4}
        />
        <button
            type="submit"
            className="bg-primary text-white px-4 py-2 rounded"
        >
            Submit
        </button>
    </form>
);

const SupportPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Support</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <SupportForm />
        </div>
      </div>
    </div>
  );
};

export default SupportPage;
