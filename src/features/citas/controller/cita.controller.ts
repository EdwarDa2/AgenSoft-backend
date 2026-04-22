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
}