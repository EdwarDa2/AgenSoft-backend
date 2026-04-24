import type { Request, Response } from 'express';
export declare class PacienteController {
    private pacienteService;
    crear: (req: Request, res: Response) => Promise<void>;
    obtenerPorId: (req: Request, res: Response) => Promise<void>;
    obtenerPorUsuarioId: (req: Request, res: Response) => Promise<void>;
    obtenerTodos: (req: Request, res: Response) => Promise<void>;
    actualizar: (req: Request, res: Response) => Promise<void>;
    eliminar: (req: Request, res: Response) => Promise<void>;
}
//# sourceMappingURL=paciente.controller.d.ts.map