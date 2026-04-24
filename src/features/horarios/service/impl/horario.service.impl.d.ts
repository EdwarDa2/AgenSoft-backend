import type { ConfigurarHorarioDTO, GenerarBloquesDTO } from '../../model/dto/horario.dto.js';
export declare class HorarioServiceImpl {
    private horarioRepository;
    constructor();
    configurarDia(datos: ConfigurarHorarioDTO): Promise<{
        id: number;
        hora_inicio: Date;
        hora_fin: Date;
        dia_semana: number;
        es_laboral: boolean;
    }>;
    generarBloquesDelMes(datos: GenerarBloquesDTO): Promise<{
        generados: number;
        error: string;
        debug?: never;
    } | {
        generados: number;
        error?: never;
        debug?: never;
    } | {
        generados: number;
        error: string;
        debug: {
            reglasEncontradas: number;
            diasLaborales: any[];
            rango: string;
        };
    }>;
}
//# sourceMappingURL=horario.service.impl.d.ts.map