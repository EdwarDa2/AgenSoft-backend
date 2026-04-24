import prisma from '../../../config/prisma.js';
export class CitaRepository {
    async crear(cita) {
        const nuevaCita = await prisma.cita.create({
            data: {
                paciente_id: cita.paciente_id,
                bloque_id: cita.bloque_id,
                motivo_consulta: cita.motivo_consulta,
                estado_id: cita.estado_id
            }
        });
        return nuevaCita;
    }
    async obtenerPorEstado(estado_id) {
        return await prisma.cita.findMany({
            where: { estado_id },
            include: {
                paciente: true,
                bloque: true,
                estado: true
            },
            orderBy: { creado_en: 'desc' }
        });
    }
    async obtenerHistorial() {
        return await prisma.cita.findMany({
            where: {
                estado_id: { in: [2, 3, 4] } // 2: Aceptada, 3: Rechazada, 4: Cancelada
            },
            include: {
                paciente: true,
                bloque: true,
                estado: true
            },
            orderBy: { actualizado_en: 'desc' }
        });
    }
    async verificarDisponibilidad(bloque_id) {
        /* Verifica si ya existe una cita en estado 1 (Pendiente) o 2 (Aceptada)
         para evitar encimar reservaciones en el mismo bloque horario.
        */
        const citaExistente = await prisma.cita.findFirst({
            where: {
                bloque_id,
                estado_id: { in: [1, 2] }
            }
        });
        return citaExistente === null;
    }
    async actualizarEstado(id, estado_id) {
        return await prisma.cita.update({
            where: { id },
            data: { estado_id }
        });
    }
    async obtenerPorPaciente(paciente_id) {
        return await prisma.cita.findMany({
            where: { paciente_id: paciente_id },
            include: {
                bloque: true,
                estado: true
            },
            orderBy: { creado_en: 'desc' }
        });
    }
    async obtenerPorId(id) {
        return await prisma.cita.findUnique({
            where: { id: id },
            include: {
                paciente: true,
                bloque: true,
                estado: true
            }
        });
    }
    async obtenerPacientePorUsuarioId(usuario_id) {
        return await prisma.paciente.findUnique({
            where: { usuario_id }
        });
    }
    async obtenerEstadisticas() {
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);
        const mañana = new Date(hoy);
        mañana.setDate(hoy.getDate() + 1);
        const [citasHoy, pendientes] = await Promise.all([
            prisma.cita.count({
                where: {
                    bloque: {
                        fecha: {
                            gte: hoy,
                            lt: mañana
                        }
                    },
                    estado_id: 2 // 2: Confirmada
                }
            }),
            prisma.cita.count({
                where: {
                    estado_id: 1 // 1: Pendiente
                }
            })
        ]);
        return { citasHoy, pendientes };
    }
    async reprogramar(id_cita, nuevo_bloque_id) {
        return await prisma.cita.update({
            where: { id: id_cita },
            data: {
                bloque_id: nuevo_bloque_id,
                estado_id: 2 // Al reprogramar, la pasamos a confirmada (o según regla)
            }
        });
    }
}
//# sourceMappingURL=cita.repository.js.map