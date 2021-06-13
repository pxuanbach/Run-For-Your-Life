const mongoose = require("mongoose")
var uniqueValidator = require("mongoose-unique-validator")


// Schema là lược đồ database
let food_schema = mongoose.Schema({
    name: {
        type: String,
        unique: true, 
        require: true
    },
    type: {
        type: String,
        require: true
    },
    urlImage: {
        type: String,
        default : 'https://lh3.googleusercontent.com/proxy/QiOWPO6LZIX8YE7-vIejUncEFmM851yRo91nJWGkfgDL1Z6iTInzW880q6d9Rki-KS1Y8EVTJpauJdU8roVQVJWobmMmMTG8jNSf'
    },
    calories:{
        type: String,
        require: true
    },
    totalWeight: {
        type: Number,
        require: true
    },
    fat: {
        type: Number
    },
    protein:{
        type : Number
    },
    carbohydrates:{
        type : Number
    },
    cholesterol:{
        type : Number
    },

})

// Xác thực Unique (username là trường duy nhất)
food_schema.plugin(uniqueValidator)

exports.Food = mongoose.model("Food", food_schema);

