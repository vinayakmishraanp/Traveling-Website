const { required } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Destructure 'default' to get the actual function out of the ESM wrapper object
const { default: passportLocalMongoose } = require("passport-local-mongoose");


const userSchema=new Schema({
    email:{
        type:String,
        required:true
    }
});

userSchema.plugin(passportLocalMongoose);
module.exports=mongoose.model("User",userSchema);