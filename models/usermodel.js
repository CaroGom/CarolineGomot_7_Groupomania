const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
    {
        email: {
            type : String,
            required : true, 
            validate: [isEmail],
            lowercase: true,
            unique: true,
            trimp: true,
        },
        password: {
            type : String, 
            required : true,
            minLength : 6,
            max: 1024,
        },
        likes: {
            type: [String],
        }
    },
    {
        timestamps: true,
    }
)



userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User', userSchema);