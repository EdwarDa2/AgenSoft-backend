export interface CrearBloqueDTO {
  fecha: string; // YYYY-MM-DD
  hora_inicio: string; // HH:MM:SS
  hora_fin: string; // HH:MM:SS
  estado_id?: number; // default 1
}

export interface ActualizarBloqueDTO {
  fecha?: string;
  hora_inicio?: string;
  hora_fin?: string;
  estado_id?: number;
}

export interface GenerarBloquesDTO {
  fecha_inicio: string; // YYYY-MM-DD
  fecha_fin: string; // YYYY-MM-DD
  hora_inicio: string; // HH:MM:SS
  hora_fin: string; // HH:MM:SS
  duracion_minutos: number;
}

export interface BloqueResponseDTO {
  id: number;
  fecha: string;
  hora_inicio: string;
  hora_fin: string;
  estado_id: number;
}
