
import { request, response } from "express";
import { verificarToken } from "../utils/jwt.js";


const validarToken = async (req = request, res = response, next) => {
    console.log('Middleware validarToken ejecutándose');

    try {
        const token = req.cookies.token;

        // Validar que el header de autorización existe

        const url = req.baseUrl;


        if (!token && url.includes('/api')) {
            return res.status(401).json({
                mensaje: 'Acceso denegado. Token no proporcionado.',
                error: 'No se envio el token en las cookies'
            });
        } else if (!token) {
            // Si existe el token, redirige al dashboard
            res.redirect('/auth/ingresar');
        }
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