/**
 * Entity: BloqueCalendario
 */
export interface BloqueEntity {
  id: number;
  fecha: string; // YYYY-MM-DD
  hora_inicio: string; // HH:MM:SS
  hora_fin: string; // HH:MM:SS
  estado_id: number;
  creado_en?: Date;
  actualizado_en?: Date;
}

export interface BloqueResponseDTO {
  id: number;
  fecha: string;
  hora_inicio: string;
  hora_fin: string;
  estado_id: number;
}
