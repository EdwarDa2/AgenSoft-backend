import type { PacienteEntity } from '../model/entity/paciente.entity.js';
export declare class PacienteRepository {
    crear(datos: Omit<PacienteEntity, 'id'>): Promise<PacienteEntity>;
    obtenerPorId(id: number): Promise<PacienteEntity | null>;
    obtenerPorUsuarioId(usuario_id: number): Promise<PacienteEntity | null>;
    obtenerTodos(skip?: number, take?: number): Promise<PacienteEntity[]>;
    actualizar(id: number, datos: Partial<Omit<PacienteEntity, 'id' | 'usuario_id'>>): Promise<PacienteEntity>;
    eliminar(id: number): Promise<void>;
}
//# sourceMappingURL=paciente.repository.d.ts.map