const mongoose = require("mongoose")
var uniqueValidator = require("mongoose-unique-validator")


// Schema là lược đồ database
let plan_schema = mongoose.Schema({
    title: {
        type: String,
        unique: true, 
        require: true
    },
    imageUrl: {
        type: String,
    },
    webUrl:{
        type: String,
        require: true
    },
    plantype: {
        type: mongoose.Schema.Types.ObjectId ,
        ref : 'planType',
        require: true,
    }
})


let plantype_scheme = mongoose.Schema({
    type: {
        type: String,
        unique: true,
    },     
    title:{
        type: String,
        unique:true,
    },
    list:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'plan',
    }],
})



// Xác thực Unique (là trường duy nhất)
plan_schema.plugin(uniqueValidator)
plantype_scheme.plugin(uniqueValidator)

exports.plan = mongoose.model("plan", plan_schema);
exports.planType = mongoose.model("planType",plantype_scheme);

