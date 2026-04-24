import type { UsuarioEntity } from '../model/entity/usuario.entity.js'
import type { UsuarioResponseDTO } from '../model/entity/usuario.entity.js';

/**
 * Mapper: Transforma datos de Usuario entre diferentes formatos
 * Buena práctica: Mantiene la separación entre capas
 */
export class UsuarioMapper {
  /**
   * Convierte una entidad Usuario a DTO de respuesta
   * No expone la contraseña
   */
  static toResponseDTO(usuario: UsuarioEntity): UsuarioResponseDTO {
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
  static toResponseDTOs(usuarios: UsuarioEntity[]): UsuarioResponseDTO[] {
    return usuarios.map((usuario) => this.toResponseDTO(usuario));
  }
}
