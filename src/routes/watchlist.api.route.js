import { Router } from "express";
import { actualizar, crear, eliminar, obtenerTodos, obtenerUno } from "../controllers/watchlist.controller.js";
import { validarToken } from "../middlewares/auth.middleware.js";
import { validarRol } from "../middlewares/validar.rol.middleware.js";
import rolesUsuarios from "../constants/roles.js";
import { esPropietarioWatchlist } from "../middlewares/es.propietario.middleware.js";

const router = Router();

router.use(validarToken);

router.get('/',
    validarRol([
        rolesUsuarios.ADMINISTRADOR,
        rolesUsuarios.USUARIO
    ]),
    obtenerTodos);

router.get('/:id', validarRol([
    rolesUsuarios.ADMINISTRADOR,
    rolesUsuarios.USUARIO
]), esPropietarioWatchlist, obtenerUno);

router.post('/', validarRol([
    rolesUsuarios.ADMINISTRADOR,
    rolesUsuarios.USUARIO
]), crear);

router.put('/:id', validarRol([
    rolesUsuarios.ADMINISTRADOR,
    rolesUsuarios.USUARIO
]), esPropietarioWatchlist, actualizar);

router.delete('/:id', validarRol([
    rolesUsuarios.ADMINISTRADOR,
    rolesUsuarios.USUARIO
]), esPropietarioWatchlist, eliminar);

export { router };
