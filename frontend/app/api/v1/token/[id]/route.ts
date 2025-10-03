import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyBearerToken } from '@/lib/bearer-auth';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await verifyBearerToken(request);

  if (!auth.success) {
    return NextResponse.json({ error: auth.error }, { status: 401 });
  }

  try {
    const { name, isActive, expiresAt } = await request.json();
    const { id: tokenId } = await params;

    const existingToken = await prisma.apiTokens.findFirst({
      where: {
        id: tokenId,
        userId: auth.user!.id
      }
    });

    if (!existingToken) {
      return NextResponse.json(
        { error: 'Token not found or not owned by user' },
        { status: 404 }
      );
    }

    const updatedToken = await prisma.apiTokens.update({
      where: { id: tokenId },
      data: {
        ...(name && { name }),
        ...(typeof isActive === 'boolean' && { isActive }),
        ...(expiresAt && { expiresAt: new Date(expiresAt) })
      },
      select: {
        id: true,
        name: true,
        token: true,
        isActive: true,
        expiresAt: true,
        updatedAt: true
      }
    });

    return NextResponse.json({ token: updatedToken });
  } catch {
    return NextResponse.json(
      { error: 'Failed to update token' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await verifyBearerToken(request);

  if (!auth.success) {
    return NextResponse.json({ error: auth.error }, { status: 401 });
  }

  try {
    const { id: tokenId } = await params;

    const existingToken = await prisma.apiTokens.findFirst({
      where: {
        id: tokenId,
        userId: auth.user!.id
      }
    });

    if (!existingToken) {
      return NextResponse.json(
        { error: 'Token not found or not owned by user' },
        { status: 404 }
      );
    }

    await prisma.apiTokens.delete({
      where: { id: tokenId }
    });

    return NextResponse.json({ message: 'Token deleted successfully' });
  } catch {
    return NextResponse.json(
      { error: 'Failed to delete token' },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await verifyBearerToken(request);

  if (!auth.success) {
    return NextResponse.json({ error: auth.error }, { status: 401 });
  }

  try {
    const { id: tokenId } = await params;

    const token = await prisma.apiTokens.findFirst({
      where: {
        id: tokenId,
        userId: auth.user!.id
      },
      select: {
        id: true,
        name: true,
        token: true,
        isActive: true,
        expiresAt: true,
        createdAt: true,
        updatedAt: true
      }
    });

    if (!token) {
      return NextResponse.json(
        { error: 'Token not found or not owned by user' },
        { status: 404 }
      );
    }

    return NextResponse.json({ token });
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch token' },
      { status: 500 }
    );
  }
}