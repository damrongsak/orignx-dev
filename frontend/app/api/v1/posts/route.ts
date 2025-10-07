import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const { title, content, category, published, authorId } = await request.json();

    const post = await prisma.posts.create({
      data: { title, content, category, published, authorId },
      select: { id: true, createdAt: true }
    });

    // Revalidate the blog page cache when a new post is created
    revalidatePath('/blog');

    return NextResponse.json(post);
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'An error occurred' },
      { status: 400 }
    );
  }
}