const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {type : String, required: true},
    password: {type : String, required: true},
    fullname : {type : String, required: true},
    phoneNumber: {type : String, required: true},
    email : {type : String, required: true},
    isAdmin: {type : Boolean, required: true},
});

module.exports = mongoose.model('User', userSchema)

