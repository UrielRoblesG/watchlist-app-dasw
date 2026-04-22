
import { model, Schema, SchemaTypes } from 'mongoose';
import { encriptar } from '../utils/encrypt.js';

import Rol from './Rol.model.js';

const userSchema = new Schema({
    nombre: {
        type: String,
        required: [true, "El nombre es obligatorio"],
        trim: true,
        minlength: [3, 'El nombre debe tener al menos 3 caracteres'],
        maxlength: [50, 'El nombre debe tener maximo 50 caracteres'],
    },
    email: {
        type: String,
        required: [true, 'El email es obligatorio'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Por favor ingresa un email válido']
    },
    password: {
        type: String,
        required: [true, "La contraseña es obligatoria"],
        minlength: [6, 'La contraseña debe tener al menos 6 caracteres.'],
        select: true
    },
    rol: {
        type: SchemaTypes.ObjectId,
        ref: 'Rol',
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

userSchema.pre('save', async function () {
    this.updatedAt = Date.now();
});

userSchema.pre('save', async function () {
    try {
        if (!this.rol) {
            const userRol = await Rol.findOne({ nombre: 'user' });
            if (userRol) {
                this.rol = userRol._id;
            }
        }
    } catch (error) {
        throw new Error('Error agregando al usuario su rol por defecto.', error.message);
    }
});
userSchema.pre('save', async function () {
    try {
        if (!this.isModified('password')) {
            return;
        }
        this.password = await encriptar(this.password);
    } catch (error) {
        throw error;
    }
});

const Usuario = model('Usuario', userSchema);


export { Usuario }