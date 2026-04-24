import type { BloqueEntity } from '../model/entity/bloque.entity.js';
export declare class BloqueRepository {
    crear(datos: Omit<BloqueEntity, 'id' | 'creado_en' | 'actualizado_en'>): Promise<BloqueEntity>;
    obtenerPorId(id: number): Promise<BloqueEntity | null>;
    obtenerPorFecha(fecha: string): Promise<BloqueEntity[]>;
    obtenerTodos(skip?: number, take?: number): Promise<BloqueEntity[]>;
    actualizar(id: number, datos: Partial<Omit<BloqueEntity, 'id'>>): Promise<BloqueEntity>;
    eliminar(id: number): Promise<void>;
    obtenerPorRangoFecha(fechaInicio: string, fechaFin: string): Promise<BloqueEntity[]>;
}
//# sourceMappingURL=bloque.repository.d.ts.map