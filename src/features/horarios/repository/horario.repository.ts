// horario.repository.ts
import prisma from '../../../config/prisma.js';

export class HorarioRepository {
    
    // Configura el horario general de un día (ej. Lunes de 9 a 5)
    async guardarHorarioBase(dia: number, inicio: Date, fin: Date, esLaboral: boolean) {
        // Borramos la configuración anterior de ese día para evitar duplicados
        await prisma.horarioBase.deleteMany({ where: { dia_semana: dia } });
        
        return await prisma.horarioBase.create({
            data: {
                dia_semana: dia,
                hora_inicio: inicio,
                hora_fin: fin,
                es_laboral: esLaboral
            }
        });
    }

    // Obtiene las reglas para saber cómo generar los bloques
    async obtenerHorariosBase() {
        return await prisma.horarioBase.findMany();
    }

    // Inserta masivamente todos los huecos de 30 mins para el mes
    async crearBloquesMasivos(bloques: any[]) {
        return await prisma.bloqueCalendario.createMany({
            data: bloques,
            skipDuplicates: true
        });
    }
}