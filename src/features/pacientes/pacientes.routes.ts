import { Router } from 'express';
import { PacienteController } from './controller/paciente.controller.js';

const router = Router();
const controller = new PacienteController();

// POST /api/v1/pacientes
router.post('/', controller.crear);

// GET /api/v1/pacientes
router.get('/', controller.obtenerTodos);

// GET /api/v1/pacientes/:id
router.get('/:id', controller.obtenerPorId);

// GET /api/v1/pacientes/usuario/:usuario_id
router.get('/usuario/:usuario_id', controller.obtenerPorUsuarioId);

// PATCH /api/v1/pacientes/:id
router.patch('/:id', controller.actualizar);

// DELETE /api/v1/pacientes/:id
router.delete('/:id', controller.eliminar);

export default router;
