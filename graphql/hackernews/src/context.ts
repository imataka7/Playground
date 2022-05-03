import { PrismaClient } from '@prisma/client';
import { AuthTokenPayload, decodeAuthHeader } from './utils/auth';
import { Request } from 'express';

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
  userId?: number;
}

export const context = ({ req }: { req?: Request; }): Context => {
  const token = req?.headers.authorization ? decodeAuthHeader(req.headers.authorization) : null;

  return {
    prisma,
    userId: token?.userId,
  };
};