


import { Router } from "express";
import { mostrarHome } from "../controllers/watchlist.controller.js";
import service from '../services/watchlist.service.js'
import { validarToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(validarToken);

router.get('/', mostrarHome);

router.get('/:id', async (req, res) => {

    const { userId } = req.user;
    const { id } = req.params;
    const watch = await service.obtenerUno({ id, userId });
    console.log(watch);

    res.render('item', { watch: watch });
});

export {
    router
}