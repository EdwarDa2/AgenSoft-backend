import { PacienteRepository } from '../../repository/paciente.repository.js';
import { PacienteMapper } from '../../mapper/paciente.mapper.js';
import type { IPacienteService } from '../paciente.service.js';
import type { CrearPacienteDTO, ActualizarPacienteDTO } from '../../model/dto/paciente.dto.js';

export class PacienteServiceImpl implements IPacienteService {
  private pacienteRepository = new PacienteRepository();

  async crear(dto: CrearPacienteDTO) {
    const usuarioId = Number(dto.usuario_id);
    console.log(`Intentando crear perfil para usuario_id: ${usuarioId}`);
    if (!usuarioId || !dto.nombre_completo) {
      throw new Error('usuario_id y nombre_completo son requeridos');
    }

    const paciente = await this.pacienteRepository.crear({
      usuario_id: usuarioId,
      nombre_completo: dto.nombre_completo,
      telefono: dto.telefono ?? null,
      informacion_medica: dto.informacion_medica ?? null,
    });

    return PacienteMapper.toResponseDTO(paciente);
  }

  async obtenerPorId(id: number) {
    if (!id || id <= 0) throw new Error('ID inválido');

    const paciente = await this.pacienteRepository.obtenerPorId(id);
    if (!paciente) throw new Error('Paciente no encontrado');

    return PacienteMapper.toResponseDTO(paciente);
  }

  async obtenerPorUsuarioId(usuario_id: number) {
    if (!usuario_id || usuario_id <= 0) throw new Error('usuario_id inválido');

    const paciente = await this.pacienteRepository.obtenerPorUsuarioId(usuario_id);
    return paciente ? PacienteMapper.toResponseDTO(paciente) : null;
  }

  async obtenerTodos(skip: number = 0, take: number = 10) {
    const pacientes = await this.pacienteRepository.obtenerTodos(skip, take);
    return PacienteMapper.toResponseDTOs(pacientes);
  }

  async actualizar(id: number, dto: ActualizarPacienteDTO) {
    if (!id || id <= 0) throw new Error('ID inválido');

    const pacienteExistente = await this.pacienteRepository.obtenerPorId(id);
    if (!pacienteExistente) throw new Error('Paciente no encontrado');

    const datosActualizacion: any = {};
    if (dto.nombre_completo !== undefined) datosActualizacion.nombre_completo = dto.nombre_completo;
    if (dto.telefono !== undefined) datosActualizacion.telefono = dto.telefono;
    if (dto.informacion_medica !== undefined) datosActualizacion.informacion_medica = dto.informacion_medica;

    if (Object.keys(datosActualizacion).length === 0) return PacienteMapper.toResponseDTO(pacienteExistente);

    const pacienteActualizado = await this.pacienteRepository.actualizar(id, datosActualizacion);
    return PacienteMapper.toResponseDTO(pacienteActualizado);
  }

  async eliminar(id: number) {
    if (!id || id <= 0) throw new Error('ID inválido');
    const paciente = await this.pacienteRepository.obtenerPorId(id);
    if (!paciente) throw new Error('Paciente no encontrado');
    await this.pacienteRepository.eliminar(id);
  }
}
