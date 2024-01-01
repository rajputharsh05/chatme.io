const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const userSchema = new Schema({
    Email : {
        type : String,
        require : true,
        unique : true,
    },
    FirstName : {
        type : String,
        require :true,
    },
    LastName : {
        type : String,
        require : true,
    },
    Password : {
        type : String,
        require : true
    }
})

const User = mongoose.model("User",userSchema);

module.exports = User;
