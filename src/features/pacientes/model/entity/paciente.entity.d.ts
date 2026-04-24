/**
 * Entity: Paciente
 * Mapea al modelo Prisma `Paciente`
 */
export interface PacienteEntity {
    id: number;
    usuario_id: number;
    nombre_completo: string;
    telefono?: string | null;
    informacion_medica?: string | null;
}
export interface PacienteResponseDTO {
    id: number;
    usuario_id: number;
    nombre_completo: string;
    telefono?: string | null;
    informacion_medica?: string | null;
}
//# sourceMappingURL=paciente.entity.d.ts.map