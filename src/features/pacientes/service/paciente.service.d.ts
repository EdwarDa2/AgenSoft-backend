import type { CrearPacienteDTO, ActualizarPacienteDTO, PacienteResponseDTO } from '../model/dto/paciente.dto.js';
export interface IPacienteService {
    crear(dto: CrearPacienteDTO): Promise<PacienteResponseDTO>;
    obtenerPorId(id: number): Promise<PacienteResponseDTO>;
    obtenerPorUsuarioId(usuario_id: number): Promise<PacienteResponseDTO | null>;
    obtenerTodos(skip?: number, take?: number): Promise<PacienteResponseDTO[]>;
    actualizar(id: number, dto: ActualizarPacienteDTO): Promise<PacienteResponseDTO>;
    eliminar(id: number): Promise<void>;
}
//# sourceMappingURL=paciente.service.d.ts.map