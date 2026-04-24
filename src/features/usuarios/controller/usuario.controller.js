import { UsuarioServiceImpl } from '../service/impl/usuario.service.impl.js';
/**
 * Controller: UsuarioController
 * Maneja las solicitudes HTTP para usuarios
 * Buena práctica: Controllers deben ser delgados, solo validación de HTTP
 */
export class UsuarioController {
    usuarioService = new UsuarioServiceImpl();
    /**
     * POST /api/v1/usuarios/registrar
     * Registra un nuevo usuario en el sistema
     */
    registrar = async (req, res) => {
        try {
            const dto = req.body;
            const resultado = await this.usuarioService.registrar(dto);
            res.status(201).json({
                success: true,
                message: 'Usuario registrado exitosamente',
                data: resultado,
            });
        }
        catch (error) {
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
    login = async (req, res) => {
        try {
            const dto = req.body;
            const resultado = await this.usuarioService.login(dto);
            res.status(200).json({
                success: true,
                message: 'Login exitoso',
                data: resultado,
            });
        }
        catch (error) {
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
    obtenerPorId = async (req, res) => {
        try {
            const { id } = req.params;
            const usuarioId = parseInt(String(id), 10);
            const resultado = await this.usuarioService.obtenerPorId(usuarioId);
            res.status(200).json({
                success: true,
                data: resultado,
            });
        }
        catch (error) {
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
    obtenerTodos = async (req, res) => {
        try {
            const skip = parseInt(req.query.skip, 10) || 0;
            const take = parseInt(req.query.take, 10) || 10;
            const resultado = await this.usuarioService.obtenerTodos(skip, take);
            res.status(200).json({
                success: true,
                data: resultado,
                pagination: {
                    skip,
                    take,
                },
            });
        }
        catch (error) {
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
    obtenerPorRol = async (req, res) => {
        try {
            const { rol_id } = req.params;
            const rolId = parseInt(String(rol_id), 10);
            const resultado = await this.usuarioService.obtenerPorRol(rolId);
            res.status(200).json({
                success: true,
                data: resultado,
            });
        }
        catch (error) {
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
    actualizar = async (req, res) => {
        try {
            const { id } = req.params;
            const usuarioId = parseInt(String(id), 10);
            const dto = req.body;
            const resultado = await this.usuarioService.actualizar(usuarioId, dto);
            res.status(200).json({
                success: true,
                message: 'Usuario actualizado exitosamente',
                data: resultado,
            });
        }
        catch (error) {
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
    eliminar = async (req, res) => {
        try {
            const { id } = req.params;
            const usuarioId = parseInt(String(id), 10);
            await this.usuarioService.eliminar(usuarioId);
            res.status(200).json({
                success: true,
                message: 'Usuario eliminado exitosamente',
            });
        }
        catch (error) {
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
    cambiarPassword = async (req, res) => {
        try {
            const { id } = req.params;
            const usuarioId = parseInt(String(id), 10);
            const dto = req.body;
            await this.usuarioService.cambiarPassword(usuarioId, dto);
            res.status(200).json({
                success: true,
                message: 'Contraseña actualizada exitosamente',
            });
        }
        catch (error) {
            res.status(400).json({
                success: false,
                message: error.message || 'Error al cambiar contraseña',
            });
        }
    };
}
//# sourceMappingURL=usuario.controller.js.map