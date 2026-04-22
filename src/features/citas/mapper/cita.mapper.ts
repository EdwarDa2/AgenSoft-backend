import type { CitaEntity } from '../model/entity/cita.entity.js';
import type { RespuestaCitaDTO } from '../model/dto/cita.dto.js';

export class CitaMapper {
    static toResponseDTO(entity: any): RespuestaCitaDTO {
        return {
            id_cita: entity.id,
            paciente: entity.paciente?.nombre_completo || 'N/A',
            fecha: entity.bloque?.fecha?.toISOString().split('T')[0] || 'N/A',
            hora_inicio: entity.bloque?.hora_inicio?.toISOString().split('T')[1]?.substring(0, 5) || 'N/A',
            estado: this.mapearEstado(entity.estado_id)
        };
    }

    private static mapearEstado(estadoId: number): string {
        const estados: Record<number, string> = {
            1: 'Pendiente',
            2: 'Confirmada',
            3: 'Rechazada',
            4: 'Cancelada'
        };
        return estados[estadoId] || 'Desconocido';
    }
}