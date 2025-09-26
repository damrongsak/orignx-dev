import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyBearerToken } from '@/lib/bearer-auth';
import crypto from 'crypto';

export async function GET(request: NextRequest) {
  const auth = await verifyBearerToken(request);

  if (!auth.success) {
    return NextResponse.json({ error: auth.error }, { status: 401 });
  }

  try {
    const tokens = await prisma.apiTokens.findMany({
      where: { userId: auth.user!.id },
      select: {
        id: true,
        name: true,
        token: true,
        isActive: true,
        expiresAt: true,
        createdAt: true,
        updatedAt: true
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({ tokens });
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch tokens' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const auth = await verifyBearerToken(request);

  if (!auth.success) {
    return NextResponse.json({ error: auth.error }, { status: 401 });
  }

  try {
    const { name, expiresAt } = await request.json();

    if (!name) {
      return NextResponse.json(
        { error: 'Token name is required' },
        { status: 400 }
      );
    }

    const token = crypto.randomBytes(32).toString('hex');

    const apiToken = await prisma.apiTokens.create({
      data: {
        name,
        token,
        userId: auth.user!.id,
        expiresAt: expiresAt ? new Date(expiresAt) : null
      },
      select: {
        id: true,
        name: true,
        token: true,
        isActive: true,
        expiresAt: true,
        createdAt: true
      }
    });

    return NextResponse.json({ token: apiToken }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: 'Failed to create token' },
      { status: 500 }
    );
  }
}