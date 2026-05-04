/**
 * 1. IMPORTACIONES DE MÓDULOS
 * Gracias a "type": "module" en el package.json, usamos la sintaxis moderna 'import'.
 */
import express from "express"; // El framework para construir el servidor web.
import cors from "cors";
import { router as apiRouter } from "./src/routes/index.api.route.js"; // Importamos nuestro gestor de rutas.
import { router as viewRouter } from "./src/routes/index.routes.js";
import { logMiddleware } from "./src/middlewares/log.middleware.js";

import envConfig from './src/config/env.loader.js';
import database from "./src/db/db.js";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";

/**
 * 2. INSTANCIACIÓN Y MIDDLEWARES (Configuración)
 */
const app = express();

app.set('view engine', 'ejs');

app.use(cookieParser());
app.use(cors());

database.conectar();


/**
 * MIDDLEWARE PARA JSON: 
 * Permite que Express entienda el cuerpo (body) de las peticiones que vienen como JSON.
 * Sin esto, req.body sería 'undefined'.
 */
app.use(express.json());

// Habilita el acceso público a archivos estáticos (CSS, JS, imágenes) desde la carpeta 'public'
app.use(express.static('public'));

// Middleware para logg
app.use(logMiddleware);


const limitadorGeneral = rateLimit({
    windowMs: 1 * 600 * 1000,
    max: 100,
    message: 'Demasiadas solicitudes, intenta mas tarde'
});


const limitadorAutenticacion = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: 'Demasiados intentos de autenticacion, intenta mas tarde'
});

app.use('/api/auth', limitadorAutenticacion);
app.use(limitadorGeneral);

/**
 * 3. DEFINICIÓN DE RUTAS
 */

// Prefijamos todas las rutas que vienen del archivo index.api.route con '/api'
// Ejemplo: si en el router hay una ruta '/movies', aquí será '/api/movies'
app.use('/api', apiRouter);
app.use('/', viewRouter);
/**
 * RUTA RAÍZ: 
 * Es la respuesta que damos cuando alguien entra a la URL base (http://localhost:8080/).
 */
app.get('/', (req, res) => {
    const token = req.cookies.token; // Obtiene la cookie 'token'

    if (token) {
        // Si existe el token, redirige al dashboard
        res.redirect('/dashboard');
    } else {
        // Si no existe el token, redirige a la página de ingreso
        res.redirect('/auth/ingresar');
    }
});

/**
 * 4. MANEJO DE ERRORES Y ESTADOS HTTP
 */

/**
 * MIDDLEWARE 404 (Not Found):
 * Si el usuario pide una ruta que no existe, llegará aquí.
 * 'app.use' sin ruta específica captura TODO lo que no fue atrapado arriba.
 */
app.use((req, res) => {
    const rutaSolicitada = req.url;

    if (!rutaSolicitada.includes('/api')) {
        res.redirect('/auth')
        return;
    }

    res.status(404).json({ mensaje: 'Ruta no encontrada' })

});

/**
 * MIDDLEWARE DE ERROR GLOBAL (500):
 * Este tiene 4 parámetros (err, req, res, next).
 * Si algo explota en tu código, este "colchón" atrapa el error para que el servidor no se apague.
 */

app.use((err, req, res, next) => {
    console.error(err.stack); // Imprime el error en la consola del servidor para el programador.
    res.status(500).json({ mensaje: 'Error interno del servidor' });
});

/**
 * 5. PUESTA EN MARCHA
 */
const PORT = envConfig.PORT;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en ${PORT}.`);
});