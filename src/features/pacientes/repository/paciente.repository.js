import prisma from '../../../config/prisma.js';
export class PacienteRepository {
    async crear(datos) {
        const paciente = await prisma.paciente.create({
            data: {
                usuario_id: datos.usuario_id,
                nombre_completo: datos.nombre_completo,
                telefono: datos.telefono ?? null,
                informacion_medica: datos.informacion_medica ?? null,
            },
        });
        return paciente;
    }
    async obtenerPorId(id) {
        const paciente = await prisma.paciente.findUnique({ where: { id } });
        return paciente;
    }
    async obtenerPorUsuarioId(usuario_id) {
        const paciente = await prisma.paciente.findUnique({ where: { usuario_id } });
        return paciente;
    }
    async obtenerTodos(skip = 0, take = 10) {
        const pacientes = await prisma.paciente.findMany({
            skip,
            take,
            orderBy: { id: 'desc' },
        });
        return pacientes;
    }
    async actualizar(id, datos) {
        const paciente = await prisma.paciente.update({
            where: { id },
            data: {
                ...(datos.nombre_completo && { nombre_completo: datos.nombre_completo }),
                ...(datos.telefono !== undefined && { telefono: datos.telefono }),
                ...(datos.informacion_medica !== undefined && { informacion_medica: datos.informacion_medica }),
            },
        });
        return paciente;
    }
    async eliminar(id) {
        await prisma.paciente.delete({ where: { id } });
    }
}
//# sourceMappingURL=paciente.repository.js.map