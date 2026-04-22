import { CitaRepository } from '../../repository/cita.repository.js';
import type { CrearCitaDTO } from '../../model/dto/cita.dto.js';
import { CitaMapper } from '../../mapper/cita.mapper.js';

export class CitaServiceImpl {
    private citaRepository = new CitaRepository();

    async agendarCita(dto: CrearCitaDTO) {
        if (!dto.paciente_id || !dto.bloque_id) {
            throw new Error("El ID del paciente y el bloque son obligatorios");
        }

        // El paciente_id que viene del front es en realidad el usuario_id del AuthContext
        const paciente = await this.citaRepository.obtenerPacientePorUsuarioId(dto.paciente_id);
        if (!paciente) {
            throw new Error("No se encontró el perfil de paciente para este usuario");
        }

        const disponible = await this.citaRepository.verificarDisponibilidad(dto.bloque_id);
        
        if (!disponible) {
            throw new Error("El bloque de horario ya está reservado o pendiente de revisión");
        }

        const entidad = await this.citaRepository.crear({
            paciente_id: paciente.id,
            bloque_id: dto.bloque_id,
            motivo_consulta: dto.motivo_consulta || "Sin motivo",
            estado_id: 1
        });

        // Recuperar la entidad completa con relaciones para el mapper
        const citaCompleta = await this.citaRepository.obtenerPorId(entidad.id);

        return CitaMapper.toResponseDTO(citaCompleta);
    }

    async obtenerCitasPendientes() {
        const citas = await this.citaRepository.obtenerPorEstado(1);
        return citas.map((cita: any) => CitaMapper.toResponseDTO(cita));
    }

    async obtenerHistorialCitas() {
        const citas = await this.citaRepository.obtenerHistorial();
        return citas.map((cita: any) => CitaMapper.toResponseDTO(cita));
    }

    async responderSolicitud(id_cita: number, aceptar: boolean) {
        const nuevoEstado = aceptar ? 2 : 3;
        
        const citaActualizada = await this.citaRepository.actualizarEstado(id_cita, nuevoEstado);
        
        // Recuperar con relaciones
        const citaCompleta = await this.citaRepository.obtenerPorId(citaActualizada.id);
        
        return CitaMapper.toResponseDTO(citaCompleta);
    }

    async obtenerMisCitas(usuario_id: number) {
        if (!usuario_id) {
            throw new Error("El ID del usuario es requerido");
        }
        
        const paciente = await this.citaRepository.obtenerPacientePorUsuarioId(usuario_id);
        if (!paciente) {
            return []; // O lanzar error si prefieres, pero un paciente sin perfil no tiene citas
        }

        const citas = await this.citaRepository.obtenerPorPaciente(paciente.id);
        return citas.map((cita: any) => CitaMapper.toResponseDTO(cita));
    }

    async cancelarCita(id_cita: number, usuario_id: number) {
        const cita = await this.citaRepository.obtenerPorId(id_cita);

        if (!cita) {
            throw new Error("La cita no existe");
        }

        const paciente = await this.citaRepository.obtenerPacientePorUsuarioId(usuario_id);
        if (!paciente || cita.paciente_id !== paciente.id) {
            throw new Error("No tienes permisos para cancelar esta cita");
        }

        // 3: Rechazada, 4: Cancelada
        if (cita.estado_id === 3 || cita.estado_id === 4) {
            throw new Error("La cita ya se encuentra rechazada o cancelada");
        }

        // Actualizamos al estado 4 (Cancelada)
        return await this.citaRepository.actualizarEstado(id_cita, 4);
    }

    async obtenerEstadisticas() {
        return await this.citaRepository.obtenerEstadisticas();
    }

    async reprogramarCita(id_cita: number, nuevo_bloque_id: number) {
        // Verificar que el nuevo bloque esté disponible
        const disponible = await this.citaRepository.verificarDisponibilidad(nuevo_bloque_id);
        if (!disponible) {
            throw new Error("El nuevo horario seleccionado ya no está disponible");
        }

        const actualizada = await this.citaRepository.reprogramar(id_cita, nuevo_bloque_id);
        const completa = await this.citaRepository.obtenerPorId(actualizada.id);
        return CitaMapper.toResponseDTO(completa);
    }
}