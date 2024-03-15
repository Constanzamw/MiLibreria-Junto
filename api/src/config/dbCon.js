const mongoose = require("mongoose");


const dbCon = async () => {
    await mongoose.connect(
        //"mongodb+srv://constanzamw:Ulises18@milibreria.owpg6xj.mongodb.net/"
       // "mongodb+srv://constanzamw:Ulises18@milibreria.owpg6xj.mongodb.net/books?retryWrites=true&w=majority"
       "mongodb+srv://constanzamw:Ulises18.@library.b2r029n.mongodb.net/books?"
    );
};

module.exports = dbCon;