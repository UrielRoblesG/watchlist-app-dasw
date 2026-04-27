import { Router } from "express";
import { actualizar, crear, eliminar, obtenerTodos, obtenerUno } from "../controllers/watchlist.controller.js";
import { validarToken } from "../middlewares/auth.middleware.js";
import { validarRol } from "../middlewares/validar.rol.middleware.js";
import rolesUsuarios from "../constants/roles.js";

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
]), obtenerUno);

router.post('/', validarRol([
    rolesUsuarios.ADMINISTRADOR,
    rolesUsuarios.USUARIO
]), crear);

router.put('/:id', validarRol([
    rolesUsuarios.ADMINISTRADOR,
    rolesUsuarios.USUARIO
]), actualizar);

router.delete('/:id', validarRol([
    rolesUsuarios.ADMINISTRADOR,
    rolesUsuarios.USUARIO
]), eliminar);

export { router };
