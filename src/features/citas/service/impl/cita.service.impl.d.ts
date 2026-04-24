import type { CrearCitaDTO } from '../../model/dto/cita.dto.js';
export declare class CitaServiceImpl {
    private citaRepository;
    agendarCita(dto: CrearCitaDTO): Promise<import("../../model/dto/cita.dto.js").RespuestaCitaDTO>;
    obtenerCitasPendientes(): Promise<import("../../model/dto/cita.dto.js").RespuestaCitaDTO[]>;
    obtenerHistorialCitas(): Promise<import("../../model/dto/cita.dto.js").RespuestaCitaDTO[]>;
    responderSolicitud(id_cita: number, aceptar: boolean): Promise<import("../../model/dto/cita.dto.js").RespuestaCitaDTO>;
    obtenerMisCitas(usuario_id: number): Promise<import("../../model/dto/cita.dto.js").RespuestaCitaDTO[]>;
    cancelarCita(id_cita: number, usuario_id: number): Promise<{
        id: number;
        creado_en: Date;
        actualizado_en: Date;
        paciente_id: number;
        bloque_id: number;
        motivo_consulta: string;
        estado_id: number;
    }>;
    obtenerEstadisticas(): Promise<{
        citasHoy: number;
        pendientes: number;
    }>;
    reprogramarCita(id_cita: number, nuevo_bloque_id: number): Promise<import("../../model/dto/cita.dto.js").RespuestaCitaDTO>;
}
//# sourceMappingURL=cita.service.impl.d.ts.map