import { Router } from "express";
import { actualizar, crear, eliminar, obtenerTodos, obtenerUno } from "../controllers/watchlist.controller.js";

const router = Router();

router.get('/', obtenerTodos);
router.get('/:id', obtenerUno);
router.post('/', crear);
router.put('/:id', actualizar);
router.delete('/:id', eliminar);

export { router };
