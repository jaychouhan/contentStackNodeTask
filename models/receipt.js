const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var { nanoid } = require("nanoid")

const receiptSchema = new Schema({
    id:{
        type:String,
        required:true,
        default:() => nanoid(7), 
        unique:true
    },
    vehicleRegistrationNum:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true,
    },
    isReturn:{
        type:Boolean,
        required:true
    }
},
{
    timestamps: true
});


const receiptModel = mongoose.model('receipt',receiptSchema);
module.exports = receiptModel;