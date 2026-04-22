import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'

const connectionString = process.env.DATABASE_URL
const pool = new pg.Pool({ connectionString })
const adapter = new PrismaPg(pool)

const prisma = new PrismaClient({ adapter })

async function main() {
  // 1. Catálogos básicos (Roles y Estados)
  await prisma.rol.upsert({
    where: { nombre: 'Admin' },
    update: {},
    create: { nombre: 'Admin' },
  })

  await prisma.rol.upsert({
    where: { nombre: 'Paciente' },
    update: {},
    create: { nombre: 'Paciente' },
  })

  await prisma.estadoCita.upsert({
    where: { nombre: 'Pendiente' },
    update: {},
    create: { nombre: 'Pendiente' },
  })

  await prisma.estadoCita.upsert({
    where: { nombre: 'Confirmada' },
    update: {},
    create: { nombre: 'Confirmada' },
  })

  await prisma.estadoCita.upsert({
    where: { nombre: 'Rechazada' },
    update: {},
    create: { nombre: 'Rechazada' },
  })

  await prisma.estadoCita.upsert({
    where: { nombre: 'Cancelada' },
    update: {},
    create: { nombre: 'Cancelada' },
  })

  console.log('Seeding finished successfully')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
