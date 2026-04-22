import type { BloqueEntity, BloqueResponseDTO } from '../model/entity/bloque.entity.js';

export class BloqueMapper {
  static toResponseDTO(b: any): BloqueResponseDTO {
    // b.fecha es un objeto Date (Prisma @db.Date)
    // b.hora_inicio es un objeto Date (Prisma @db.Time)
    
    const fechaStr = b.fecha instanceof Date 
      ? b.fecha.toISOString().split('T')[0] 
      : String(b.fecha);

    const formatTime = (date: any) => {
      if (!(date instanceof Date)) return String(date);
      const hours = String(date.getUTCHours()).padStart(2, '0');
      const minutes = String(date.getUTCMinutes()).padStart(2, '0');
      return `${hours}:${minutes}`;
    };

    return {
      id: b.id,
      fecha: fechaStr,
      hora_inicio: formatTime(b.hora_inicio),
      hora_fin: formatTime(b.hora_fin),
      estado_id: b.estado_id,
    };
  }

  static toResponseDTOs(bs: any[]): BloqueResponseDTO[] {
    return bs.map((b) => this.toResponseDTO(b));
  }
}
