import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import DashboardStats from '@/components/dashboard/StatsCard';
import { LucideIcon } from 'lucide-react';
import { User } from 'lucide-react';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect('/auth/signin');
    return null; // Ensure no further rendering occurs
  }

  const isAdmin = session.user.role === 'ADMIN';
  const icon: LucideIcon = User; // Use a valid Lucide icon component

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <p className="mb-8">Welcome back, {session.user.name}!</p>

      {isAdmin && (
        <DashboardStats
          title="Admin Stats"
          value="100"
          icon={icon}
          description="Statistics for admin users"
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {/* Dashboard content */}
        <DashboardStats
          title="General Stats"
          value="100"
          icon={icon}
          description="Statistics for all users"
        />
      </div>
    </div>
  );
}
