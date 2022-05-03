import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: [
    {
      emit: 'event',
      level: 'query',
    },
  ],
});

prisma.$on('query', async (e) => {
  console.log(new Date().toLocaleString(), `${e.query} ${e.params}`);
});

export interface Context {
  prisma: PrismaClient;
}

export const context: Context = {
  prisma,
};