import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
    const estados = await prisma.estadoCita.findMany();
    console.log('Estados en DB:', JSON.stringify(estados, null, 2));
}
main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());
//# sourceMappingURL=check_states.js.map