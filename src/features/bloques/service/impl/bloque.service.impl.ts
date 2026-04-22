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
    // Se asume validaciones por el controller
    const resultados: any[] = [];

    // Lógica: iterar por días y crear bloques consecutivos
    const start = new Date(fecha_inicio);
    const end = new Date(fecha_fin);

    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const dd = String(d.getDate()).padStart(2, '0');
      const fecha = `${yyyy}-${mm}-${dd}`;

      // Convertir horas a minutos
      const startParts = hora_inicio.split(':');
      const hStart = Number(startParts[0] ?? 0);
      const mStart = Number(startParts[1] ?? 0);

      const endParts = hora_fin.split(':');
      const hEnd = Number(endParts[0] ?? 0);
      const mEnd = Number(endParts[1] ?? 0);

      let cursor = hStart * 60 + mStart;
      const endMinutes = hEnd * 60 + mEnd;

      while (cursor + duracion_minutos <= endMinutes) {
        const sH = String(Math.floor(cursor / 60)).padStart(2, '0');
        const sM = String(cursor % 60).padStart(2, '0');
        const eCursor = cursor + duracion_minutos;
        const eH = String(Math.floor(eCursor / 60)).padStart(2, '0');
        const eM = String(eCursor % 60).padStart(2, '0');

        const bloque = await this.bloqueRepository.crear({
          fecha,
          hora_inicio: `${sH}:${sM}:00`,
          hora_fin: `${eH}:${eM}:00`,
          estado_id: 1,
        });

        resultados.push(bloque);
        cursor = eCursor;
      }
    }

    return BloqueMapper.toResponseDTOs(resultados as any);
  }
}
