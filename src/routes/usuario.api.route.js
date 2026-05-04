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
import { validarRol } from '../middlewares/validar.rol.middleware.js';
import rolesUsuarios from '../constants/roles.js';

const router = Router();


/**
 * GET /api/users/stats
 * Obtiene estadísticas generales de usuarios
 */
router.get('/stats', obtenerEstadisticas);

/**
 * RUTAS PROTEGIDAS (requieren token JWT)
 */

/**
 * POST /api/users
 * Crea un nuevo usuario
 * Body: { nombre, email, password }
 */
router.post('/', validarToken, validarRol([rolesUsuarios.ADMINISTRADOR]), registroSchema, validarResultado, crear);


/**
 * GET /api/users/profile
 * Obtiene el perfil del usuario autenticado
 * TODO: Agregar middleware para comprobar si es propietario
 */
router.get('/profile', validarToken, validarRol([rolesUsuarios.USUARIO]), obtenerMiPerfil);

/**
 * PUT /api/users/profile
 * Actualiza el perfil del usuario autenticado
 * Body: { nombre?, email? }
 * TODO: Agregar middleware para comprobar si es propietario
 */
router.put('/profile', validarToken, actualizarMiPerfil);

/**
 * GET /api/users
 * Obtiene todos los usuarios (solo administradores)
 * TODO: Agregar middleware de verificación de rol (admin)
 */
router.get('/', validarToken, validarRol([rolesUsuarios.ADMINISTRADOR]), obtenerTodos);

/**
 * GET /api/users/:id
 * Obtiene un usuario específico por ID
 * TODO: Agregar verificación de propietario
 */
router.get('/:id', validarToken,
    validarRol([rolesUsuarios.ADMINISTRADOR, rolesUsuarios.USUARIO]),
    esPropietarioUsuario,
    obtenerPorId);

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
    esPropietarioUsuario,
    actualizar);

/**
 * DELETE /api/users/:id
 * Elimina un usuario específico
 * TODO: Agregar verificación de autorización (solo admin)
 */
router.delete('/:id', validarToken, validarRol([rolesUsuarios.ADMINISTRADOR]), eliminar);

export { router };
