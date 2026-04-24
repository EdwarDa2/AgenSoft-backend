import type { IPacienteService } from '../paciente.service.js';
import type { CrearPacienteDTO, ActualizarPacienteDTO } from '../../model/dto/paciente.dto.js';
export declare class PacienteServiceImpl implements IPacienteService {
    private pacienteRepository;
    crear(dto: CrearPacienteDTO): Promise<import("../../model/entity/paciente.entity.js").PacienteResponseDTO>;
    obtenerPorId(id: number): Promise<import("../../model/entity/paciente.entity.js").PacienteResponseDTO>;
    obtenerPorUsuarioId(usuario_id: number): Promise<import("../../model/entity/paciente.entity.js").PacienteResponseDTO | null>;
    obtenerTodos(skip?: number, take?: number): Promise<import("../../model/entity/paciente.entity.js").PacienteResponseDTO[]>;
    actualizar(id: number, dto: ActualizarPacienteDTO): Promise<import("../../model/entity/paciente.entity.js").PacienteResponseDTO>;
    eliminar(id: number): Promise<void>;
}
//# sourceMappingURL=paciente.service.impl.d.ts.map