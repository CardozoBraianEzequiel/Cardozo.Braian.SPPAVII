const mongoose = require('mongoose');

const {model, Schema} = mongoose;


const userSchema = new Schema({
        username : {type: String, required : true},
        passwordHash : {type: String, required : true}
});


// sirve para transformar una función
userSchema.set('toJSON', {
    transform:( (document, userToJSON) => {

        userToJSON.id = userToJSON._id.toString();
        delete userToJSON._id;
        delete userToJSON.__v;
        delete userToJSON.passwordHash;
    })
})

module.exports = model("User", userSchema);
