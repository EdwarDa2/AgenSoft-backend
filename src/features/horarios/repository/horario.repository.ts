import prisma from '../../../config/prisma.js';

export class HorarioRepository {
    async obtenerBloquesDisponiblesPorFecha(fechaIso: Date) {
        return await prisma.bloquesCalendario.findMany({
            where: {
                fecha: fechaIso,
                // Excluimos los bloques que ya tienen una cita asociada en estado 1 (Pendiente) o 2 (Aceptada)
                citas: {
                    none: {
                        estado_id: { in: [1, 2] }
                    }
                }
            },
            include: {
                // Traemos la información del horario base (hora de inicio y fin)
                horario_base: true 
            },
            orderBy: {
                horario_base: { hora_inicio: 'asc' }
            }
        });
    }
}