import type { Request, Response } from 'express';
import { CitaServiceImpl } from '../service/impl/cita.service.impl.js';

export class CitaController {
    private citaService = new CitaServiceImpl();
    
    solicitarCita = async (req: Request, res: Response): Promise<void> => {
        try {
            const resultado = await this.citaService.agendarCita(req.body);
            res.status(201).json({
                success: true,
                data: resultado
            });
        } catch (error: any) {
            res.status(400).json({ 
                success: false, 
                message: error.message 
            });
        }
    };

    listarPendientes = async (req: Request, res: Response): Promise<void> => {
        try {
            const resultado = await this.citaService.obtenerCitasPendientes();
            res.status(200).json({
                success: true,
                data: resultado
            });
        } catch (error: any) {
            res.status(500).json({ 
                success: false, 
                message: error.message 
            });
        }
    };

    responderCita = async (req: Request, res: Response): Promise<void> => {
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
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    };

    listarMisCitas = async (req: Request, res: Response): Promise<void> => {
        try {
            // Asumiendo que el ID viene en los parámetros de la ruta
            const { paciente_id } = req.params;
            
            const citas = await this.citaService.obtenerMisCitas(Number(paciente_id));
            
            res.status(200).json({
                success: true,
                data: citas
            });
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message });
        }
    };

    cancelarCita = async (req: Request, res: Response): Promise<void> => {
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
        } catch (error: any) {
            // Diferenciar entre error de permisos/estado (400) o no encontrado (404)
            const statusCode = error.message.includes("no existe") ? 404 : 400;
            res.status(statusCode).json({ success: false, message: error.message });
        }
    };
}