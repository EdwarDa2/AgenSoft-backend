export interface CrearBloqueDTO {
    fecha: string;
    hora_inicio: string;
    hora_fin: string;
    estado_id?: number;
}
export interface ActualizarBloqueDTO {
    fecha?: string;
    hora_inicio?: string;
    hora_fin?: string;
    estado_id?: number;
}
export interface GenerarBloquesDTO {
    fecha_inicio: string;
    fecha_fin: string;
    hora_inicio: string;
    hora_fin: string;
    duracion_minutos: number;
}
export interface BloqueResponseDTO {
    id: number;
    fecha: string;
    hora_inicio: string;
    hora_fin: string;
    estado_id: number;
}
//# sourceMappingURL=bloque.dto.d.ts.map