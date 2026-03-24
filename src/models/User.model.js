


export const crearUsuario = ({ nombre, email, password, rol = 'user' }) => ({
    id: Date.now(),
    nombre,
    email: email.toLowerCase().Trim(),
    password,
    rol: rol,
    createdAt: new Date().toISOString(),
    updateAt: new Date().toISOString()
});