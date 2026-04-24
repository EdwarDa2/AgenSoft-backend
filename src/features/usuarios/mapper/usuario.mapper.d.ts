import type { UsuarioEntity } from '../model/entity/usuario.entity.js';
import type { UsuarioResponseDTO } from '../model/entity/usuario.entity.js';
/**
 * Mapper: Transforma datos de Usuario entre diferentes formatos
 * Buena práctica: Mantiene la separación entre capas
 */
export declare class UsuarioMapper {
    /**
     * Convierte una entidad Usuario a DTO de respuesta
     * No expone la contraseña
     */
    static toResponseDTO(usuario: UsuarioEntity): UsuarioResponseDTO;
    /**
     * Convierte múltiples usuarios a DTO de respuesta
     */
    static toResponseDTOs(usuarios: UsuarioEntity[]): UsuarioResponseDTO[];
}
//# sourceMappingURL=usuario.mapper.d.ts.map