import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import ApiKeyManager from '@/components/dashboard/ApiKeyManager';

export default async function ApiKeysPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/auth/signin');
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">API Keys</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your API keys for programmatic access to your account.
        </p>
      </div>

      <ApiKeyManager />
    </div>
  );
}
