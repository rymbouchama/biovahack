import "dotenv/config";
import { PrismaClient } from '@prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';

const adapter = new PrismaBetterSqlite3({
  // Loaded via `dotenv/config` (backend/.env)
  url: process.env.DATABASE_URL ?? '',
});

if (!process.env.DATABASE_URL) {
  // Fail fast if env isn't set; prevents confusing "non-empty options" errors.
  throw new Error('DATABASE_URL is missing in environment variables');
}

const prisma = new PrismaClient({ adapter });

export default prisma;
