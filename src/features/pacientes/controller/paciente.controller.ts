import type { Request, Response } from 'express';
import { PacienteServiceImpl } from '../service/impl/paciente.service.impl.js';
import type { CrearPacienteDTO, ActualizarPacienteDTO } from '../model/dto/paciente.dto.js';

export class PacienteController {
  private pacienteService = new PacienteServiceImpl();

  crear = async (req: Request, res: Response): Promise<void> => {
    try {
      const dto: CrearPacienteDTO = req.body;
      const resultado = await this.pacienteService.crear(dto);
      res.status(201).json({ success: true, data: resultado });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  };

  obtenerPorId = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id, 10);
      const resultado = await this.pacienteService.obtenerPorId(id);
      res.status(200).json({ success: true, data: resultado });
    } catch (error: any) {
      res.status(404).json({ success: false, message: error.message });
    }
  };

  obtenerPorUsuarioId = async (req: Request, res: Response): Promise<void> => {
    try {
      const usuario_id = parseInt(req.params.usuario_id, 10);
      const resultado = await this.pacienteService.obtenerPorUsuarioId(usuario_id);
      res.status(200).json({ success: true, data: resultado });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  };

  obtenerTodos = async (req: Request, res: Response): Promise<void> => {
    try {
      const skip = parseInt(req.query.skip as string, 10) || 0;
      const take = parseInt(req.query.take as string, 10) || 10;
      const resultado = await this.pacienteService.obtenerTodos(skip, take);
      res.status(200).json({ success: true, data: resultado, pagination: { skip, take } });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

  actualizar = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id, 10);
      const dto: ActualizarPacienteDTO = req.body;
      const resultado = await this.pacienteService.actualizar(id, dto);
      res.status(200).json({ success: true, data: resultado });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  };

  eliminar = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id, 10);
      await this.pacienteService.eliminar(id);
      res.status(200).json({ success: true, message: 'Paciente eliminado' });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  };
}
