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

    async responderSolicitud(id_cita: number, aceptar: boolean) {
        const nuevoEstado = aceptar ? 2 : 3;
        
        const citaActualizada = await this.citaRepository.actualizarEstado(id_cita, nuevoEstado);
        
        return CitaMapper.toResponseDTO(citaActualizada);
    }

    async obtenerMisCitas(paciente_id: number) {
        if (!paciente_id) {
            throw new Error("El ID del paciente es requerido");
        }
        return await this.citaRepository.obtenerPorPaciente(paciente_id);
    }

    async cancelarCita(id_cita: number, paciente_id: number) {
        const cita = await this.citaRepository.obtenerPorId(id_cita);

        if (!cita) {
            throw new Error("La cita no existe");
        }

        if (cita.paciente_id !== paciente_id) {
            throw new Error("No tienes permisos para cancelar esta cita");
        }

        // 3: Rechazada, 4: Cancelada
        if (cita.estado_id === 3 || cita.estado_id === 4) {
            throw new Error("La cita ya se encuentra rechazada o cancelada");
        }

        // Actualizamos al estado 4 (Cancelada)
        return await this.citaRepository.actualizarEstado(id_cita, 4);
    }
}