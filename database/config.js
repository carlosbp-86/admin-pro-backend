const mongoose = require('mongoose');

const dbConnection = async() => {

    try {

        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useCreateIndex: true,            
            useFindAndModify: false
      });     
      
      console.log('BD corriendo')
        
    } catch (error) {

        console.log(error);
        throw new Error('Error en inicio de BD, ver logs');
        
    }

}

module.exports = {
    dbConnection
}