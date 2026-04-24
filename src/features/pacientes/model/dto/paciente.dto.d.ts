/** DTO para crear un paciente */
export interface CrearPacienteDTO {
    usuario_id: number;
    nombre_completo: string;
    telefono?: string;
    informacion_medica?: string;
}
/** DTO para actualizar paciente */
export interface ActualizarPacienteDTO {
    nombre_completo?: string;
    telefono?: string;
    informacion_medica?: string;
}
/** DTO de respuesta */
export interface PacienteResponseDTO {
    id: number;
    usuario_id: number;
    nombre_completo: string;
    telefono?: string | null;
    informacion_medica?: string | null;
}
//# sourceMappingURL=paciente.dto.d.ts.map