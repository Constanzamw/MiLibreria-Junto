const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
     email: String,
     password: String,
  
     favorites:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Favorite" 
     }]

})

const User = mongoose.model("User", userSchema);

module.exports = User;