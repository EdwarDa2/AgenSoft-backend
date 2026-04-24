import type { CrearBloqueDTO, ActualizarBloqueDTO, GenerarBloquesDTO, BloqueResponseDTO } from '../model/dto/bloque.dto.js';
export interface IBloqueService {
    crear(dto: CrearBloqueDTO): Promise<BloqueResponseDTO>;
    obtenerPorId(id: number): Promise<BloqueResponseDTO>;
    obtenerPorFecha(fecha: string): Promise<BloqueResponseDTO[]>;
    obtenerPorRango(fechaInicio: string, fechaFin: string): Promise<BloqueResponseDTO[]>;
    obtenerTodos(skip?: number, take?: number): Promise<BloqueResponseDTO[]>;
    actualizar(id: number, dto: ActualizarBloqueDTO): Promise<BloqueResponseDTO>;
    eliminar(id: number): Promise<void>;
    generar(dto: GenerarBloquesDTO): Promise<BloqueResponseDTO[]>;
}
//# sourceMappingURL=bloque.service.d.ts.map