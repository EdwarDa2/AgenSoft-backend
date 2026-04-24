export class PacienteMapper {
    static toResponseDTO(p) {
        return {
            id: p.id,
            usuario_id: p.usuario_id,
            nombre_completo: p.nombre_completo,
            telefono: p.telefono ?? null,
            informacion_medica: p.informacion_medica ?? null,
        };
    }
    static toResponseDTOs(ps) {
        return ps.map((p) => this.toResponseDTO(p));
    }
}
//# sourceMappingURL=paciente.mapper.js.map