export interface CrearCitaDTO {
    paciente_id: number;
    bloque_id: number;
    motivo_consulta: string;
}
export interface RespuestaCitaDTO {
    id_cita: number;
    paciente: string;
    fecha: string;
    hora_inicio: string;
    estado: string;
}
export interface RecorrerCitasDTO {
    bloque_inicio_id: number;
    minutos_retraso: number;
}
//# sourceMappingURL=cita.dto.d.ts.map