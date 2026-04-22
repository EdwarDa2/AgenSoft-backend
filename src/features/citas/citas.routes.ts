import { Router } from 'express';
import { CitaController } from './controller/cita.controller.js';

const router = Router();
const citaController = new CitaController();

// Rutas base: /api/citas (o el prefijo que uses en tu archivo principal)
router.post('/solicitar', citaController.solicitarCita);
router.get('/pendientes', citaController.listarPendientes);

export default router;