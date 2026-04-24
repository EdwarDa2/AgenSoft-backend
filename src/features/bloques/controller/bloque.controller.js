import { BloqueServiceImpl } from '../service/impl/bloque.service.impl.js';
export class BloqueController {
    bloqueService = new BloqueServiceImpl();
    crear = async (req, res) => {
        try {
            const dto = req.body;
            const resultado = await this.bloqueService.crear(dto);
            res.status(201).json({ success: true, data: resultado });
        }
        catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    };
    generar = async (req, res) => {
        try {
            const dto = req.body;
            const resultado = await this.bloqueService.generar(dto);
            res.status(201).json({ success: true, data: resultado });
        }
        catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    };
    obtenerPorId = async (req, res) => {
        try {
            const id = parseInt(String(req.params.id), 10);
            const resultado = await this.bloqueService.obtenerPorId(id);
            res.status(200).json({ success: true, data: resultado });
        }
        catch (error) {
            res.status(404).json({ success: false, message: error.message });
        }
    };
    obtenerPorFecha = async (req, res) => {
        try {
            const fecha = String(req.params.fecha);
            const resultado = await this.bloqueService.obtenerPorFecha(fecha);
            res.status(200).json({ success: true, data: resultado });
        }
        catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    };
    obtenerPorRango = async (req, res) => {
        try {
            const { inicio, fin } = req.query;
            const resultado = await this.bloqueService.obtenerPorRango(String(inicio), String(fin));
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
            const resultado = await this.bloqueService.obtenerTodos(skip, take);
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
            const resultado = await this.bloqueService.actualizar(id, dto);
            res.status(200).json({ success: true, data: resultado });
        }
        catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    };
    eliminar = async (req, res) => {
        try {
            const id = parseInt(String(req.params.id), 10);
            await this.bloqueService.eliminar(id);
            res.status(200).json({ success: true, message: 'Bloque eliminado' });
        }
        catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    };
}
//# sourceMappingURL=bloque.controller.js.map