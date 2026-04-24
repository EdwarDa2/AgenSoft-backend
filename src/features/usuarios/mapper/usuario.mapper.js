/**
 * Mapper: Transforma datos de Usuario entre diferentes formatos
 * Buena práctica: Mantiene la separación entre capas
 */
export class UsuarioMapper {
    /**
     * Convierte una entidad Usuario a DTO de respuesta
     * No expone la contraseña
     */
    static toResponseDTO(usuario) {
        return {
            id: usuario.id,
            nombre: usuario.nombre,
            email: usuario.email,
            rol_id: usuario.rol_id,
            creado_en: usuario.creado_en,
        };
    }
    /**
     * Convierte múltiples usuarios a DTO de respuesta
     */
    static toResponseDTOs(usuarios) {
        return usuarios.map((usuario) => this.toResponseDTO(usuario));
    }
}
//# sourceMappingURL=usuario.mapper.js.map