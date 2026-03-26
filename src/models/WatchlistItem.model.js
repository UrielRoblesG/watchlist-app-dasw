
const crearWatchlistItem = ({
    userId,
    titulo,
    tipo,
    genero = '',
    rating = null,
    estado = 'pendiente',
    coverUrl = '',
    notas = ''
}) => {
    return {
        id: Date.now(),
        userId,
        titulo: titulo.trim(),
        tipo,
        genero,
        rating,
        estado,
        coverUrl,
        notas,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
};

export { crearWatchlistItem };