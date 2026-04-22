// horario.service.impl.ts
import { HorarioRepository } from '../../repository/horario.repository.js';
import type { ConfigurarHorarioDTO, GenerarBloquesDTO } from '../../model/dto/horario.dto.js';

export class HorarioServiceImpl {
    private horarioRepository: HorarioRepository;

    constructor() {
        this.horarioRepository = new HorarioRepository();
    }

    async configurarDia(datos: ConfigurarHorarioDTO) {
        const [hInicio, mInicio] = (datos.hora_inicio || '00:00').split(':').map(Number);
        const [hFin, mFin] = (datos.hora_fin || '00:00').split(':').map(Number);

        // Guardar como Date UTC pura para evitar cualquier desfase de zona horaria
        const inicio = new Date(Date.UTC(1970, 0, 1, hInicio ?? 0, mInicio ?? 0, 0));
        const fin = new Date(Date.UTC(1970, 0, 1, hFin ?? 0, mFin ?? 0, 0));

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

        if (!reglas || reglas.length === 0) {
            return { generados: 0, error: "No hay horarios base configurados. Por favor, guarda el horario base primero." };
        }

        const [yStart, mStart, dStart] = (datos.fecha_inicio || '').split('-').map(Number);
        const [yEnd, mEnd, dEnd] = (datos.fecha_fin || '').split('-').map(Number);

        const start = new Date(Date.UTC(yStart ?? 0, (mStart ?? 1) - 1, dStart ?? 1, 0, 0, 0));
        const end = new Date(Date.UTC(yEnd ?? 0, (mEnd ?? 1) - 1, dEnd ?? 1, 23, 59, 59));
        const duracion = datos.duracion_minutos || 30; // Default a 30 si no viene

        let d = new Date(start);
        while (d <= end) {
            const diaSemana = d.getUTCDay(); 
            const regla = reglas.find((r: any) => r.dia_semana === diaSemana);

            if (regla && regla.es_laboral) {
                const hInicio = regla.hora_inicio.getUTCHours();
                const mInicio = regla.hora_inicio.getUTCMinutes();
                const hFin = regla.hora_fin.getUTCHours();
                const mFin = regla.hora_fin.getUTCMinutes();

                let current = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), hInicio, mInicio, 0));
                const limit = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), hFin, mFin, 0));

                while (current.getTime() + duracion * 60000 <= limit.getTime()) {
                    const next = new Date(current.getTime() + duracion * 60000);
                    
                    bloquesNuevos.push({
                        fecha: new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), 12, 0, 0)),
                        hora_inicio: new Date(current),
                        hora_fin: new Date(next),
                        estado_id: 1
                    });
                    
                    current = next;
                }
            }
            d.setUTCDate(d.getUTCDate() + 1);
        }

        if (bloquesNuevos.length > 0) {
            await this.horarioRepository.crearBloquesMasivos(bloquesNuevos);
            return { generados: bloquesNuevos.length };
        }
        
        return { 
            generados: 0, 
            error: "No se generaron bloques. Verifica que los días seleccionados sean laborales y que el rango de fechas sea correcto.",
            debug: {
                reglasEncontradas: reglas.length,
                diasLaborales: reglas.filter((r: any) => r.es_laboral).map((r: any) => r.dia_semana),
                rango: `${datos.fecha_inicio} a ${datos.fecha_fin}`
            }
        };
    }
}