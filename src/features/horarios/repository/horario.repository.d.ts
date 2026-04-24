export declare class HorarioRepository {
    guardarHorarioBase(dia: number, inicio: Date, fin: Date, esLaboral: boolean): Promise<{
        id: number;
        hora_inicio: Date;
        hora_fin: Date;
        dia_semana: number;
        es_laboral: boolean;
    }>;
    obtenerHorariosBase(): Promise<{
        id: number;
        hora_inicio: Date;
        hora_fin: Date;
        dia_semana: number;
        es_laboral: boolean;
    }[]>;
    crearBloquesMasivos(bloques: any[]): Promise<import("@prisma/client").Prisma.BatchPayload>;
}
//# sourceMappingURL=horario.repository.d.ts.map