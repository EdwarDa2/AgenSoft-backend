import prisma from '../../../config/prisma.js';
export class BloqueRepository {
    async crear(datos) {
        const bloque = await prisma.bloqueCalendario.create({
            data: {
                fecha: datos.fecha,
                hora_inicio: datos.hora_inicio,
                hora_fin: datos.hora_fin,
                estado_id: datos.estado_id ?? 1,
            },
        });
        return bloque;
    }
    async obtenerPorId(id) {
        const bloque = await prisma.bloqueCalendario.findUnique({ where: { id } });
        return bloque;
    }
    async obtenerPorFecha(fecha) {
        // Si la fecha viene como YYYY-MM-DD, podemos buscar directamente
        // Prisma con @db.Date maneja bien objetos Date o strings ISO de fecha
        // Usamos el mediodía para evitar problemas de saltos de día por zona horaria
        const targetDate = new Date(`${fecha}T12:00:00.000Z`);
        const startOfDay = new Date(targetDate);
        startOfDay.setUTCHours(0, 0, 0, 0);
        const endOfDay = new Date(targetDate);
        endOfDay.setUTCHours(23, 59, 59, 999);
        const bloques = await prisma.bloqueCalendario.findMany({
            where: {
                fecha: {
                    gte: startOfDay,
                    lte: endOfDay
                }
            },
            orderBy: {
                hora_inicio: 'asc'
            }
        });
        return bloques;
    }
    async obtenerTodos(skip = 0, take = 10) {
        const bloques = await prisma.bloqueCalendario.findMany({ skip, take, orderBy: { fecha: 'desc' } });
        return bloques;
    }
    async actualizar(id, datos) {
        const bloque = await prisma.bloqueCalendario.update({
            where: { id },
            data: {
                ...(datos.fecha && { fecha: datos.fecha }),
                ...(datos.hora_inicio && { hora_inicio: datos.hora_inicio }),
                ...(datos.hora_fin && { hora_fin: datos.hora_fin }),
                ...(datos.estado_id !== undefined && { estado_id: datos.estado_id }),
            },
        });
        return bloque;
    }
    async eliminar(id) {
        await prisma.bloqueCalendario.delete({ where: { id } });
    }
    async obtenerPorRangoFecha(fechaInicio, fechaFin) {
        const start = new Date(`${fechaInicio}T00:00:00.000Z`);
        const end = new Date(`${fechaFin}T23:59:59.999Z`);
        const bloques = await prisma.bloqueCalendario.findMany({
            where: {
                fecha: {
                    gte: start,
                    lte: end,
                },
            },
            orderBy: { fecha: 'asc' },
        });
        return bloques;
    }
}
//# sourceMappingURL=bloque.repository.js.map