'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useToastActions } from '@/components/ui/toast-state';

interface ApiToken {
  id: string;
  name: string;
  token: string;
  isActive: boolean;
  expiresAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export default function ApiKeyManager() {
  const [tokens, setTokens] = useState<ApiToken[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [tokenName, setTokenName] = useState('');
  const [showNewToken, setShowNewToken] = useState(false);
  const [newToken, setNewToken] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [tokenToDelete, setTokenToDelete] = useState<string | null>(null);
  const { showToast } = useToastActions();

  useEffect(() => {
    fetchTokens();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchTokens = async () => {
    try {
      const response = await fetch('/api/v1/token/create');
      const data = await response.json();

      if (response.ok) {
        setTokens(data.tokens || []);
      } else {
        showToast(data.error || 'Failed to fetch tokens', 'error');
      }
    } catch {
      showToast('Failed to load API keys', 'error');
    } finally {
      setLoading(false);
    }
  };

  const createToken = async () => {
    if (!tokenName.trim()) {
      showToast('Please enter a token name', 'error');
      return;
    }

    setCreating(true);
    try {
      const response = await fetch('/api/v1/token/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: tokenName }),
      });

      const data = await response.json();

      if (response.ok) {
        setNewToken(data.token.token);
        setShowNewToken(true);
        setTokenName('');
        fetchTokens();
        showToast('API key created successfully', 'success');
      } else {
        showToast(data.error || 'Failed to create token', 'error');
      }
    } catch {
      showToast('Failed to create API key', 'error');
    } finally {
      setCreating(false);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      showToast('Token copied to clipboard', 'success');
    } catch {
      showToast('Failed to copy token', 'error');
    }
  };

  const deleteToken = async (id: string) => {
    try {
      const tokenToRevoke = tokens.find(t => t.id === id);
      if (!tokenToRevoke) return;

      const response = await fetch(`/api/v1/token/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${tokenToRevoke.token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        fetchTokens();
        showToast('API key deleted successfully', 'success');
      } else {
        showToast(data.error || 'Failed to delete token', 'error');
      }
    } catch {
      showToast('Failed to delete API key', 'error');
    } finally {
      setDeleteDialogOpen(false);
      setTokenToDelete(null);
    }
  };

  const confirmDelete = (id: string) => {
    setTokenToDelete(id);
    setDeleteDialogOpen(true);
  };

  const maskToken = (token: string) => {
    if (token.length <= 8) return token;
    return `${token.substring(0, 4)}...${token.substring(token.length - 4)}`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-gray-100"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Create New Token */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Create New API Key</h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="tokenName">Token Name</Label>
            <Input
              id="tokenName"
              placeholder="My API Key"
              value={tokenName}
              onChange={(e) => setTokenName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && createToken()}
            />
          </div>
          <Button onClick={createToken} disabled={creating}>
            {creating ? 'Creating...' : 'Generate API Key'}
          </Button>
        </div>
      </Card>

      {/* New Token Display */}
      {showNewToken && (
        <Card className="p-6 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
          <h3 className="text-lg font-semibold mb-2 text-green-900 dark:text-green-100">
            New API Key Created
          </h3>
          <p className="text-sm text-green-800 dark:text-green-200 mb-4">
            Make sure to copy your API key now. You won&apos;t be able to see it again!
          </p>
          <div className="flex gap-2">
            <Input
              value={newToken}
              readOnly
              className="font-mono text-sm"
            />
            <Button onClick={() => copyToClipboard(newToken)}>
              Copy
            </Button>
            <Button variant="outline" onClick={() => setShowNewToken(false)}>
              Done
            </Button>
          </div>
        </Card>
      )}

      {/* Token List */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Your API Keys</h3>
        {tokens.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">
            No API keys yet. Create one to get started.
          </p>
        ) : (
          <div className="space-y-4">
            {tokens.map((token) => (
              <div
                key={token.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h4 className="font-medium">{token.name}</h4>
                    {token.isActive ? (
                      <span className="px-2 py-1 text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 rounded">
                        Active
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-xs bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 rounded">
                        Inactive
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-mono mt-1">
                    {maskToken(token.token)}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                    Created: {new Date(token.createdAt).toLocaleDateString()}
                    {token.expiresAt && (
                      <> • Expires: {new Date(token.expiresAt).toLocaleDateString()}</>
                    )}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(token.token)}
                  >
                    Copy
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => confirmDelete(token.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the API key
              and any applications using it will no longer have access.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => tokenToDelete && deleteToken(tokenToDelete)}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
