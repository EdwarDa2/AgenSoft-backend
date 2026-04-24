import { PacienteServiceImpl } from '../service/impl/paciente.service.impl.js';
export class PacienteController {
    pacienteService = new PacienteServiceImpl();
    crear = async (req, res) => {
        try {
            const dto = req.body;
            const resultado = await this.pacienteService.crear(dto);
            res.status(201).json({ success: true, data: resultado });
        }
        catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    };
    obtenerPorId = async (req, res) => {
        try {
            const id = parseInt(String(req.params.id), 10);
            const resultado = await this.pacienteService.obtenerPorId(id);
            res.status(200).json({ success: true, data: resultado });
        }
        catch (error) {
            res.status(404).json({ success: false, message: error.message });
        }
    };
    obtenerPorUsuarioId = async (req, res) => {
        try {
            const usuario_id = parseInt(String(req.params.usuario_id), 10);
            const resultado = await this.pacienteService.obtenerPorUsuarioId(usuario_id);
            res.status(200).json({ success: true, data: resultado });
        }
        catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    };
    obtenerTodos = async (req, res) => {
        try {
            const skip = parseInt(req.query.skip, 10) || 0;
            const take = parseInt(req.query.take, 10) || 10;
            const resultado = await this.pacienteService.obtenerTodos(skip, take);
            res.status(200).json({ success: true, data: resultado, pagination: { skip, take } });
        }
        catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    };
    actualizar = async (req, res) => {
        try {
            const id = parseInt(String(req.params.id), 10);
            const dto = req.body;
            const resultado = await this.pacienteService.actualizar(id, dto);
            res.status(200).json({ success: true, data: resultado });
        }
        catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    };
    eliminar = async (req, res) => {
        try {
            const id = parseInt(String(req.params.id), 10);
            await this.pacienteService.eliminar(id);
            res.status(200).json({ success: true, message: 'Paciente eliminado' });
        }
        catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    };
}
//# sourceMappingURL=paciente.controller.js.map