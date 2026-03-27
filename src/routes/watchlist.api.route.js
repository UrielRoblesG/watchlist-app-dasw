import { Router } from "express";
import { actualizar, crear, eliminar, obtenerTodos, obtenerUno } from "../controllers/watchlist.controller.js";
import { validarToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(validarToken);

router.get('/', obtenerTodos);
router.get('/:id', obtenerUno);
router.post('/', crear);
router.put('/:id', actualizar);
router.delete('/:id', eliminar);

export { router };
