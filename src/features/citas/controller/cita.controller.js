import { CitaServiceImpl } from '../service/impl/cita.service.impl.js';
export class CitaController {
    citaService = new CitaServiceImpl();
    solicitarCita = async (req, res) => {
        try {
            const resultado = await this.citaService.agendarCita(req.body);
            res.status(201).json({
                success: true,
                data: resultado
            });
        }
        catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    };
    listarPendientes = async (req, res) => {
        try {
            const resultado = await this.citaService.obtenerCitasPendientes();
            res.status(200).json({
                success: true,
                data: resultado
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    };
    listarHistorial = async (req, res) => {
        try {
            const resultado = await this.citaService.obtenerHistorialCitas();
            res.status(200).json({
                success: true,
                data: resultado
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    };
    responderCita = async (req, res) => {
        try {
            const { id } = req.params;
            const { aceptar } = req.body; // boolean: true para aceptar, false para rechazar
            if (typeof aceptar !== 'boolean') {
                res.status(400).json({ success: false, message: "El campo 'aceptar' debe ser booleano" });
                return;
            }
            const resultado = await this.citaService.responderSolicitud(Number(id), aceptar);
            res.status(200).json({
                success: true,
                message: aceptar ? "Cita aceptada exitosamente" : "Cita rechazada",
                data: resultado
            });
        }
        catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    };
    listarMisCitas = async (req, res) => {
        try {
            // Asumiendo que el ID viene en los parámetros de la ruta
            const { paciente_id } = req.params;
            const citas = await this.citaService.obtenerMisCitas(Number(paciente_id));
            res.status(200).json({
                success: true,
                data: citas
            });
        }
        catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    };
    cancelarCita = async (req, res) => {
        try {
            const { id } = req.params;
            // En un entorno real con JWT, el paciente_id vendría de req.user
            // Por ahora lo tomamos del body para poder probarlo
            const { paciente_id } = req.body;
            if (!paciente_id) {
                res.status(400).json({ success: false, message: "Se requiere el ID del paciente para validar la propiedad de la cita" });
                return;
            }
            const resultado = await this.citaService.cancelarCita(Number(id), Number(paciente_id));
            res.status(200).json({
                success: true,
                message: "Cita cancelada exitosamente",
                data: resultado
            });
        }
        catch (error) {
            // Diferenciar entre error de permisos/estado (400) o no encontrado (404)
            const statusCode = error.message.includes("no existe") ? 404 : 400;
            res.status(statusCode).json({ success: false, message: error.message });
        }
    };
    obtenerEstadisticas = async (req, res) => {
        try {
            const stats = await this.citaService.obtenerEstadisticas();
            res.status(200).json({
                success: true,
                data: stats
            });
        }
        catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    };
    reprogramarCita = async (req, res) => {
        try {
            const { id } = req.params;
            const { nuevo_bloque_id } = req.body;
            if (!nuevo_bloque_id) {
                res.status(400).json({ success: false, message: "El ID del nuevo bloque es obligatorio" });
                return;
            }
            const resultado = await this.citaService.reprogramarCita(Number(id), Number(nuevo_bloque_id));
            res.status(200).json({
                success: true,
                message: "Cita reprogramada exitosamente",
                data: resultado
            });
        }
        catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    };
}
//# sourceMappingURL=cita.controller.js.map