import prisma from '../../../config/prisma.js';
import type { PacienteEntity } from '../model/entity/paciente.entity.js';

export class PacienteRepository {
  async crear(datos: Omit<PacienteEntity, 'id'>): Promise<PacienteEntity> {
    const paciente = await prisma.paciente.create({
      data: {
        usuario_id: datos.usuario_id,
        nombre_completo: datos.nombre_completo,
        telefono: datos.telefono,
        informacion_medica: datos.informacion_medica,
      },
    });
    return paciente as unknown as PacienteEntity;
  }

  async obtenerPorId(id: number): Promise<PacienteEntity | null> {
    const paciente = await prisma.paciente.findUnique({ where: { id } });
    return paciente as unknown as PacienteEntity | null;
  }

  async obtenerPorUsuarioId(usuario_id: number): Promise<PacienteEntity | null> {
    const paciente = await prisma.paciente.findUnique({ where: { usuario_id } });
    return paciente as unknown as PacienteEntity | null;
  }

  async obtenerTodos(skip: number = 0, take: number = 10): Promise<PacienteEntity[]> {
    const pacientes = await prisma.paciente.findMany({
      skip,
      take,
      orderBy: { id: 'desc' },
    });
    return pacientes as unknown as PacienteEntity[];
  }

  async actualizar(id: number, datos: Partial<Omit<PacienteEntity, 'id' | 'usuario_id'>>): Promise<PacienteEntity> {
    const paciente = await prisma.paciente.update({
      where: { id },
      data: {
        ...(datos.nombre_completo && { nombre_completo: datos.nombre_completo }),
        ...(datos.telefono !== undefined && { telefono: datos.telefono }),
        ...(datos.informacion_medica !== undefined && { informacion_medica: datos.informacion_medica }),
      },
    });
    return paciente as unknown as PacienteEntity;
  }

  async eliminar(id: number): Promise<void> {
    await prisma.paciente.delete({ where: { id } });
  }
}
