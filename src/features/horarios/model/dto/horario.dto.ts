// horario.dto.ts

export interface ConfigurarHorarioDTO {
    dia_semana: number; 
    hora_fin: string;
    es_laboral: boolean;
}

export interface GenerarBloquesDTO {
    fecha_inicio: string; 
    fecha_fin: string;    
    duracion_minutos: number; 
}