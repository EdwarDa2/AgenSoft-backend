// cita.dto.ts

export interface CrearCitaDTO {
    paciente_id: number;
    bloque_id: number;
    motivo_consulta: string;
}

//(JSON de Respuesta)
export interface RespuestaCitaDTO {
    id_cita: number;
    paciente: string; 
    fecha: string;
    hora_inicio: string;
    estado: string; 
}

// DTO especial para la lógica compleja de "Recorrer Horarios" de los Admins
export interface RecorrerCitasDTO {
    bloque_inicio_id: number;
    minutos_retraso: number; 
}