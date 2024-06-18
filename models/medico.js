const {Schema, model} = require('mongoose');

const MedicoSchema = Schema({
    nombre:{
        type: String,
        required: true
    },
    img:{
        type: String,        
    },
    usuario:{
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    //hospital:[{ }]   --> por si se tuviese varios hospitales
    hospital:{
        type: Schema.Types.ObjectId,
        ref: 'Hospital'
    }
} ); //, { collection: 'medicos' }

MedicoSchema.method('toJSON', function(){
    const { __v, ...object } = this.toObject();
    return object;
});

module.exports = model('Medico', MedicoSchema );