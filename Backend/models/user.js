const mongoose = require("mongoose")
var uniqueValidator = require("mongoose-unique-validator")


// Schema là lược đồ database
let user_schema = mongoose.Schema({
    username: {
        type: String,
        unique: true, 
        require: true
    },
    password:{
        type: String,
        require: true
    },
})


let userInfo_schema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId ,
        ref : 'User',
        require: true,
        unique: true
    },
    mail: {
        type: String,
        default: ''
    },
    phone: {
        type: String,
        default: '+00'
    },
    address: {
        type: String,
        default: ''
    },
    birthday: {
        type: String,
        default: ''
    },
    fullname: {
        type: String,
        default: ''
    },
    image: {
        type: String,
        default: ''
    },
    gender: {
        type: String,
        default: ''
    },
    note: {
        type:String,
        default: ''
    },
    height:{
        type: Number,
    },
    weight: {
        type: Number,
        
    },
    description: {
        type: String,
        default: ''
    },
    job: {
        type: String,
        default: ''
    },
})

// Unique Check
user_schema.plugin(uniqueValidator)
userInfo_schema.plugin(uniqueValidator)

exports.User = mongoose.model("User", user_schema)

exports.userInfo = mongoose.model("userInfo", userInfo_schema)

