import { Request, Response } from 'express';
import { HorarioServiceImpl } from '../service/impl/horario.service.impl.js';

export class HorarioController {
    private horarioService = new HorarioServiceImpl();

    obtenerDisponibles = async (req: Request, res: Response): Promise<void> => {
        try {
            const { fecha } = req.query;

            if (!fecha || typeof fecha !== 'string') {
                res.status(400).json({ success: false, message: "El parámetro de consulta 'fecha' es requerido (YYYY-MM-DD)" });
                return;
            }

            const disponibles = await this.horarioService.consultarDisponibilidad(fecha);

            res.status(200).json({
                success: true,
                data: disponibles
            });
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message });
        }
    };
}