
import { request, response } from "express";


const validarToken = (req = request, res = response, next) => {
    console.log('Middleware validarToken ejecutándose');

    try {
        const authHeader = req.headers['authorization'];
        console.log('Authorization header:', authHeader);

        if (!authHeader || typeof authHeader !== 'string') {
            return res.status(401).json({ mensaje: 'Acceso denegado. Token inválido.' });
        }

        // Extraer Bearer token
        const bearerParts = authHeader.split(' ');
        console.log('Bearer parts:', bearerParts);

        if (bearerParts.length !== 2 || bearerParts[0] !== 'Bearer') {
            return res.status(401).json({ mensaje: 'Acceso denegado. Formato de token inválido.' });
        }

        const token = bearerParts[1];
        console.log('Token:', token);

        // Extraer userId y userEmail del token (formato: userId|email o userId|email|role)
        const tokenParts = token.split('|');
        console.log('Token parts:', tokenParts);

        if (tokenParts.length < 2) {
            return res.status(401).json({ mensaje: 'Acceso denegado. Token malformado.' });
        }

        const userId = tokenParts[0]?.trim();
        const userEmail = tokenParts[1]?.trim();
        const userRole = tokenParts[2]?.trim() || null; // Opcional: rol si existe

        console.log('userId:', userId, '| email:', userEmail, '| role:', userRole);

        // Validar que ambos campos existan y no estén vacíos
        if (!userId || !userEmail) {
            return res.status(401).json({ mensaje: 'Acceso denegado. Token incompleto.' });
        }

        req.user = { userId, userEmail, userRole };
        console.log('Token validado correctamente');
        next();
    } catch (error) {
        console.error(' Error en middleware:', error.message);
        return res.status(401).json({
            mensaje: 'Acceso denegado. Error al procesar el token.',
            error: error.message
        });
    }
}

export { validarToken };