import rolesUsuarios from "../constants/roles.js";
import watchlisRepository from '../repositories/watchlist.repository.js';


export const esPropietarioUsuario = (req, res, next) => {
    const { userId, rol } = req.user;

    const { id } = req.params;

    if (rol === rolesUsuarios.ADMINISTRADOR || userId === id)
        return next();

    return res.status(403)
        .json({
            mensaje: 'No tienes permiso para acceder a este recurso',
            error: 'Acceso denegado: no eres el propietario'
        });
}

export const esPropietarioWatchlist = async (req, res, next) => {
    const { userId, rol } = req.user;

    const { id } = req.params;

    if (rol === rolesUsuarios.ADMINISTRADOR) return next();

    try {
        const item = await watchlisRepository.buscarPorIdyUsuario(id, userId);

        if (!item)
            return res.status(404).json({ mensaje: 'Recurso no encontrado', error: 'Item no existe' });

        if (item.userId.toString() !== userId)
            return res
                .status(403)
                .json({
                    mensaje: 'No tienes permiso para acceder a este recurso',
                    error: 'Acceso denegado: no eres el propietario.,'
                });
        next();
    } catch (error) {
        return res.status(500).json({ mensaje: 'Error al verficiar propiedad', error: error.message });
    }
}