import type { Request, Response } from 'express';
export declare class BloqueController {
    private bloqueService;
    crear: (req: Request, res: Response) => Promise<void>;
    generar: (req: Request, res: Response) => Promise<void>;
    obtenerPorId: (req: Request, res: Response) => Promise<void>;
    obtenerPorFecha: (req: Request, res: Response) => Promise<void>;
    obtenerPorRango: (req: Request, res: Response) => Promise<void>;
    obtenerTodos: (req: Request, res: Response) => Promise<void>;
    actualizar: (req: Request, res: Response) => Promise<void>;
    eliminar: (req: Request, res: Response) => Promise<void>;
}
//# sourceMappingURL=bloque.controller.d.ts.map