import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // const newLink = await prisma.link.create({
  //   data: {
  //     description: 'Fullstack tutorial for GraphQL',
  //     url: 'www.howtographql.com',
  //   },
  // });
  // console.log('new', newLink);

  const allLinks = await prisma.link.findMany();
  console.log('links', allLinks);

  const allUsers = await prisma.user.findMany();
  console.log('users', allUsers);
}

main()
  .catch(e => { throw e; })
  .finally(async () => {
    await prisma.$disconnect();
  });
