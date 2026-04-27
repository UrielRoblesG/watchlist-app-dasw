import { request, response, Router } from 'express';
import {
    crear,
    obtenerTodos,
    obtenerPorId,
    obtenerMiPerfil,
    actualizar,
    actualizarMiPerfil,
    eliminar,
    obtenerEstadisticas
} from "../controllers/usuario.controller.js";
import { validarToken } from '../middlewares/auth.middleware.js';
import { registroSchema } from '../validators/registro.schema.js';
import { validarResultado } from '../middlewares/validate.result.middleware.js';
import { esPropietarioUsuario } from '../middlewares/es.propietario.middleware.js';
import { actualizarUsuarioSchema } from "../validators/actualizar.usuario.schema.js";

const router = Router();


router.use(validarToken);

/**
 * POST /api/users
 * Crea un nuevo usuario
 * Body: { nombre, email, password }
 */
router.post('/', registroSchema, validarResultado, crear);

/**
 * GET /api/users/stats
 * Obtiene estadísticas generales de usuarios
 */
router.get('/stats', obtenerEstadisticas);

/**
 * RUTAS PROTEGIDAS (requieren token JWT)
 */

/**
 * GET /api/users/profile
 * Obtiene el perfil del usuario autenticado
 */
router.get('/profile', validarToken, obtenerMiPerfil);

/**
 * PUT /api/users/profile
 * Actualiza el perfil del usuario autenticado
 * Body: { nombre?, email? }
 */
router.put('/profile', validarToken, actualizarMiPerfil);

/**
 * GET /api/users
 * Obtiene todos los usuarios (solo administradores)
 * TODO: Agregar middleware de verificación de rol (admin)
 */
router.get('/', validarToken, obtenerTodos);

/**
 * GET /api/users/:id
 * Obtiene un usuario específico por ID
 * TODO: Agregar verificación de autorización
 */
router.get('/:id', validarToken, esPropietarioUsuario, obtenerPorId);

/**
 * PUT /api/users/:id
 * Actualiza un usuario específico
 * TODO: Agregar verificación de autorización (solo admin o el usuario mismo)
 * Body: { nombre?, email? }
 */
router.put('/:id',
    actualizarUsuarioSchema,
    validarResultado,
    validarToken,
    actualizar);

/**
 * DELETE /api/users/:id
 * Elimina un usuario específico
 * TODO: Agregar verificación de autorización (solo admin)
 */
router.delete('/:id', validarToken, eliminar);

export { router };
