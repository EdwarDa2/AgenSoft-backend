// horarios.routes.ts
import { Router } from 'express';
import { HorarioController } from './controller/horario.controller.js';

const router = Router();
const controller = new HorarioController();

// POST /api/v1/horarios/configurar
router.post('/configurar', controller.configurarHorario);

// POST /api/v1/horarios/generar
router.post('/generar', controller.generarBloques);

export default router;