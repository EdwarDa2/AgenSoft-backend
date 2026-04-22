import prisma from '../../../config/prisma.js';
import type { UsuarioEntity } from '../model/entity/usuario.entity.js';

/**
 * Repository: Capa de acceso a datos para Usuarios
 * Buena práctica: Abstrae la lógica de BD, facilita testing
 */
export class UsuarioRepository {
  /**
   * Crea un nuevo usuario
   */
  async crear(datos: Omit<UsuarioEntity, 'id' | 'creado_en' | 'actualizado_en'>): Promise<UsuarioEntity> {
    const usuario = await prisma.usuario.create({
      data: {
        nombre: datos.nombre,
        email: datos.email,
        password: datos.password,
        rol_id: datos.rol_id,
      },
    });
    return usuario as unknown as UsuarioEntity;
  }

  /**
   * Obtiene un usuario por ID
   */
  async obtenerPorId(id: number): Promise<UsuarioEntity | null> {
    const usuario = await prisma.usuario.findUnique({
      where: { id },
    });
    return usuario as unknown as UsuarioEntity | null;
  }

  /**
   * Obtiene un usuario por email
   * Útil para login y validaciones de unicidad
   */
  async obtenerPorEmail(email: string): Promise<any | null> {
    const usuario = await prisma.usuario.findUnique({
      where: { email },
      include: { rol: true }
    });
    return usuario;
  }

  /**
   * Obtiene todos los usuarios
   */
  async obtenerTodos(skip: number = 0, take: number = 10): Promise<UsuarioEntity[]> {
    const usuarios = await prisma.usuario.findMany({
      skip,
      take,
      orderBy: { creado_en: 'desc' },
    });
    return usuarios as unknown as UsuarioEntity[];
  }

  /**
   * Obtiene usuarios por rol
   */
  async obtenerPorRol(rol_id: number): Promise<UsuarioEntity[]> {
    const usuarios = await prisma.usuario.findMany({
      where: { rol_id },
      orderBy: { creado_en: 'desc' },
    });
    return usuarios as unknown as UsuarioEntity[];
  }

  /**
   * Actualiza un usuario
   */
  async actualizar(
    id: number,
    datos: Partial<Omit<UsuarioEntity, 'id' | 'creado_en' | 'actualizado_en'>>
  ): Promise<UsuarioEntity> {
    const usuario = await prisma.usuario.update({
      where: { id },
      data: {
        ...(datos.nombre && { nombre: datos.nombre }),
        ...(datos.email && { email: datos.email }),
        ...(datos.password && { password: datos.password }),
      },
    });
    return usuario as unknown as UsuarioEntity;
  }

  /**
   * Elimina un usuario (borrado lógico sería mejor para producción)
   */
  async eliminar(id: number): Promise<UsuarioEntity> {
    const usuario = await prisma.usuario.delete({
      where: { id },
    });
    return usuario as unknown as UsuarioEntity;
  }

  /**
   * Verifica si un email ya existe
   */
  async existeEmail(email: string): Promise<boolean> {
    const usuario = await prisma.usuario.findUnique({
      where: { email },
    });
    return usuario !== null;
  }

  /**
   * Obtiene el total de usuarios
   */
  async obtenerTotal(): Promise<number> {
    return await prisma.usuario.count();
  }
}
