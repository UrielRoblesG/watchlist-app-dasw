


import { Router } from "express";

import { router as watchlistRouter } from "./watchlist.routes.js";
import { router as authRouter } from "./auth.route.js";

const router = Router();

router.use('/auth', authRouter);
router.use('/watchlist', watchlistRouter);

export {
    router
}