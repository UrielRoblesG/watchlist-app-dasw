import { checkSchema } from "express-validator";

const actualizarUsuarioSchema = checkSchema({
    nombre: {
        in: 'body',
        optional: true,
        isLength: {
            options: { min: 3, max: 50 },
            errorMessage: 'El nombre debe tener entre 3 y 50 caracteres.'
        }
    },
    email: {
        in: 'body',
        optional: true,
        isEmail: { errorMessage: 'El email no es válido.' },
        normalizeEmail: true
    },
    password: {
        in: 'body',
        optional: true,
        isLength: {
            options: { min: 8, max: 32 },
            errorMessage: 'La contraseña debe tener al menos 8 caracteres y máximo 32 caracteres.'
        },
        matches: {
            options: /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])/,
            errorMessage: 'La contraseña debe contener minúsculas, mayúsculas y números.'
        }
    },
    rol: {
        in: 'body',
        optional: true,
        isString: [true, 'El formato del id rol no es válido.'],
        notEmpty: [true, 'El campo rol no puede estar vacío.']
    }
});

export { actualizarUsuarioSchema };
