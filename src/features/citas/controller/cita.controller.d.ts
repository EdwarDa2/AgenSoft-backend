import type { Request, Response } from 'express';
export declare class CitaController {
    private citaService;
    solicitarCita: (req: Request, res: Response) => Promise<void>;
    listarPendientes: (req: Request, res: Response) => Promise<void>;
    listarHistorial: (req: Request, res: Response) => Promise<void>;
    responderCita: (req: Request, res: Response) => Promise<void>;
    listarMisCitas: (req: Request, res: Response) => Promise<void>;
    cancelarCita: (req: Request, res: Response) => Promise<void>;
    obtenerEstadisticas: (req: Request, res: Response) => Promise<void>;
    reprogramarCita: (req: Request, res: Response) => Promise<void>;
}
//# sourceMappingURL=cita.controller.d.ts.map