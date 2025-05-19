const mongoose = require('mongoose');



const createUser = mongoose.Schema({
    name:{
        type:String ,
        required:[true,'the userName is required'],
    } ,
    email:{
        type:String,
        required:[true,'the email is required'],
        unique:true,
        match:[/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
        lowercase:true
    },
    password:{
        type:String,
        required:[true,'the password is required'],
    },
    role:{
        type:String,
        enum:['admin','user'],
        default:'user'
    }
});

const User = mongoose.model('User',createUser);

module.exports = User ;