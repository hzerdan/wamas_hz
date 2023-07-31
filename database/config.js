const mongoose = require('mongoose');

const dbconnection = async () => {

    try {
        await mongoose.connect(process.env.MONGODB_CNN,{

                useNewUrlParser:true,
                useUnifiedTopology:true,
                // useCreateIndex:true,
                // useFindAndModify:false
            });

        
        console.log ("Base de datos on line");


    } catch (error) {
        console.log(error);
        throw new Error( ' Error al iniciar la base de datos')
        
    }




}

module.exports = {
    dbconnection,

}