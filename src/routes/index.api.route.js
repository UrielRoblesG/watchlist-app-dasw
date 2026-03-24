
/**
 * Nodo Central de tus rutas. Su función principal es la agregación: 
 * toma los pequeños archivos de rutas (como el de autenticación) y 
 * los organiza bajo prefijos específicos para mantener la URL limpia y profesional.
 */

/**
 * 1. IMPORTACIONES
 * Importamos el Router de Express y las rutas específicas de otros archivos.
 * Usamos 'as authRouter' para darle un nombre más claro y evitar conflictos 
 * si importamos otros enrutadores después.
 */
import { Router } from 'express';
import { router as authRouter } from './auth.api.route.js';

// Creamos el enrutador maestro de la API
const router = Router();

/**
 * 2. REGISTRO DE SUB-RUTAS (Modularización)
 * Aquí decidimos qué "prefijo" de URL activará cada grupo de rutas.
 */

// Todas las rutas dentro de authRouter ahora empezarán con '/auth'
// Ejemplo: POST http://localhost:8080/api/auth/registro
router.use('/auth', authRouter);


/**
 * 3. EXPORTACIÓN
 * Exportamos este enrutador central para que app.js lo consuma.
 */
export { router };