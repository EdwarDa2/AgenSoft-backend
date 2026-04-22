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

        // 1. Iterar desde datos.fecha_inicio hasta datos.fecha_fin
        // 2. Por cada día, revisar qué día de la semana es (ej. es Lunes?)
        // 3. Buscar la regla del Lunes en "reglas"
        // 4. Si es laboral, hacer un ciclo iterando cada 'datos.duracion_minutos'
        // 5. Crear el objeto para Prisma: { fecha, hora_inicio, hora_fin, estado_id: 1 (Libre) }
        // 6. Hacer push a bloquesNuevos[]

        /* Ejemplo de estructura generada:
           bloquesNuevos.push({
               fecha: new Date('2024-11-01'),
               hora_inicio: new Date('1970-01-01T09:00:00Z'),
               hora_fin: new Date('1970-01-01T09:30:00Z'),
               estado_id: 1 // Usaremos 1 para 'Libre' en el contexto de bloques
           });
        */

        if (bloquesNuevos.length > 0) {
            await this.horarioRepository.crearBloquesMasivos(bloquesNuevos);
        }
        
        return { generados: bloquesNuevos.length };
    }
}