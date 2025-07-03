import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button'; // Adjust path if needed

const AdminPanel: React.FC = () => {
  return (
    <div className="p-6 border border-gray-200 rounded-lg">
      <h2 className="text-2xl font-semibold mb-2">Admin Panel</h2>
      <p className="mb-4 text-gray-700">
        Manage users, content, and settings for the portfolio.
      </p>
      <div className="flex gap-2">
        <Link href="/admin/users">
          <Button>Manage Users</Button>
        </Link>
        <Link href="/admin/content">
          <Button>Manage Content</Button>
        </Link>
        <Link href="/admin/settings">
          <Button>Settings</Button>
        </Link>
      </div>
    </div>
  );
};

export default AdminPanel;
