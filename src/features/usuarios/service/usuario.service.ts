import type { RegistrarUsuarioDTO, LoginDTO, ActualizarUsuarioDTO, LoginResponseDTO, CambiarPasswordDTO, UsuarioResponseDTO } from '../model/dto/usuario.dto.js';

/**
 * Interfaz: UsuarioService
 * Define contrato para servicios de usuarios
 */
export interface IUsuarioService {
  registrar(dto: RegistrarUsuarioDTO): Promise<UsuarioResponseDTO>;
  login(dto: LoginDTO): Promise<LoginResponseDTO>;
  obtenerPorId(id: number): Promise<UsuarioResponseDTO>;
  obtenerTodos(skip?: number, take?: number): Promise<UsuarioResponseDTO[]>;
  obtenerPorRol(rol_id: number): Promise<UsuarioResponseDTO[]>;
  actualizar(id: number, dto: ActualizarUsuarioDTO): Promise<UsuarioResponseDTO>;
  eliminar(id: number): Promise<void>;
  cambiarPassword(id: number, dto: CambiarPasswordDTO): Promise<void>;
}
