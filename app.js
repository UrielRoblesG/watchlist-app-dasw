/**
 * 1. IMPORTACIONES DE MÓDULOS
 * Gracias a "type": "module" en el package.json, usamos la sintaxis moderna 'import'.
 */
import express from "express"; // El framework para construir el servidor web.
import { router } from "./src/routes/index.api.route.js"; // Importamos nuestro gestor de rutas.
import { logMiddleware } from "./src/middlewares/log.middleware.js";
import { validarToken } from "./src/middlewares/auth.middleware.js";

/**
 * 2. INSTANCIACIÓN Y MIDDLEWARES (Configuración)
 */
const app = express();

/**
 * MIDDLEWARE PARA JSON: 
 * Permite que Express entienda el cuerpo (body) de las peticiones que vienen como JSON.
 * Sin esto, req.body sería 'undefined'.
 */
app.use(express.static('public'));


app.use(express.json());

// Middleware para logg
app.use(logMiddleware);

/**
 * 3. DEFINICIÓN DE RUTAS
 */

// Prefijamos todas las rutas que vienen del archivo index.api.route con '/api'
// Ejemplo: si en el router hay una ruta '/movies', aquí será '/api/movies'
app.use('/api', router);

/**
 * RUTA RAÍZ: 
 * Es la respuesta que damos cuando alguien entra a la URL base (http://localhost:8080/).
 */
app.get('/', (req, res) => {
    res.status(200).json({ mensaje: 'Mi primera ruta con Express.js' });
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
    res.status(404).json({ mensaje: 'Ruta no encontrada' });
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
const PUERTO = 8080;

app.listen(PUERTO, () => {
    console.log(`Servidor corriendo en el puerto http://localhost:${PUERTO}.`);
});