require('dotenv').config();
const mongoose = require('mongoose');


mongoose.connect(process.env.MONGO_URL);

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:true,
        trim:true,
        lowercase:true,
        minlength:3,
        maxlength:30
    },
    password:{
        type:String,
        required:true,
        minlength:3,
    },
        firstName:{
        type:String,
        required:true,
        trim:true,
        maxlength:30
    },
        lastName:{
        type:String,
        required:true,
        trim:true,
        maxlength:30
    },

})

const accountSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId, //reference to user model,
        ref:'User',
        required:true
    },
    balance:{
        type:Number,
        required:true
    }
});

const User = mongoose.model("User",userSchema);
const Account = mongoose.model("Account", accountSchema);

module.exports={
    User,Account
};