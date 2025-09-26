import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('OrxPass123', 10);

  const user = await prisma.users.upsert({
    where: { email: 'admin@orignx.dev' },
    update: {},
    create: {
      name: 'Admin',
      email: 'admin@orignx.dev',
      role: 'ADMIN',
      hashedPassword: hashedPassword,
    },
  });

  console.log('🌱 Seeded dummy users');

  await prisma.posts.createMany({
    data: [
      {
        title: 'Welcome to My Blog',
        content: 'This is the first post on orignx.dev.',
        category: 'General',
        authorId: user.id,
      },
      {
        title: 'Building My Portfolio',
        content: 'I used Next.js 15, Prisma, and PostgreSQL...',
        category: 'Development',
        authorId: user.id,
      },
    ],
  });
  console.log('🌱 Seeded dummy posts');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
