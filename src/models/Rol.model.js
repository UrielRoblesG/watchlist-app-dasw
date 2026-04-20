import mongoose from 'mongoose';

const rolSchema = new mongoose.Schema(
    {
        nombre: {
            type: String,
            required: [true, 'El nombre del rol es requerido'],
            unique: true,
            trim: true,
            lowercase: true
        }
    },
    {
        timestamps: true
    }
);

// Método estático para inicializar los roles por defecto
rolSchema.statics.initializeRoles = async function () {
    try {
        const countRoles = await this.countDocuments();
        
        if (countRoles === 0) {
            await this.insertMany([
                { nombre: 'user' },
                { nombre: 'admin' }
            ]);
            console.log('Roles por defecto creados: user, admin');
        }
    } catch (error) {
        console.error('Error al inicializar roles:', error.message);
    }
};

export const Rol = mongoose.model('Rol', rolSchema);

export default Rol;

