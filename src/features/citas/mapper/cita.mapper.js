export class CitaMapper {
    static toResponseDTO(entity) {
        return {
            id_cita: entity.id,
            paciente: entity.paciente?.nombre_completo || 'N/A',
            fecha: entity.bloque?.fecha?.toISOString().split('T')[0] || 'N/A',
            hora_inicio: entity.bloque?.hora_inicio?.toISOString().split('T')[1]?.substring(0, 5) || 'N/A',
            estado: this.mapearEstado(entity.estado_id)
        };
    }
    static mapearEstado(estadoId) {
        const estados = {
            1: 'Pendiente',
            2: 'Confirmada',
            3: 'Rechazada',
            4: 'Cancelada'
        };
        return estados[estadoId] || 'Desconocido';
    }
}
//# sourceMappingURL=cita.mapper.js.map