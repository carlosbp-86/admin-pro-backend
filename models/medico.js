const { Schema, model} = require('mongoose');

const MedicoSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    img: {
        type: String        
    },
    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    hospital: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Hospital'
    }      
                 
}, { collection: 'medicos' });  // Le establece el nombre a la tabla


// Cambiar la propiedad automática "_id" a "uid"
MedicoSchema.method('toJSON', function(){
    const { __v, ...object} = this.toObject();
    return object;
})


module.exports = model('Medico', MedicoSchema);