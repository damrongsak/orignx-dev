import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const { name, email } = await request.json();

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    // Check if email is already taken by another user
    const existingUser = await prisma.users.findFirst({
      where: {
        email,
        NOT: {
          id: session.user.id
        }
      }
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email is already taken' },
        { status: 409 }
      );
    }

    // Update user profile
    await prisma.users.update({
      where: { id: session.user.id },
      data: {
        name,
        email
      }
    });

    return NextResponse.json({ 
      message: 'Profile updated successfully' 
    });
  } catch (error) {
    console.error('Profile update error:', error);
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    );
  }
}
