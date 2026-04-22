import { Router } from 'express';
import { BloqueController } from './controller/bloque.controller.js';

const router = Router();
const controller = new BloqueController();

// POST /api/v1/bloques - crear un bloque
router.post('/', controller.crear);

// POST /api/v1/bloques/generar - generar bloques por rango
router.post('/generar', controller.generar);

// GET /api/v1/bloques - listar (paginado)
router.get('/', controller.obtenerTodos);

// GET /api/v1/bloques/:id - obtener por id
router.get('/:id', controller.obtenerPorId);

// GET /api/v1/bloques/fecha/:fecha - obtener por fecha
router.get('/fecha/:fecha', controller.obtenerPorFecha);

// GET /api/v1/bloques/rango?inicio=yyyy-mm-dd&fin=yyyy-mm-dd
router.get('/rango', controller.obtenerPorRango);

// PATCH /api/v1/bloques/:id
router.patch('/:id', controller.actualizar);

// DELETE /api/v1/bloques/:id
router.delete('/:id', controller.eliminar);

export default router;
