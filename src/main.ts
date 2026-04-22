/**
 * Main: Punto de entrada de la aplicación Express
 * Configura middleware, rutas y inicia el servidor
 */
import express from 'express';
import cors from 'cors';

// Importar rutas de features
import usuariosRoutes from './features/usuarios/usuarios.routes.js';
import citasRoutes from './features/citas/citas.routes.js';
import horariosRoutes from './features/horarios/horario.route.js';
import pacientesRoutes from './features/pacientes/pacientes.routes.js';
import bloquesRoutes from './features/bloques/bloques.routes.js';

const app = express();

// ==================== MIDDLEWARE ====================

// CORS - Permitir solicitudes desde otros orígenes
app.use(cors());

// Body parser - Parsear JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'AgenSoft Backend está operativo' });
});

// ==================== RUTAS ====================

// API v1
const apiV1 = express.Router();

// Montar rutas de features
apiV1.use('/usuarios', usuariosRoutes);
apiV1.use('/citas', citasRoutes);
apiV1.use('/horarios', horariosRoutes);
apiV1.use('/pacientes', pacientesRoutes);
apiV1.use('/bloques', bloquesRoutes);

app.use('/api/v1', apiV1);

// ==================== ERROR HANDLING ====================

// Ruta 404 - No encontrado
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint no encontrado',
    path: req.path,
  });
});

// Error handler general
app.use((err: any, req: any, res: any, next: any) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Error interno del servidor',
  });
});

// ==================== SERVIDOR ====================

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 AgenSoft Backend corriendo en puerto ${PORT}`);
  console.log(`📝 Documentación: http://localhost:${PORT}/docs`);
  console.log(`💚 Health check: http://localhost:${PORT}/health`);
});

export default app;
