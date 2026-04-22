/**
 * Rutas: Usuarios
 * Define todos los endpoints para gestión de usuarios
 */
import { Router } from 'express';
import { UsuarioController } from './controller/usuario.controller.js';

const router = Router();
const controller = new UsuarioController();

// POST /api/v1/usuarios/registrar - Registra un nuevo usuario
router.post('/registrar', controller.registrar);

// POST /api/v1/usuarios/login - Autentica un usuario
router.post('/login', controller.login);

// GET /api/v1/usuarios - Obtiene todos los usuarios (con paginación)
router.get('/', controller.obtenerTodos);

// GET /api/v1/usuarios/rol/:rol_id - Obtiene usuarios por rol
router.get('/rol/:rol_id', controller.obtenerPorRol);

// GET /api/v1/usuarios/:id - Obtiene un usuario específico
router.get('/:id', controller.obtenerPorId);

// PATCH /api/v1/usuarios/:id - Actualiza un usuario
router.patch('/:id', controller.actualizar);

// PATCH /api/v1/usuarios/:id/cambiar-password - Cambia la contraseña
router.patch('/:id/cambiar-password', controller.cambiarPassword);

// DELETE /api/v1/usuarios/:id - Elimina un usuario
router.delete('/:id', controller.eliminar);

export default router;
