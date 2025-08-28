const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connexion à MongoDB réussie!');
    }
    catch(error){
        console.error('Echec de connexion à MongoDB: ', error.message);
    }
};

module.exports = connectDB;