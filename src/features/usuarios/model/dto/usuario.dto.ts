/**
 * DTO para registro de nuevo usuario
 * Incluye validaciones básicas
 */
export interface RegistrarUsuarioDTO {
  nombre: string;
  email: string;
  password: string;
  rol_id: number;
}

/**
 * DTO para login
 */
export interface LoginDTO {
  email: string;
  password: string;
}

/**
 * DTO para actualizar usuario
 */
export interface ActualizarUsuarioDTO {
  nombre?: string;
  email?: string;
  password?: string;
}

/**
 * DTO de respuesta después de login
 * Incluye token o datos básicos del usuario
 */
export interface LoginResponseDTO {
  user: {
    id: number;
    nombre: string;
    email: string;
    rol: string;
  };
  token: string;
}

/**
 * DTO para cambio de contraseña
 */
export interface CambiarPasswordDTO {
  password_actual: string;
  password_nueva: string;
}
