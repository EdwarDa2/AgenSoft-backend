import { BloqueRepository } from '../../repository/bloque.repository.js';
import { BloqueMapper } from '../../mapper/bloque.mapper.js';
import type { IBloqueService } from '../bloque.service.js';
import type { CrearBloqueDTO, ActualizarBloqueDTO, GenerarBloquesDTO } from '../../model/dto/bloque.dto.js';
import type { BloqueResponseDTO } from '../../model/entity/bloque.entity.js';

export class BloqueServiceImpl implements IBloqueService {
  private bloqueRepository = new BloqueRepository();

  async crear(dto: CrearBloqueDTO): Promise<BloqueResponseDTO> {
    if (!dto.fecha || !dto.hora_inicio || !dto.hora_fin) {
      throw new Error('fecha, hora_inicio y hora_fin son requeridos');
    }

    // Validación básica: hora_inicio < hora_fin
    if (dto.hora_inicio >= dto.hora_fin) {
      throw new Error('hora_inicio debe ser anterior a hora_fin');
    }

    const bloque = await this.bloqueRepository.crear({
      fecha: dto.fecha,
      hora_inicio: dto.hora_inicio,
      hora_fin: dto.hora_fin,
      estado_id: dto.estado_id ?? 1,
    });

    return BloqueMapper.toResponseDTO(bloque);
  }

  async obtenerPorId(id: number): Promise<BloqueResponseDTO> {
    if (!id || id <= 0) throw new Error('ID inválido');
    const bloque = await this.bloqueRepository.obtenerPorId(id);
    if (!bloque) throw new Error('Bloque no encontrado');
    return BloqueMapper.toResponseDTO(bloque);
  }

  async obtenerPorFecha(fecha: string): Promise<BloqueResponseDTO[]> {
    const bloques = await this.bloqueRepository.obtenerPorFecha(fecha);
    return BloqueMapper.toResponseDTOs(bloques);
  }

  async obtenerPorRango(fechaInicio: string, fechaFin: string): Promise<BloqueResponseDTO[]> {
    const bloques = await this.bloqueRepository.obtenerPorRangoFecha(fechaInicio, fechaFin);
    return BloqueMapper.toResponseDTOs(bloques);
  }

  async obtenerTodos(skip: number = 0, take: number = 10): Promise<BloqueResponseDTO[]> {
    const bloques = await this.bloqueRepository.obtenerTodos(skip, take);
    return BloqueMapper.toResponseDTOs(bloques);
  }

  async actualizar(id: number, dto: ActualizarBloqueDTO): Promise<BloqueResponseDTO> {
    if (!id || id <= 0) throw new Error('ID inválido');
    const bloqueExistente = await this.bloqueRepository.obtenerPorId(id);
    if (!bloqueExistente) throw new Error('Bloque no encontrado');

    const datosActualizacion: any = {};
    if (dto.fecha !== undefined) datosActualizacion.fecha = dto.fecha;
    if (dto.hora_inicio !== undefined) datosActualizacion.hora_inicio = dto.hora_inicio;
    if (dto.hora_fin !== undefined) datosActualizacion.hora_fin = dto.hora_fin;
    if (dto.estado_id !== undefined) datosActualizacion.estado_id = dto.estado_id;

    if (Object.keys(datosActualizacion).length === 0) return BloqueMapper.toResponseDTO(bloqueExistente);

    const bloqueActualizado = await this.bloqueRepository.actualizar(id, datosActualizacion);
    return BloqueMapper.toResponseDTO(bloqueActualizado);
  }

  async eliminar(id: number): Promise<void> {
    if (!id || id <= 0) throw new Error('ID inválido');
    const bloque = await this.bloqueRepository.obtenerPorId(id);
    if (!bloque) throw new Error('Bloque no encontrado');
    await this.bloqueRepository.eliminar(id);
  }

  async generar(dto: GenerarBloquesDTO): Promise<BloqueResponseDTO[]> {
    // Generación simple de bloques diarios entre fechas con duración en minutos
    const { fecha_inicio, fecha_fin, hora_inicio, hora_fin, duracion_minutos } = dto;
    
    if (!duracion_minutos || duracion_minutos <= 0) {
      throw new Error('La duración en minutos debe ser mayor a 0');
    }

    const resultados: any[] = [];

    const [yStart, mStart, dStart] = (fecha_inicio || '').split('-').map(Number);
    const [yEnd, mEnd, dEnd] = (fecha_fin || '').split('-').map(Number);

    const start = new Date(Date.UTC(yStart ?? 0, (mStart ?? 1) - 1, dStart ?? 1));
    const end = new Date(Date.UTC(yEnd ?? 0, (mEnd ?? 1) - 1, dEnd ?? 1));

    for (let d = new Date(start); d <= end; d.setUTCDate(d.getUTCDate() + 1)) {
      const [hStart, mStartLocal] = (hora_inicio || '00:00').split(':').map(Number);
      const [hEnd, mEndLocal] = (hora_fin || '00:00').split(':').map(Number);

      let cursor = (hStart ?? 0) * 60 + (mStartLocal ?? 0);
      const endMinutes = (hEnd ?? 0) * 60 + (mEndLocal ?? 0);

      while (cursor + duracion_minutos <= endMinutes) {
        const sH = Math.floor(cursor / 60);
        const sM = cursor % 60;
        const eCursor = cursor + duracion_minutos;
        const eH = Math.floor(eCursor / 60);
        const eM = eCursor % 60;

        // Crear fechas UTC para hora_inicio y hora_fin
        const hInicioDate = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), sH, sM, 0));
        const hFinDate = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), eH, eM, 0));

        const bloque = await this.bloqueRepository.crear({
          fecha: d, // Pasamos el objeto Date
          hora_inicio: hInicioDate,
          hora_fin: hFinDate,
          estado_id: 1,
        } as any);

        resultados.push(bloque);
        cursor = eCursor;
      }
    }

    return BloqueMapper.toResponseDTOs(resultados);
  }
}
