import type { BloqueEntity, BloqueResponseDTO } from '../model/entity/bloque.entity.js';

export class BloqueMapper {
  static toResponseDTO(b: BloqueEntity): BloqueResponseDTO {
    return {
      id: b.id,
      fecha: b.fecha,
      hora_inicio: b.hora_inicio,
      hora_fin: b.hora_fin,
      estado_id: b.estado_id,
    };
  }

  static toResponseDTOs(bs: BloqueEntity[]): BloqueResponseDTO[] {
    return bs.map((b) => this.toResponseDTO(b));
  }
}
