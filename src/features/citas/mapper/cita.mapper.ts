import type { CitaEntity } from '../model/entity/cita.entity.js';
import type { RespuestaCitaDTO } from '../model/dto/cita.dto.js';

export class CitaMapper {
    static toResponseDTO(entity: any): RespuestaCitaDTO {
        return {
            id_cita: entity.id,
            paciente: entity.paciente_nombre,
            fecha: entity.fecha_bloque,
            hora_inicio: entity.hora_inicio,
            estado: this.mapearEstado(entity.estado_id)
        };
    }

    private static mapearEstado(estadoId: number): string {
        const estados: Record<number, string> = {
            1: 'Pendiente',
            2: 'Confirmada',
            3: 'Cancelada'
        };
        return estados[estadoId] || 'Desconocido';
    }
}