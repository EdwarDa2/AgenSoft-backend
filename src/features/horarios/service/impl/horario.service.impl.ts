// horario.service.impl.ts
import { HorarioRepository } from '../../repository/horario.repository.js';
import type { ConfigurarHorarioDTO, GenerarBloquesDTO } from '../../model/dto/horario.dto.js';

export class HorarioServiceImpl {
    private horarioRepository: HorarioRepository;

    constructor() {
        this.horarioRepository = new HorarioRepository();
    }

    async configurarDia(datos: ConfigurarHorarioDTO) {
        // Truco en Node.js para manejar solo horas: usar una fecha base estática 
        const inicio = new Date(`1970-01-01T${datos.hora_inicio}:00Z`);
        const fin = new Date(`1970-01-01T${datos.hora_fin}:00Z`);

        return await this.horarioRepository.guardarHorarioBase(
            datos.dia_semana,
            inicio,
            fin,
            datos.es_laboral
        );
    }

    async generarBloquesDelMes(datos: GenerarBloquesDTO) {
        const reglas = await this.horarioRepository.obtenerHorariosBase();
        const bloquesNuevos = [];

        // Aseguramos que las fechas se traten sin problemas de zona horaria local
        const start = new Date(datos.fecha_inicio);
        const end = new Date(datos.fecha_fin);
        const duracion = datos.duracion_minutos;

        let d = new Date(start);
        while (d <= end) {
            const diaSemana = d.getUTCDay(); // Usar UTC para consistencia con la fecha de entrada
            const regla = reglas.find((r: any) => r.dia_semana === diaSemana);

            if (regla && regla.es_laboral) {
                // regla.hora_inicio ya viene como Date de Prisma (ej: 1970-01-01T09:00:00Z)
                let current = new Date(regla.hora_inicio);
                const limit = new Date(regla.hora_fin);

                while (current.getTime() + duracion * 60000 <= limit.getTime()) {
                    const next = new Date(current.getTime() + duracion * 60000);
                    
                    bloquesNuevos.push({
                        fecha: new Date(d),
                        hora_inicio: new Date(current),
                        hora_fin: new Date(next),
                        estado_id: 1 // 1: Libre / Disponible
                    });
                    
                    current = next;
                }
            }
            // Avanzar al siguiente día en UTC
            d.setUTCDate(d.getUTCDate() + 1);
        }

        if (bloquesNuevos.length > 0) {
            await this.horarioRepository.crearBloquesMasivos(bloquesNuevos);
        }
        
        return { generados: bloquesNuevos.length };
    }
}