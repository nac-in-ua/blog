import { PrismaClient } from '@prisma/client';
import data from './ids.json';

const prisma = new PrismaClient();

async function main() {
  await prisma.post.deleteMany();
  await prisma.post.createMany({
    data: data.map((id) => ({ id })),
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
