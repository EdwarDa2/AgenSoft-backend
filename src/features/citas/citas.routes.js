import { Router } from 'express';
import { CitaController } from './controller/cita.controller.js';
const router = Router();
const citaController = new CitaController();
// Rutas base: /api/citas (o el prefijo que uses en tu archivo principal)
router.get('/stats', citaController.obtenerEstadisticas);
router.post('/solicitar', citaController.solicitarCita);
router.get('/pendientes', citaController.listarPendientes);
router.get('/historial', citaController.listarHistorial);
router.patch('/:id/responder', citaController.responderCita);
router.patch('/:id/reprogramar', citaController.reprogramarCita);
router.get('/paciente/:paciente_id', citaController.listarMisCitas);
router.patch('/:id/cancelar', citaController.cancelarCita);
export default router;
//# sourceMappingURL=citas.routes.js.map