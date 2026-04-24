import type { Request, Response } from 'express';
/**
 * Controller: UsuarioController
 * Maneja las solicitudes HTTP para usuarios
 * Buena práctica: Controllers deben ser delgados, solo validación de HTTP
 */
export declare class UsuarioController {
    private usuarioService;
    /**
     * POST /api/v1/usuarios/registrar
     * Registra un nuevo usuario en el sistema
     */
    registrar: (req: Request, res: Response) => Promise<void>;
    /**
     * POST /api/v1/usuarios/login
     * Autentica un usuario y retorna sus datos
     */
    login: (req: Request, res: Response) => Promise<void>;
    /**
     * GET /api/v1/usuarios/:id
     * Obtiene los datos de un usuario específico
     */
    obtenerPorId: (req: Request, res: Response) => Promise<void>;
    /**
     * GET /api/v1/usuarios
     * Obtiene todos los usuarios (con paginación)
     * Query params: skip, take
     */
    obtenerTodos: (req: Request, res: Response) => Promise<void>;
    /**
     * GET /api/v1/usuarios/rol/:rol_id
     * Obtiene todos los usuarios de un rol específico
     */
    obtenerPorRol: (req: Request, res: Response) => Promise<void>;
    /**
     * PATCH /api/v1/usuarios/:id
     * Actualiza los datos de un usuario
     */
    actualizar: (req: Request, res: Response) => Promise<void>;
    /**
     * DELETE /api/v1/usuarios/:id
     * Elimina un usuario del sistema
     */
    eliminar: (req: Request, res: Response) => Promise<void>;
    /**
     * PATCH /api/v1/usuarios/:id/cambiar-password
     * Cambia la contraseña de un usuario
     */
    cambiarPassword: (req: Request, res: Response) => Promise<void>;
}
//# sourceMappingURL=usuario.controller.d.ts.map