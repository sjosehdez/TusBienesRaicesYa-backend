require('dotenv').config();
const mongoose = require('mongoose');

// db   => mongodb+srv://mean_user:p1JKlNsGbT77KTNC@cluster1.uqiwvkj.mongodb.net/hospitaldb
//mongo "mongodb+srv://mean_user:p1JKlNsGbT77KTNC@cluster1.uqiwvkj.mongodb.net/test"
// user => mean_user
// pass => p1JKlNsGbT77KTNC

//sync regresa una promesa
 const dbConnection = async () => {
     try {
         await mongoose.connect(
             process.env.DB_CNN, {
                 useNewUrlParser: true,
                 useUnifiedTopology: true,
                 useCreateIndex: true
             }
         );        
         console.log('BD Online');

     } catch (error) {
         console.log(error);
         throw new Error('Error a la hora de iniciar la BD ver logs');
     }
 }

module.exports = {
    dbConnection
}