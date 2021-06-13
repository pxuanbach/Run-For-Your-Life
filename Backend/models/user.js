const mongoose = require("mongoose")
var uniqueValidator = require("mongoose-unique-validator")


// Schema là lược đồ database
let user_schema = mongoose.Schema({

    email: {
        type : String,
        default: "Chưa có thông tin"
    },

    username: {
        type: String,
        unique: true, 
        require: true
    },
    password:{
        type: String,
        require: true
    },
    phone: {
        type: String
    },
    address: {
        type: String
    },
    birthday: {
        type: String
    },
    fullname: {
        type: String
    },
    image: {
        type: String
    },
    sex: {
        type: String,
    }

})

// Xác thực Unique (username là trường duy nhất)
user_schema.plugin(uniqueValidator)

exports.User = mongoose.model("User", user_schema);

