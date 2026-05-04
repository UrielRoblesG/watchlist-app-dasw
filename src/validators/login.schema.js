

import { checkSchema } from "express-validator";



const loginSchema = checkSchema({
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
    }
});

export { loginSchema }