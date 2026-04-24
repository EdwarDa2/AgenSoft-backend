import type { UsuarioEntity } from '../model/entity/usuario.entity.js';
/**
 * Repository: Capa de acceso a datos para Usuarios
 * Buena práctica: Abstrae la lógica de BD, facilita testing
 */
export declare class UsuarioRepository {
    /**
     * Crea un nuevo usuario
     */
    crear(datos: Omit<UsuarioEntity, 'id' | 'creado_en' | 'actualizado_en'>): Promise<UsuarioEntity>;
    /**
     * Obtiene un usuario por ID
     */
    obtenerPorId(id: number): Promise<UsuarioEntity | null>;
    /**
     * Obtiene un usuario por email
     * Útil para login y validaciones de unicidad
     */
    obtenerPorEmail(email: string): Promise<any | null>;
    /**
     * Obtiene todos los usuarios
     */
    obtenerTodos(skip?: number, take?: number): Promise<UsuarioEntity[]>;
    /**
     * Obtiene usuarios por rol
     */
    obtenerPorRol(rol_id: number): Promise<UsuarioEntity[]>;
    /**
     * Actualiza un usuario
     */
    actualizar(id: number, datos: Partial<Omit<UsuarioEntity, 'id' | 'creado_en' | 'actualizado_en'>>): Promise<UsuarioEntity>;
    /**
     * Elimina un usuario (borrado lógico sería mejor para producción)
     */
    eliminar(id: number): Promise<UsuarioEntity>;
    /**
     * Verifica si un email ya existe
     */
    existeEmail(email: string): Promise<boolean>;
    /**
     * Obtiene el total de usuarios
     */
    obtenerTotal(): Promise<number>;
}
//# sourceMappingURL=usuario.repository.d.ts.map