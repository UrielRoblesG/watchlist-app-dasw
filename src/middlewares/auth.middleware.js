
import { request, response } from "express";
import { verificarToken } from "../utils/jwt.js";


const validarToken = async (req = request, res = response, next) => {
    console.log('Middleware validarToken ejecutándose');

    try {
        const authHeader = req.headers['authorization'];
        console.log(authHeader);

        // Validar que el header de autorización existe
        if (!authHeader) {
            return res.status(401).json({
                mensaje: 'Acceso denegado. Token no proporcionado.',
                error: 'Authorization header is required'
            });
        }

        // Extraer el token del formato "Bearer <token>"
        const parts = authHeader.split(' ');
        if (parts.length !== 2 || parts[0] !== 'Bearer') {
            return res.status(401).json({
                mensaje: 'Acceso denegado. Formato de token inválido.',
                error: 'Expected format: Bearer <token>'
            });
        }

        const token = parts[1];

        // Verificar el token usando el método verificarToken
        const decodedToken = verificarToken(token);

        // Adjuntar la información decodificada al request
        const user = {
            userId: decodedToken.id,
            ...decodedToken,
        }
        req.user = user;
        console.log('Token validado correctamente:', req.user);

        next();
    } catch (error) {
        console.error('Error en middleware:', error.message);
        return res.status(401).json({
            mensaje: 'Acceso denegado. Token inválido o expirado.',
            error: error.message
        });
    }
}

export { validarToken };