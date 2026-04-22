import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import 'dotenv/config';

/**
 * Singleton de PrismaClient. 
 * Garantiza una única instancia de conexión en toda la aplicación Express,
 * optimizando el uso de recursos del pool de conexiones.
 * En Prisma 7, se requiere el uso de un adapter para conexiones directas.
 */

const connectionString = process.env.DATABASE_URL;
const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
  adapter,
  log: ['query', 'info', 'warn', 'error'],
});

export default prisma;
