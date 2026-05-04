




import { Router } from "express";
import { mostrarLogin } from "../controllers/auth.controller.js";

const router = Router();

router.get('/', mostrarLogin);


export {
    router
}