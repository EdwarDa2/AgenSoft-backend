/**
 * Entity: BloqueCalendario
 */
export interface BloqueEntity {
    id: number;
    fecha: string;
    hora_inicio: string;
    hora_fin: string;
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
//# sourceMappingURL=bloque.entity.d.ts.map