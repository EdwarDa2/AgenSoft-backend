import { PrismaClient } from '@prisma/client';

/**
 * Singleton de PrismaClient. 
 * Garantiza una única instancia de conexión en toda la aplicación Express,
 * optimizando el uso de recursos del pool de conexiones.
 */
const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

export default prisma;