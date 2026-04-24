import type { IBloqueService } from '../bloque.service.js';
import type { CrearBloqueDTO, ActualizarBloqueDTO, GenerarBloquesDTO } from '../../model/dto/bloque.dto.js';
import type { BloqueResponseDTO } from '../../model/entity/bloque.entity.js';
export declare class BloqueServiceImpl implements IBloqueService {
    private bloqueRepository;
    crear(dto: CrearBloqueDTO): Promise<BloqueResponseDTO>;
    obtenerPorId(id: number): Promise<BloqueResponseDTO>;
    obtenerPorFecha(fecha: string): Promise<BloqueResponseDTO[]>;
    obtenerPorRango(fechaInicio: string, fechaFin: string): Promise<BloqueResponseDTO[]>;
    obtenerTodos(skip?: number, take?: number): Promise<BloqueResponseDTO[]>;
    actualizar(id: number, dto: ActualizarBloqueDTO): Promise<BloqueResponseDTO>;
    eliminar(id: number): Promise<void>;
    generar(dto: GenerarBloquesDTO): Promise<BloqueResponseDTO[]>;
}
//# sourceMappingURL=bloque.service.impl.d.ts.map