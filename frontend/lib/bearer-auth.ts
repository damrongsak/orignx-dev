import { NextRequest } from 'next/server';
import { prisma } from './db';

export interface AuthenticatedRequest extends NextRequest {
  user: {
    id: string;
    email: string;
    role: string;
  };
}

export async function verifyBearerToken(request: NextRequest): Promise<{
  success: boolean;
  user?: { id: string; email: string; role: string };
  error?: string;
}> {
  const authHeader = request.headers.get('authorization');

  if (!authHeader) {
    return { success: false, error: 'Authorization header missing' };
  }

  if (!authHeader.startsWith('Bearer ')) {
    return { success: false, error: 'Invalid authorization format. Use Bearer <token>' };
  }

  const token = authHeader.substring(7);

  try {
    const apiToken = await prisma.apiTokens.findUnique({
      where: {
        token,
        isActive: true
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            role: true
          }
        }
      }
    });

    if (!apiToken) {
      return { success: false, error: 'Invalid or inactive token' };
    }

    if (apiToken.expiresAt && apiToken.expiresAt < new Date()) {
      return { success: false, error: 'Token expired' };
    }

    return {
      success: true,
      user: {
        id: apiToken.user.id,
        email: apiToken.user.email || '',
        role: apiToken.user.role
      }
    };
  } catch {
    return { success: false, error: 'Token verification failed' };
  }
}

export function requireRole(allowedRoles: string[]) {
  return (userRole: string): boolean => {
    return allowedRoles.includes(userRole);
  };
}