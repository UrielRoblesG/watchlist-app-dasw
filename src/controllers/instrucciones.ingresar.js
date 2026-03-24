/**
 * ? auth.service.js
 * TODO: Crear un método asíncrono llamado 'intentarLogin'
 * * Debe recibir un objeto como parámetro y desestructurar: { email, password }
 * * Llamar al repositorio usuarioRepository.obtenerPorEmail(email)
    Guardar el resultado en una variable llamada user
 * * Validar si el usuario NO existe
    Si no existe:
        Crear un nuevo Error con el mensaje 'INVENTA UN MENSAJE'
        Agregar una propiedad status con valor 401 al error
        Lanzar el error con throw
 * * Comparar la contraseña enviada con la almacenada
    Crear una variable (por ejemplo: coinciden)
    Comparar password === user.password
 * * Si las contraseñas NO coinciden:
    Crear un nuevo Error con el mensaje 'INVENTA UN MENSAJE'
    Asignar status = 401
    Lanzar el error
 * * Generar un token de autenticación
    Llamar a un método interno (this._generarToken)
    Pasar el user como argumento
    Guardar el resultado en una variable token
 * * Sanitizar el usuario (quitar datos sensibles como password)
    Llamar a this._sanitizar(user)
 * * Retornar un objeto con:
    user: el usuario sanitizado
    token: el token generado

 * ? auth.controller.js
 * TODO: Crear una función asíncrona llamada 'ingresar'
 * * Recibe req y res (puedes asignar request y response por defecto)
 * * Envolver toda la lógica en un bloque try/catch
 * * Dentro del try:
    Llamar al servicio authService.intentarLogin
        Pasar req.body como argumento
        Guardar el resultado en una variable (por ejemplo: result)
    Responder con status 200
        Enviar un JSON que incluya:
        - message: 'Inicio de sesión exitoso.'
        - Expandir el resultado usando spread operator (...result)
    En el catch:
    Manejar errores
        Responder con status error.status si existe, o 500 por defecto

    Enviar un JSON con:
        mensaje: 'Ocurrio un error durante el login.'
        error: error.message
*/