import { Router } from 'express';
import { HorarioController } from './controller/horario.controller.js';

const router = Router();
const horarioController = new HorarioController();

// GET /api/horarios/disponibles?fecha=2026-04-25
router.get('/disponibles', horarioController.obtenerDisponibles);

export default router;