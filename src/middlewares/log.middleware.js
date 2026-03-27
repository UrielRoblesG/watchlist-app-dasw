


import { request, response } from "express";


const logMiddleware = (req = request, res = response, next) => {
    const metodo = req.method;
    const endpoint = req.originalUrl;
    const timestamp = new Date().toISOString();

    let mensaje = `[${timestamp}] ${metodo} ${endpoint}`;

    const token = req.headers['x-token'];


    if (token) {
        mensaje += `| ${token}`;
    }

    console.log(mensaje);
    next();
}



export {
    logMiddleware
}