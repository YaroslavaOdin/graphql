import { PrismaClient } from '@prisma/client';
import { Loaders } from '../loaders.js';

export type Context = {
    prisma: PrismaClient;
} & ReturnType<typeof Loaders>