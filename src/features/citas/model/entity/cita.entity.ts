// cita.entity.ts
export interface CitaEntity {
    id: number;
    paciente_id: number;
    bloque_id: number; // Referencia al bloque de calendario (Horario)
    motivo_consulta: string;
    estado_id: number; // 1: Pendiente, 2: Confirmada, 3: Cancelada
    creado_en: Date;
    actualizado_en: Date;
}