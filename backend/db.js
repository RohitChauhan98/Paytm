const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost:27017/paytm')

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    userName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password:{
        type: String,
        required: true,
        minLength:6
    }
})


const accountSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId, 
        ref: "user",
        required: true
    },
    balance: {
        type: Number,
        required: true,     
    }
})

const User = mongoose.model('user', userSchema);
const Account = mongoose.model('bank', accountSchema);

module.exports = {
    User, Account
}