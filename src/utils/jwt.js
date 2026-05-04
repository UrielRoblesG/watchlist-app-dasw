

import jwt from 'jsonwebtoken';

import envConfig from '../config/env.loader.js';

export const generarToken = (payload, expiresIn = '3h') => {
    try {
        const token = jwt.sign(payload, envConfig.jwtSecret, {
            expiresIn: expiresIn
        });

        console.log(`Token generado: ${token}`);

        return token;
    } catch (error) {
        throw new Error(`Ocurrio un error al generar el token. ${error.message}`);
    }
}


export const verificarToken = (token) => {
    try {
        const decodedData = jwt.verify(token, envConfig.jwtSecret);
        console.log(`Token decodificado: `, decodedData);
        return decodedData;

    } catch (error) {
        throw new Error(`Ocurrio un error al verificar el token. Error: ${error.message}`);
    }
}