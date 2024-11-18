const mongoose = require('mongoose');

const userDataSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    phNumber:{
        type:String,
        required:true
    },
    password:{
        type: String,
        required: true,
    },
    Addres:{
        type:String,
        required: true,
    },
    DOB:{
        type:Date,
        required: true,
    },
    city:{
        type: String,
        required: true,
    }
})


const userData = mongoose.model('User Data', userDataSchema);
module.exports = userData;
