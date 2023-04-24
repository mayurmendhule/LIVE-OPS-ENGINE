const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required: true
        // validation :[] for cases 
    },
    password:{
        type:String,
        required:true
    },
    // email: mongoose.Types.email
    email:String,
    mobile:Number
     
})

const user = mongoose.model("user", userSchema);

module.exports ={user}