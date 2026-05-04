


import { validationResult } from "express-validator";


const validarResultado = (req, res, next) => {
    const errores = validationResult(req);

    if (!errores.isEmpty()) {
        return res.status(400).json({
            mensaje: 'Error de validación',
            errores: errores.array().map(e => ({ campo: e.path, mensaje: e.msg })),
        });
    }

    next();
}

export { validarResultado };