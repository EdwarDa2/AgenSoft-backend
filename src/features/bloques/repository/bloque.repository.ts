import prisma from '../../../config/prisma.js';
import type { BloqueEntity } from '../model/entity/bloque.entity.js';

export class BloqueRepository {
  async crear(datos: Omit<BloqueEntity, 'id' | 'creado_en' | 'actualizado_en'>): Promise<BloqueEntity> {
    const bloque = await prisma.bloqueCalendario.create({
      data: {
        fecha: datos.fecha,
        hora_inicio: datos.hora_inicio,
        hora_fin: datos.hora_fin,
        estado_id: datos.estado_id ?? 1,
      },
    });
    return bloque as unknown as BloqueEntity;
  }

  async obtenerPorId(id: number): Promise<BloqueEntity | null> {
    const bloque = await prisma.bloqueCalendario.findUnique({ where: { id } });
    return bloque as unknown as BloqueEntity | null;
  }

  async obtenerPorFecha(fecha: string): Promise<BloqueEntity[]> {
    const bloques = await prisma.bloqueCalendario.findMany({ where: { fecha } });
    return bloques as unknown as BloqueEntity[];
  }

  async obtenerTodos(skip: number = 0, take: number = 10): Promise<BloqueEntity[]> {
    const bloques = await prisma.bloqueCalendario.findMany({ skip, take, orderBy: { fecha: 'desc' } });
    return bloques as unknown as BloqueEntity[];
  }

  async actualizar(id: number, datos: Partial<Omit<BloqueEntity, 'id'>>): Promise<BloqueEntity> {
    const bloque = await prisma.bloqueCalendario.update({
      where: { id },
      data: {
        ...(datos.fecha && { fecha: datos.fecha }),
        ...(datos.hora_inicio && { hora_inicio: datos.hora_inicio }),
        ...(datos.hora_fin && { hora_fin: datos.hora_fin }),
        ...(datos.estado_id !== undefined && { estado_id: datos.estado_id }),
      },
    });
    return bloque as unknown as BloqueEntity;
  }

  async eliminar(id: number): Promise<void> {
    await prisma.bloqueCalendario.delete({ where: { id } });
  }

  async obtenerPorRangoFecha(fechaInicio: string, fechaFin: string): Promise<BloqueEntity[]> {
    const bloques = await prisma.bloqueCalendario.findMany({
      where: {
        fecha: {
          gte: fechaInicio,
          lte: fechaFin,
        },
      },
      orderBy: { fecha: 'asc' },
    });
    return bloques as unknown as BloqueEntity[];
  }
}
