const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL);
const connection = mongoose.connection;

connection.once('connected',()=>{
    console.log('Mongoose is connected');
})

connection.on('error',(error)=>{
    console.log('Mongoose is not connected : ',error);
})

module.exports = mongoose