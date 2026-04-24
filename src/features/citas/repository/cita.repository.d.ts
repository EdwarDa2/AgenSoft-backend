import type { CitaEntity } from '../model/entity/cita.entity.js';
export declare class CitaRepository {
    crear(cita: Omit<CitaEntity, 'id' | 'creado_en' | 'actualizado_en'>): Promise<CitaEntity>;
    obtenerPorEstado(estado_id: number): Promise<any[]>;
    obtenerHistorial(): Promise<any[]>;
    verificarDisponibilidad(bloque_id: number): Promise<boolean>;
    actualizarEstado(id: number, estado_id: number): Promise<{
        id: number;
        creado_en: Date;
        actualizado_en: Date;
        paciente_id: number;
        bloque_id: number;
        motivo_consulta: string;
        estado_id: number;
    }>;
    obtenerPorPaciente(paciente_id: number): Promise<({
        bloque: {
            id: number;
            creado_en: Date;
            actualizado_en: Date;
            estado_id: number;
            fecha: Date;
            hora_inicio: Date;
            hora_fin: Date;
        };
        estado: {
            id: number;
            nombre: string;
        };
    } & {
        id: number;
        creado_en: Date;
        actualizado_en: Date;
        paciente_id: number;
        bloque_id: number;
        motivo_consulta: string;
        estado_id: number;
    })[]>;
    obtenerPorId(id: number): Promise<({
        paciente: {
            id: number;
            usuario_id: number;
            nombre_completo: string;
            telefono: string | null;
            informacion_medica: string | null;
        };
        bloque: {
            id: number;
            creado_en: Date;
            actualizado_en: Date;
            estado_id: number;
            fecha: Date;
            hora_inicio: Date;
            hora_fin: Date;
        };
        estado: {
            id: number;
            nombre: string;
        };
    } & {
        id: number;
        creado_en: Date;
        actualizado_en: Date;
        paciente_id: number;
        bloque_id: number;
        motivo_consulta: string;
        estado_id: number;
    }) | null>;
    obtenerPacientePorUsuarioId(usuario_id: number): Promise<{
        id: number;
        usuario_id: number;
        nombre_completo: string;
        telefono: string | null;
        informacion_medica: string | null;
    } | null>;
    obtenerEstadisticas(): Promise<{
        citasHoy: number;
        pendientes: number;
    }>;
    reprogramar(id_cita: number, nuevo_bloque_id: number): Promise<{
        id: number;
        creado_en: Date;
        actualizado_en: Date;
        paciente_id: number;
        bloque_id: number;
        motivo_consulta: string;
        estado_id: number;
    }>;
}
//# sourceMappingURL=cita.repository.d.ts.map