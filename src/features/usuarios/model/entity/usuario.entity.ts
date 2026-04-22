/**
 * Entity: Usuario
 * Representa un usuario en el sistema (Paciente o Administrador)
 * Mapea directamente al modelo de Prisma
 */
export interface UsuarioEntity {
  id: number;
  nombre: string;
  email: string;
  password: string;
  rol_id: number;
  creado_en: Date;
  actualizado_en: Date;
}

/**
 * DTO de respuesta para listar usuarios
 * No expone la contraseña
 */
export interface UsuarioResponseDTO {
  id: number;
  nombre: string;
  email: string;
  rol_id: number;
  creado_en: Date;
}
