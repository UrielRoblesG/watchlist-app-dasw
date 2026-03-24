


const crearUsuario = ({ nombre, email, password, rol = 'user' }) => ({
    id: Date.now(),
    nombre,
    email: email.toLowerCase().trim(),
    password,
    rol: rol,
    createdAt: new Date().toISOString(),
    updateAt: new Date().toISOString()
});


export { crearUsuario };