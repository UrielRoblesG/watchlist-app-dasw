
import { request, response } from "express";

const validarToken = (req = request, res = response, next) => {
    const authHeader = req.headers['authorization'];
    const userId = authHeader && authHeader.split('|')[0].split(' ')[1];
    const userEmail = authHeader && authHeader.split('|')[1];

    if (!userId) {
        return res.status(401).json({ mensaje: 'Acceso denegado. Token invalido.' });
    }
    req.user = { userId, userEmail };
    next();
}

export {
    validarToken
}