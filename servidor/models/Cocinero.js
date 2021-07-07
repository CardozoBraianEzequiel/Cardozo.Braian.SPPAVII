const mongoose = require('mongoose');

const {model, Schema} = mongoose;


const cocineroSchema = new Schema({
        nombre : {type: String, required : true},
        edad : {type: Number, required : true, min : 18, max : 65},
        especialidad : {type: String, required : true},
        favorito : {type: Boolean, required : true},
        cantidadDeCapitulos : {type: Number, required : true, min : 0, max: 100 }
});


cocineroSchema.set('toJSON', {
    transform:( (document, cocineroToJSON) => {

        cocineroToJSON.id = cocineroToJSON._id.toString();
        delete cocineroToJSON._id;
        delete cocineroToJSON.__v;

    })
})

module.exports = model('Cocinero', cocineroSchema);
