import { Request, Response } from 'express';

export class CitaController {
    
    // CASO DE USO: Solicitar Cita (Paciente)
    solicitarCita = async (req: Request, res: Response): Promise<void> => {
        try {
            const { paciente_id, bloque_id, motivo_consulta } = req.body;
            
            // Validación básica temporal a nivel de controlador
            if (!paciente_id || !bloque_id) {
                res.status(400).json({ 
                    success: false, 
                    message: "paciente_id y bloque_id son obligatorios" 
                });
                return;
            }

            res.status(201).json({
                success: true,
                message: "Cita solicitada y en estado Pendiente",
                data: {
                    paciente_id,
                    bloque_id,
                    motivo_consulta,
                    estado_id: 1 // 1 = Pendiente
                }
            });
        } catch (error) {
            res.status(500).json({ success: false, message: "Error interno del servidor" });
        }
    };

    // CASO DE USO: Listar Citas Pendientes (Administrador)
    listarPendientes = async (req: Request, res: Response): Promise<void> => {
        try {
            res.status(200).json({
                success: true,
                data: [
                    {
                        id: 1,
                        paciente_id: 2,
                        motivo_consulta: "Revisión general",
                        estado_id: 1
                    }
                ]
            });
        } catch (error) {
            res.status(500).json({ success: false, message: "Error al obtener las citas pendientes" });
        }
    };
}