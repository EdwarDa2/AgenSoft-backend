import type { PacienteEntity, PacienteResponseDTO } from '../model/entity/paciente.entity.js';

export class PacienteMapper {
  static toResponseDTO(p: PacienteEntity): PacienteResponseDTO {
    return {
      id: p.id,
      usuario_id: p.usuario_id,
      nombre_completo: p.nombre_completo,
      telefono: p.telefono ?? null,
      informacion_medica: p.informacion_medica ?? null,
    };
  }

  static toResponseDTOs(ps: PacienteEntity[]): PacienteResponseDTO[] {
    return ps.map((p) => this.toResponseDTO(p));
  }
}
