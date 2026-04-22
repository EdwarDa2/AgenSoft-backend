import { Request, Response } from 'express';
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
}