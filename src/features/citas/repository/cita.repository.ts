import prisma from '../../../config/prisma.js';
import type { CitaEntity } from '../model/entity/cita.entity.js';

export class CitaRepository {
    async crear(cita: Omit<CitaEntity, 'id' | 'creado_en' | 'actualizado_en'>): Promise<CitaEntity> {
        const nuevaCita = await prisma.cita.create({
            data: {
                paciente_id: cita.paciente_id,
                bloque_id: cita.bloque_id,
                motivo_consulta: cita.motivo_consulta,
                estado_id: cita.estado_id
            }
        });
        return nuevaCita as unknown as CitaEntity;
    }

    async obtenerPorEstado(estado_id: number): Promise<any[]> {
        return await prisma.cita.findMany({
            where: { estado_id },
            orderBy: { creado_en: 'desc' }
        });
    }

    async verificarDisponibilidad(bloque_id: number): Promise<boolean> {
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

    async actualizarEstado(id: number, estado_id: number) {
        return await prisma.cita.update({
            where: { id },
            data: { estado_id }
        });
    }

    async obtenerPorPaciente(paciente_id: number) {
        return await prisma.cita.findMany({
            where: { paciente_id: paciente_id },
            orderBy: { creado_en: 'desc' }
        });
    }

    async obtenerPorId(id: number) {
        return await prisma.cita.findUnique({
            where: { id: id }
        });
    }
}