
/**
 * Middleware HOF que valida si el usuario tiene los roles permitidos.
 * Debe ser usado DESPUÉS de validarToken (que popula req.user).
 *
 * @param {string[]} rolesPermitidos - Arreglo de nombres de roles permitidos
 * @returns {Function} Middleware de Express
 *
 * @example
 * router.delete('/usuarios/:id',
 *   validarToken,
 *   validarRol(['admin']),
 *   (req, res) => { ... }
 * );
 */
export const validarRol = (rolesPermitidos) => {
    // Validaciones 
    if (!Array.isArray(rolesPermitidos) || rolesPermitidos.length === 0) {
        throw new Error('validarRol requiere un arreglo no vacío de roles permitidos');
    }

    if (!rolesPermitidos.every(rol => typeof rol === 'string')) {
        throw new Error('Todos los roles deben ser strings');
    }

    // Retornar el middleware
    return (req, res, next) => {
        try {
            const { user } = req;
            // Verificar que el usuario esté autenticado
            if (!user) {
                return res.status(401).json({
                    error: 'No autorizado',
                    message: 'Se requiere autenticación'
                });
            }
            const { rol } = user;
            // Verificar que el usuario tenga un rol asignado
            if (!rol) {
                return res.status(403).json({
                    error: 'Acceso denegado',
                    message: 'Usuario sin rol asignado'
                });
            }

            // Verificar si el rol del usuario está en los permitidos
            if (!rolesPermitidos.includes(rol)) {
                return res.status(403).json({
                    error: 'Acceso denegado',
                    message: `Se requieren permisos de: ${rolesPermitidos.join(', ')}`
                });
            }

            // Usuario autorizado, continuar
            next();
        } catch (error) {
            console.error('Error validando rol:', error);
            res.status(500).json({
                error: 'Error interno del servidor'
            });
        }
    };
};