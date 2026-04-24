import { HorarioServiceImpl } from '../service/impl/horario.service.impl.js';
export class HorarioController {
    horarioService;
    constructor() {
        this.horarioService = new HorarioServiceImpl();
    }
    configurarHorario = async (req, res) => {
        try {
            const resultado = await this.horarioService.configurarDia(req.body);
            res.status(200).json({ status: 'success', data: resultado });
        }
        catch (error) {
            res.status(500).json({ status: 'error', message: 'Error al configurar horario' });
        }
    };
    generarBloques = async (req, res) => {
        try {
            const resultado = await this.horarioService.generarBloquesDelMes(req.body);
            if (resultado.generados > 0) {
                res.status(201).json({ status: 'success', message: `${resultado.generados} bloques creados.` });
            }
            else {
                res.status(200).json({
                    status: 'success',
                    message: resultado.error || "0 bloques creados.",
                    debug: resultado.debug
                });
            }
        }
        catch (error) {
            res.status(500).json({ status: 'error', message: 'Error al generar bloques' });
        }
    };
}
//# sourceMappingURL=horario.controller.js.map