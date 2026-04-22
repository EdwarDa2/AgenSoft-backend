import { CitaRepository } from '../../repository/cita.repository.js';
import type { CrearCitaDTO } from '../../model/dto/cita.dto.js';
import { CitaMapper } from '../../mapper/cita.mapper.js';

export class CitaServiceImpl {
    private citaRepository = new CitaRepository();

    async agendarCita(dto: CrearCitaDTO) {
        if (!dto.paciente_id || !dto.bloque_id) {
            throw new Error("El ID del paciente y el bloque son obligatorios");
        }

        const disponible = await this.citaRepository.verificarDisponibilidad(dto.bloque_id);
        
        if (!disponible) {
            throw new Error("El bloque de horario ya está reservado o pendiente de revisión");
        }

        const entidad = await this.citaRepository.crear({
            paciente_id: dto.paciente_id,
            bloque_id: dto.bloque_id,
            motivo_consulta: dto.motivo_consulta || "Sin motivo",
            estado_id: 1
        });

        return CitaMapper.toResponseDTO(entidad);
    }

    async obtenerCitasPendientes() {
        const citas = await this.citaRepository.obtenerPorEstado(1);
        return citas.map(cita => CitaMapper.toResponseDTO(cita));
    }
}