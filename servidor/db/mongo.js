const {connect} = require('mongoose');

const {DB_URI} = require("../utils/config");


const conectarBD = async() =>
{
    connect(DB_URI, 
        {
            useNewUrlParser:true,
            useUnifiedTopology:true,
            useFindAndModify:false
        });
};

conectarBD()
.then( result => {console.log("Mongodb is running.")})
.catch( error => console.log(error))