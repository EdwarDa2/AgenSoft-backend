import type { RegistrarUsuarioDTO, LoginDTO, ActualizarUsuarioDTO, LoginResponseDTO, CambiarPasswordDTO } from '../../model/dto/usuario.dto.js';
import type { UsuarioResponseDTO } from '../../model/entity/usuario.entity.js';
import type { IUsuarioService } from '../usuario.service.js';
/**
 * Implementación: UsuarioServiceImpl
 * Contiene la lógica de negocio para gestión de usuarios
 * Buena práctica: Separar lógica de BD (Repository) de lógica de negocio (Service)
 */
export declare class UsuarioServiceImpl implements IUsuarioService {
    private usuarioRepository;
    /**
     * Registra un nuevo usuario
     * Validaciones:
     * - Email debe ser único
     * - Password se encripta antes de guardar
     * - rol_id debe ser válido
     */
    registrar(dto: RegistrarUsuarioDTO): Promise<UsuarioResponseDTO>;
    /**
     * Autentica un usuario
     * Validaciones:
     * - Email debe existir
     * - Password debe coincidir
     */
    login(dto: LoginDTO): Promise<LoginResponseDTO>;
    /**
     * Obtiene un usuario por ID
     */
    obtenerPorId(id: number): Promise<UsuarioResponseDTO>;
    /**
     * Obtiene todos los usuarios (con paginación)
     */
    obtenerTodos(skip?: number, take?: number): Promise<UsuarioResponseDTO[]>;
    /**
     * Obtiene usuarios por rol
     */
    obtenerPorRol(rol_id: number): Promise<UsuarioResponseDTO[]>;
    /**
     * Actualiza los datos de un usuario
     * Solo puede actualizar: nombre, email, password
     */
    actualizar(id: number, dto: ActualizarUsuarioDTO): Promise<UsuarioResponseDTO>;
    /**
     * Elimina un usuario
     */
    eliminar(id: number): Promise<void>;
    /**
     * Cambia la contraseña de un usuario
     * Requiere la contraseña actual para verificación
     */
    cambiarPassword(id: number, dto: CambiarPasswordDTO): Promise<void>;
    /**
     * Valida formato de email
     */
    private esEmailValido;
}
//# sourceMappingURL=usuario.service.impl.d.ts.map