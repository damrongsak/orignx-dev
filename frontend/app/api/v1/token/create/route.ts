import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Authentication required. Please sign in first.' },
        { status: 401 }
      );
    }

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
        userId: session.user.id,
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

    return NextResponse.json({
      message: 'Token created successfully',
      token: apiToken
    }, { status: 201 });

  } catch (error) {
    console.error('Token creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create token' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Authentication required. Please sign in first.' },
        { status: 401 }
      );
    }

    const tokens = await prisma.apiTokens.findMany({
      where: { userId: session.user.id },
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

    return NextResponse.json({
      message: 'Tokens retrieved successfully',
      tokens
    });

  } catch (error) {
    console.error('Token retrieval error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve tokens' },
      { status: 500 }
    );
  }
}