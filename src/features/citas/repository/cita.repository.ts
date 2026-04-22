import type { CitaEntity } from '../model/entity/cita.entity.js';

export class CitaRepository {
    
    async crear(cita: Omit<CitaEntity, 'id' | 'creado_en' | 'actualizado_en'>): Promise<CitaEntity> {
        throw new Error('Método no implementado: requiere ORM');
    }

    async obtenerPorFecha(fecha: string): Promise<CitaEntity[]> {
        throw new Error('Método no implementado: requiere ORM');
    }

    async actualizarEstado(idCita: number, nuevoEstadoId: number): Promise<boolean> {
        throw new Error('Método no implementado: requiere ORM');
    }
}