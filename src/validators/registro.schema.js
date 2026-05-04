


import { checkSchema } from "express-validator";



const registroSchema = checkSchema({
    nombre: {
        in: 'body',
        notEmpty: { errorMessage: 'El nombre es obligatorio' },
        isLength: {
            options: { min: 3, max: 50 },
            errorMessage: 'El nombre debe tener entre 3 y 50 caracteres.'
        }
    },
    email: {
        in: 'body',
        isEmail: { errorMessage: 'El email no es valido.' },
        notEmpty: { errorMessage: 'El email es obligatorio.' },
        normalizeEmail: true
    },
    password: {
        in: 'body',
        notEmpty: { errorMessage: 'La contraseña es obligatoria.' },
        isLength: {
            options: { min: 8, max: 32 },
            errorMessage: 'La contraseña debe tener al menos 8 caracteres y maximo 32 caracteres.'
        },
        matches: {
            options: /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])/,
            errorMessage: 'Debe contrener minusculas, mayusculas y numeros.'
        }
    },
    rol: {
        in: 'body',
        optional: true,
        isString: [true, 'El formato del id rol no es valido.'],
        notEmpty: [true, 'El campo rol no puede estar vacio.'],
    }
});


export { registroSchema };