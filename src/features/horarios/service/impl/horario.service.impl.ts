import { HorarioRepository } from '../../repository/horario.repository.js';

export class HorarioServiceImpl {
    private horarioRepository = new HorarioRepository();

    async consultarDisponibilidad(fechaCadena: string) {
        const fecha = new Date(fechaCadena);
        
        if (isNaN(fecha.getTime())) {
            throw new Error("El formato de fecha es inválido. Use el formato YYYY-MM-DD.");
        }

        const bloquesLibres = await this.horarioRepository.obtenerBloquesDisponiblesPorFecha(fecha);

        // Mapeo limpio para la respuesta del frontend
        return bloquesLibres.map(bloque => ({
            bloque_id: bloque.id,
            hora_inicio: bloque.horario_base.hora_inicio,
            hora_fin: bloque.horario_base.hora_fin
        }));
    }
}