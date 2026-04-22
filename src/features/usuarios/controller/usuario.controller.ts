import { Request, Response } from 'express';
import { UsuarioServiceImpl } from '../service/impl/usuario.service.impl.js';
import type { RegistrarUsuarioDTO, LoginDTO, ActualizarUsuarioDTO, CambiarPasswordDTO } from '../model/dto/usuario.dto.js';

/**
 * Controller: UsuarioController
 * Maneja las solicitudes HTTP para usuarios
 * Buena práctica: Controllers deben ser delgados, solo validación de HTTP
 */
export class UsuarioController {
  private usuarioService = new UsuarioServiceImpl();

  /**
   * POST /api/v1/usuarios/registrar
   * Registra un nuevo usuario en el sistema
   */
  registrar = async (req: Request, res: Response): Promise<void> => {
    try {
      const dto: RegistrarUsuarioDTO = req.body;

      const resultado = await this.usuarioService.registrar(dto);

      res.status(201).json({
        success: true,
        message: 'Usuario registrado exitosamente',
        data: resultado,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message || 'Error en el registro',
      });
    }
  };

  /**
   * POST /api/v1/usuarios/login
   * Autentica un usuario y retorna sus datos
   */
  login = async (req: Request, res: Response): Promise<void> => {
    try {
      const dto: LoginDTO = req.body;

      const resultado = await this.usuarioService.login(dto);

      res.status(200).json({
        success: true,
        message: 'Login exitoso',
        data: resultado,
      });
    } catch (error: any) {
      res.status(401).json({
        success: false,
        message: error.message || 'Error en autenticación',
      });
    }
  };

  /**
   * GET /api/v1/usuarios/:id
   * Obtiene los datos de un usuario específico
   */
  obtenerPorId = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const usuarioId = parseInt(id, 10);

      const resultado = await this.usuarioService.obtenerPorId(usuarioId);

      res.status(200).json({
        success: true,
        data: resultado,
      });
    } catch (error: any) {
      res.status(404).json({
        success: false,
        message: error.message || 'Usuario no encontrado',
      });
    }
  };

  /**
   * GET /api/v1/usuarios
   * Obtiene todos los usuarios (con paginación)
   * Query params: skip, take
   */
  obtenerTodos = async (req: Request, res: Response): Promise<void> => {
    try {
      const skip = parseInt(req.query.skip as string, 10) || 0;
      const take = parseInt(req.query.take as string, 10) || 10;

      const resultado = await this.usuarioService.obtenerTodos(skip, take);

      res.status(200).json({
        success: true,
        data: resultado,
        pagination: {
          skip,
          take,
        },
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || 'Error al obtener usuarios',
      });
    }
  };

  /**
   * GET /api/v1/usuarios/rol/:rol_id
   * Obtiene todos los usuarios de un rol específico
   */
  obtenerPorRol = async (req: Request, res: Response): Promise<void> => {
    try {
      const { rol_id } = req.params;
      const rolId = parseInt(rol_id, 10);

      const resultado = await this.usuarioService.obtenerPorRol(rolId);

      res.status(200).json({
        success: true,
        data: resultado,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message || 'Error al obtener usuarios por rol',
      });
    }
  };

  /**
   * PATCH /api/v1/usuarios/:id
   * Actualiza los datos de un usuario
   */
  actualizar = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const usuarioId = parseInt(id, 10);
      const dto: ActualizarUsuarioDTO = req.body;

      const resultado = await this.usuarioService.actualizar(usuarioId, dto);

      res.status(200).json({
        success: true,
        message: 'Usuario actualizado exitosamente',
        data: resultado,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message || 'Error al actualizar usuario',
      });
    }
  };

  /**
   * DELETE /api/v1/usuarios/:id
   * Elimina un usuario del sistema
   */
  eliminar = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const usuarioId = parseInt(id, 10);

      await this.usuarioService.eliminar(usuarioId);

      res.status(200).json({
        success: true,
        message: 'Usuario eliminado exitosamente',
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message || 'Error al eliminar usuario',
      });
    }
  };

  /**
   * PATCH /api/v1/usuarios/:id/cambiar-password
   * Cambia la contraseña de un usuario
   */
  cambiarPassword = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const usuarioId = parseInt(id, 10);
      const dto: CambiarPasswordDTO = req.body;

      await this.usuarioService.cambiarPassword(usuarioId, dto);

      res.status(200).json({
        success: true,
        message: 'Contraseña actualizada exitosamente',
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message || 'Error al cambiar contraseña',
      });
    }
  };
}
