import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/db';

export async function POST(req: Request) {
  const { email, nonHashedPassword } = await req.json();

  if (!email || !nonHashedPassword) {
    return NextResponse.json(
      { message: 'Email and password are required' },
      { status: 400 },
    );
  }

  try {
    const existingUser = await prisma.users.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: 'User with this email already exists' },
        { status: 409 },
      );
    }

    const password = await bcrypt.hash(nonHashedPassword, 10);

    const newUser = await prisma.users.create({
      data: {
        email,
        password,
      },
    });

    return NextResponse.json(
      {
        message: 'User created successfully',
        user: { id: newUser.id, email: newUser.email },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
